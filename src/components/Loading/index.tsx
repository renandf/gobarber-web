import React from 'react';

import { Container } from './styles';

interface LoadingProps {
  dark?: number;
}

const Loading: React.FC<LoadingProps> = ({ dark }) => (
  <Container dark={dark}>
    <div></div>
    <div></div>
    <div></div>
  </Container>
);

export default Loading;
