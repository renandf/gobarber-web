import React, { useCallback, useRef } from 'react';
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
  password: string;
}

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const { user } = useAuth();

  const handleSubmit = useCallback(async (data: ProfileFormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string().required('Email is required').email('Please insert a valid email'),
        password: Yup.string().min(6, 'Minimum 6 characters')
      });

      await schema.validate(data, { abortEarly: false });

      await api.post('/users', data);

      history.push('/');

      addToast({
        type: 'success',
        title: 'Registration successful!',
        description: "You're ready to log into GoBarber."
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
        title: 'Registration error',
        description: 'Something went wrong. Please try to register again.'
      });
    }
  }, [addToast, history]);

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
            <button type="button">
              <FiCamera />
            </button>
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