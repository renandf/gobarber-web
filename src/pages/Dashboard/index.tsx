import React from 'react';
import { FiPower } from 'react-icons/fi';

import { useAuth } from '../../hooks/auth';

import { Container, Header, HeaderContent, Profile, ImgPlaceholder } from './styles';

import logoImg from '../../assets/logo.svg';

const Dashboard: React.FC = () => {
  const { user, signOut } = useAuth();

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="GoBarber" />

          <Profile>
            {user.avatar_url
              ? <img src={user.avatar_url} alt={user.name} />
              : <ImgPlaceholder>{user.name.substr(0, 1)}</ImgPlaceholder>
            }
            <div>
              <span>Welcome,</span>
              <strong>{user.name}</strong>
            </div>
          </Profile>
          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>
    </Container>
  )
};

export default Dashboard;
