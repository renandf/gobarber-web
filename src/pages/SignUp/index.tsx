import React from 'react';
import { FiLogIn, FiMail, FiUser, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';

import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, Background } from './styles';

const SignUp: React.FC = () => {
  function handleSubmit(data: object): void {
    console.log(data)
  }

  return (
    <Container>
      <Background />
      <Content>
        <img src={logoImg} alt="GoBarber" />

        <Form initialData={{ name: 'Example Name' }} onSubmit={handleSubmit}>
          <h1>Sign up</h1>

          <Input name="name" icon={FiUser} type="text" placeholder="Name" />
          <Input name="email" icon={FiMail} type="text" placeholder="Email" />
          <Input name="password" icon={FiLock} type="password" placeholder="Password" />

          <Button type="submit">Register</Button>

        </Form>

        <a href="#">
          <FiLogIn />
          Already has an account? Log in
        </a>
      </Content>
    </Container>
  );
};

export default SignUp;
