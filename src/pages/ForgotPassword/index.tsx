import React, { useRef, useCallback, useState } from 'react';
import { FiMail } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';

import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';

import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, AnimationContainer, Background } from './styles';

interface ForgotPasswordFormData {
  email: string;
  password: string;
}

const ForgotPassword: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();

  const history = useHistory();

  const handleSubmit = useCallback(async (data: ForgotPasswordFormData) => {
    try {
      setLoading(true);

      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string().required('Email is required').email('Please insert a valid email'),
      });

      await schema.validate(data, { abortEarly: false });

      await api.post('/password/forgot', {
        email: data.email,
      });

      addToast({
        type: 'success',
        title: 'Reset password email sent',
        description: `Click the link sent to ${data.email} to reset your password.`
      });

      history.push('/');

    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);

        addToast({
          type: 'error',
          title: 'Error while reseting password',
          description: 'Make sure to use a valid email address. If the issue persists, please try again later.'
        });

        return;
      }

      addToast({
        type: 'error',
        title: 'Authentication error',
        description: 'Please make sure your email and password are valid.'
      });
    } finally {
      setLoading(false)
    }
  }, [addToast, history]);

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="GoBarber" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Reset password</h1>

            <Input name="email" icon={FiMail} type="text" placeholder="Email" />

            <Button loading={loading} type="submit">Reset</Button>

          </Form>

          <Link to="/">
            Back to Login
          </Link>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  )
};

export default ForgotPassword;
