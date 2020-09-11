import styled from 'styled-components';

export const Container = styled.div`
  position: relative;

  span {
    width: 180px;
    background: #f4ede8;
    padding: 8px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 500;
    opacity: 0;
    visibility: hidden;
    transition: visibility 0s linear 0.2s, opacity 0.2s;

    position: absolute;
    bottom: calc(100% + 12px);
    left: 50%;
    transform: translateX(-50%);
    color: #312e38;

    &::before {
      content: '';
      border-style: solid;
      border-color: #f4ede8 transparent;
      border-width: 6px 6px 0 6px;
      top: 100%;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  &:hover span {
    opacity: 1;
    visibility: visible;
    transition: visibility 0s linear 0s, opacity 0.2s;
  }
`;
