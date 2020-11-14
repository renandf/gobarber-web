import styled from 'styled-components';
import { adjustHue } from 'polished';

export const Container = styled.button`
  background: #ff9000;
  height: 56px;
  border-radius: 10px;
  border: 0;
  padding: 0 16px;
  color: #312e38;
  width: 100%;
  font-weight: 500;
  margin-top: 16px;
  transition: color 0.3s, background-color 0.3s;

  &:hover {
    background: ${adjustHue(12, '#ff9000')};
  }

  &:disabled, &:disabled:hover {
    /* background: rgba(0,0,0,0.2); */
    background: rgba(255,255,255,0.2);
  }
`;
