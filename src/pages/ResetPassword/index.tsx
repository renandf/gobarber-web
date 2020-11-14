import React, { useRef, useCallback } from 'react';
import { FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { useHistory, useLocation } from 'react-router-dom';

import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';

import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, AnimationContainer, Background } from './styles';

interface ResetPasswordFormData {
  password: string;
  password_confirmation: string;
}

const ResetPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();

  const history = useHistory();
  const location = useLocation();

  const handleSubmit = useCallback(async (data: ResetPasswordFormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        password: Yup.string().required('Password is required'),
        password_confirmation: Yup.string().oneOf([Yup.ref('password')], 'Password must match'),
      });

      await schema.validate(data, { abortEarly: false });

      const { password, password_confirmation } = data;
      const token = location.search.replace('?token=', '');

      if (!token) {
        addToast({
          type: 'error',
          title: 'Missing token',
          description: 'Please make sure to request and use the reset password link sent to your email.'
        });

        return;
      }

      await api.post('/password/reset', {
        password,
        password_confirmation,
        token,
      });

      addToast({
        type: 'success',
        title: 'New password set',
        description: 'You can use your newly created password to log in.'
      });

      history.push('/');

    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);

        addToast({
          type: 'error',
          title: 'Missing or wrong information',
          description: 'Please make sure to type a new password and repeat the same password in the confirmation field.'
        });

        return;
      }

      addToast({
        type: 'error',
        title: 'Error while reseting password',
        description: 'If the issue persists, please try again later.'
      });
    }
  }, [addToast, history, location.search]);

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="GoBarber" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>New password</h1>

            <Input name="password" icon={FiLock} type="password" placeholder="New password" />
            <Input name="password_confirmation" icon={FiLock} type="password" placeholder="Repeat new password" />

            <Button type="submit">Reset password</Button>

          </Form>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  )
};

export default ResetPassword;
