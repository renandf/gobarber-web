import styled from 'styled-components';
import { adjustHue } from 'polished';

export const Container = styled.div`
  > header {
    height: 144px;
    background: #28262e;
    border-bottom: 1px solid #3f384f;
    display: flex;
    align-items: center;

    div {
      width: 100%;
      max-width: 1120px;
      margin: 0 auto;

      svg {
        color: #999591;
        width: 32px;
        height: 32px;
      }

      a:hover svg {
        color: #fff;
      }
    }
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: -176px auto 0;

  width: 100%;

  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;

    h1 {
      margin-bottom: 24px;
      font-size: 20px;
      text-align: left;
    }

    a {
      font-size: 14px;
      display: inline-block;
      margin-top: 16px;
    }

    input[name=old_password] {
      margin-top: 24px;
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

export const AvatarInput = styled.div`
  width: 186px;
  height: 186px;
  border-radius: 50%;
  box-shadow: 0 0 0 4px #3f384f;
  background: #3f384f;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  margin: 0 auto 32px;
  position: relative;

  img {
    width: 186px;
    height: 186px;
    border-radius: 50%;
  }

  button {
    position: absolute;
    width: 48px;
    height: 48px;
    bottom: 0;
    right: 0;
    border: 0;
    border-radius: 50%;
    box-shadow: 0 0 0 2px #3f384f;
    background: #ff9900;
    transition: color 0.3s, background-color 0.3s;

    svg {
      width: 20px;
      height: 20px;
      color: #312e38;
    }

    &:hover {
      background: ${adjustHue(12, '#ff9000')};
    }

    &:hover svg {
      color: #3f384f;
    }
  }
`;

