import React, { useCallback, useRef } from 'react';
import { FiMail, FiUser, FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';

import { useToast } from '../../hooks/toast';

import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, AnimationContainer, Background } from './styles';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(async (data: SignUpFormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Please insert a valid email').required('Email is required'),
        password: Yup.string().min(6, 'Minimum 6 characters').required('Password is required'),
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
      <Background />
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="GoBarber" />

          {/* Example with initial data populating fields
          <Form initialData={{ name: 'Example Name' }} onSubmit={handleSubmit}> */}
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Sign up</h1>

            <Input name="name" icon={FiUser} type="text" placeholder="Name" />
            <Input name="email" icon={FiMail} type="text" placeholder="Email" />
            <Input name="password" icon={FiLock} type="password" placeholder="Password" />

            <Button type="submit">Register</Button>

          </Form>

          <Link to="/">
            Already has an account? Log in
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default SignUp;
