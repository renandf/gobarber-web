import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';

import Login from '../../pages/Login';

const mockedHistoryPush = jest.fn();
const mockedSignIn = jest.fn();
const mockedAddToast = jest.fn();

jest.mock('react-router-dom', () => {
  return {
    useHistory: () => ({
      push: mockedHistoryPush,
    }),
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

jest.mock('../../hooks/auth', () => {
  return {
    useAuth: () => ({
      signIn: mockedSignIn,
    }),
  };
});

jest.mock('../../hooks/toast', () => {
  return {
    useToast: () => ({
      addToast: mockedAddToast,
    }),
  };
});

describe('Login Page', () => {
  beforeEach(() => {
    mockedHistoryPush.mockClear();
    mockedSignIn.mockClear();
    mockedAddToast.mockClear();
  });

  it('should be able to log in', async () => {
    const { getByPlaceholderText, getByText } = render(<Login />);

    const emailField = getByPlaceholderText('Email');
    const passwordField = getByPlaceholderText('Password');
    const buttonElement = getByText('Log in')

    fireEvent.change(emailField, { target: { value: 'johndoe@example.com' } });
    fireEvent.change(passwordField, { target: { value: '123456' } });

    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(mockedHistoryPush).toHaveBeenCalledWith('/dashboard');
    });
  });

  it('should not be able to log in with missing credentials', async () => {
    const { getByPlaceholderText, getByText } = render(<Login />);

    const emailField = getByPlaceholderText('Email');
    const passwordField = getByPlaceholderText('Password');
    const buttonElement = getByText('Log in')

    fireEvent.change(emailField, { target: { value: '' } });
    fireEvent.change(passwordField, { target: { value: '123456' } });

    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(mockedHistoryPush).not.toHaveBeenCalled();
      expect(mockedAddToast).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'error',
          title: 'Missing credentials',
        }),
      );
    });
  });

  it('should not be able to log in with wrong credentials', async () => {
    mockedSignIn.mockImplementation(() => {
      throw new Error();
    });

    const { getByPlaceholderText, getByText } = render(<Login />);

    const emailField = getByPlaceholderText('Email');
    const passwordField = getByPlaceholderText('Password');
    const buttonElement = getByText('Log in')

    fireEvent.change(emailField, { target: { value: 'johndoe@example.com' } });
    fireEvent.change(passwordField, { target: { value: '123456' } });

    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(mockedHistoryPush).not.toHaveBeenCalled();
      expect(mockedAddToast).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'error',
          title: 'Authentication error',
        }),
      );
    });
  });
});

