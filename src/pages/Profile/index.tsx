import React, { ChangeEvent, useCallback, useRef } from 'react';
import { FiMail, FiUser, FiLock, FiCamera, FiArrowLeft } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, AvatarInput } from './styles';

interface ProfileFormData {
  name: string;
  email: string;
  old_password: string;
  password: string;
  password_confirmation: string;
}

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const { user, updateUser } = useAuth();

  const handleSubmit = useCallback(async (data: ProfileFormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string().required('Email is required').email('Please insert a valid email'),
        old_password: Yup.string(),
        password: Yup.string().when('old_password', {
          is: val => !!val.length,
          then: Yup.string()
            .min(6, 'Minimum 6 characters')
            .required('To update password, this field is required'),
          otherwise: Yup.string(),
        }),
        password_confirmation: Yup.string().when('old_password', {
          is: val => !!val.length,
          then: Yup.string()
            .min(6, 'Minimum 6 characters')
            .required('To update password, this field is required'),
          otherwise: Yup.string(),
        }).oneOf([Yup.ref('password')], 'New password must match'),
      });

      await schema.validate(data, { abortEarly: false });

      const { name, email, old_password, password, password_confirmation } = data;

      const formData = {
        name,
        email,
        ...(old_password ? {
          old_password,
          password,
          password_confirmation,
        } : {}),
      };

      const response = await api.put('/profile', formData);

      updateUser(response.data);

      history.push('/');

      addToast({
        type: 'success',
        title: 'Profile updated successfully',
      })
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);

        addToast({
          type: 'error',
          title: 'Missing information',
          description: 'Please make sure to complete all required fields.'
        });

        return;
      }

      addToast({
        type: 'error',
        title: 'Update error',
        description: `Something went wrong. Please make sure you're using the right password or try again later.`
      });
    }
  }, [addToast, history]);

  const handleAvatarChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const data = new FormData();

      data.append('avatar', e.target.files[0]);

      api.patch('/users/avatar', data).then((response) => {
        updateUser(response.data);

        addToast({
          type: 'success',
          title: 'Avatar updated successfully'
        })
      });
    }
  }, [addToast, updateUser]);

  return (
    <Container>
      <header>
        <div>
          <Link to="/">
            <FiArrowLeft />
          </Link>
        </div>
      </header>

      <Content>
        <Form
          ref={formRef}
          initialData={{ name: user.name, email: user.email }}
          onSubmit={handleSubmit}
        >

          <AvatarInput>
            {user.avatar_url
              ? <img src={user.avatar_url} alt={user.name} />
              : <p> {user.name.charAt(0)} </p>
            }
            <label htmlFor="avatar">
              <FiCamera />
              <input type="file" id="avatar" onChange={handleAvatarChange} />
            </label>

          </AvatarInput>

          <h1>My Profile</h1>

          <Input name="name" icon={FiUser} type="text" placeholder="Name" />
          <Input name="email" icon={FiMail} type="text" placeholder="Email" />
          <Input
            containerStyle={{ marginTop: 24 }}
            name="old_password"
            icon={FiLock}
            type="password"
            placeholder="Current password"
          />
          <Input name="password" icon={FiLock} type="password" placeholder="New password" />
          <Input name="password_confirmation" icon={FiLock} type="password" placeholder="Repeat new password" />

          <Button type="submit">Save Changes</Button>

          <Link to="/">Cancel</Link>

        </Form>

      </Content>
    </Container>
  );
};

export default Profile;
