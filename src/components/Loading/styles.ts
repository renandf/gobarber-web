import styled from 'styled-components';

interface ContainerProps {
  dark?: number;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;

  & > div {
    width: 12px;
    height: 12px;
    margin: 0 4px;
    ${props => props.dark ? 'background-color: rgba(49,46,56,0.7);' : 'background-color: rgba(255,255,255,0.7);'}
    border-radius: 100%;
    animation: pulse 1.2s infinite ease-in-out both;
  }

  & div:nth-child(1) {
    animation-delay: -0.32s;
  }
  & div:nth-child(2) {
    animation-delay: -0.16s;
  }

  @keyframes pulse {
    0%, 80%, 100% {
      transform: scale(0);
    } 40% {
      transform: scale(1.0);
    }
  }
`;
