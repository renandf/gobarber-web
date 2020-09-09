import React from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, Background } from './styles';

const Login: React.FC = () => (
  <Container>
    <Content>
      <img src={logoImg} alt="GoBarber" />

      <form>
        <h1>Welcome back!</h1>

        <Input name="email" icon={FiMail} type="text" placeholder="Email" />
        <Input name="password" icon={FiLock} type="password" placeholder="Password" />

        <Button type="submit">Log in</Button>

        <a href="forgot">Forgot password</a>

      </form>

      <a href="#">
        <FiLogIn />
        Sign up
      </a>
    </Content>
    <Background />
  </Container>
);

export default Login;
