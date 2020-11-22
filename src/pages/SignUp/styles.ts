import styled, { keyframes } from 'styled-components';

import signUpBackground from '../../assets/bg-signup.png';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  max-width: 700px;
`;

const appearFromRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(50px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  animation: ${appearFromRight} 1s;

  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;

    h1 {
      margin-bottom: 24px;
    }

    a {
      font-size: 14px;
      display: block;
      margin-top: 16px;
    }
  }

  a {
    color: #f4ede8;
    display: block;
    margin-top: 24px;
    text-decoration: none;
    background-image: linear-gradient(to bottom, #ff9000 0%, #ff9000 100%);
    background-position: center bottom;
    background-size: 0 2px;
    background-repeat: no-repeat;
    transition: background-size 0.2s linear, color 0.2s;

    display: flex;
    align-items: center;

    &:hover {
      color: #ff9000;
      background-size: 100% 2px;
    }
  }
`;

export const Background = styled.div`
  flex: 1;
  background: url(${signUpBackground}) no-repeat center;
  background-size: cover;
`;
