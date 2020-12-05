import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';

import SignUp from '../../pages/SignUp';

const mockedHistoryPush = jest.fn();
const mockedApi = jest.fn();
const mockedAddToast = jest.fn();

jest.mock('../../services/api', () => {
  return {
    api() {
      return {
        name: '',
        email: '',
        avatar_url: '',
      }
    }
  };
});

// jest.mock('@unform/core', () => {
//   return {
//     useField() {
//       return {
//         fieldName: 'email',
//         defaultValue: '',
//         error: '',
//         registerField: jest.fn(),
//       }
//     }
//   }
// })

// import { useAuth } from '../../hooks/auth';
// const { signIn } = useAuth();
// jest.mock('../../hooks/auth', () => {
//   return {
//     useAuth: () => ({
//       signIn: mockedSignIn,
//     }),
//   };
// });

// import api from '../../services/api';





jest.mock('react-router-dom', () => {
  return {
    useHistory: () => ({
      push: mockedHistoryPush,
    }),
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

jest.mock('../../hooks/toast', () => {
  return {
    useToast: () => ({
      addToast: mockedAddToast,
    }),
  };
});

describe('SignUp Page', () => {
  beforeEach(() => {
    mockedApi.mockClear();
    mockedHistoryPush.mockClear();
    mockedAddToast.mockClear();
  });

  // it('should be able to register', async () => {
  //   mockedApi.mockImplementation(() => {
  //     return;
  //   });

  //   const { getByPlaceholderText, getByText } = render(<SignUp />);

  //   const nameField = getByPlaceholderText('Name');
  //   const emailField = getByPlaceholderText('Email');
  //   const passwordField = getByPlaceholderText('Password');
  //   const buttonElement = getByText('Register');

  //   fireEvent.change(nameField, { target: { value: 'John Doe' } });
  //   fireEvent.change(emailField, { target: { value: 'johndoe@example.com' } });
  //   fireEvent.change(passwordField, { target: { value: '123456' } });

  //   fireEvent.click(buttonElement);

  //   await waitFor(() => {
  //     expect(mockedHistoryPush).toHaveBeenCalledWith('/');
  //     expect(mockedAddToast).toHaveBeenCalledWith(
  //       expect.objectContaining({
  //         type: 'success',
  //         title: 'Registration successful!',
  //       }),
  //     );
  //   });
  // });

  it('should not be able to register with missing credentials', async () => {
    const { getByPlaceholderText, getByText } = render(<SignUp />);

    const nameField = getByPlaceholderText('Name');
    const emailField = getByPlaceholderText('Email');
    const passwordField = getByPlaceholderText('Password');
    const buttonElement = getByText('Register');

    fireEvent.change(nameField, { target: { value: 'No email' } });
    fireEvent.change(emailField, { target: { value: '' } });
    fireEvent.change(passwordField, { target: { value: '123456' } });

    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(mockedHistoryPush).not.toHaveBeenCalled();
      expect(mockedAddToast).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'error',
          title: 'Missing information',
        }),
      );
    });
  });

  it('should expect an error if registration fails', async () => {
    mockedApi.mockImplementation(() => {
      throw new Error();
    });

    const { getByPlaceholderText, getByText } = render(<SignUp />);

    const nameField = getByPlaceholderText('Name');
    const emailField = getByPlaceholderText('Email');
    const passwordField = getByPlaceholderText('Password');
    const buttonElement = getByText('Register');

    fireEvent.change(nameField, { target: { value: 'John Doe' } });
    fireEvent.change(emailField, { target: { value: 'johndoe@example.com' } });
    fireEvent.change(passwordField, { target: { value: '123456' } });

    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(mockedHistoryPush).not.toHaveBeenCalled();
      expect(mockedAddToast).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'error',
          title: 'Registration error',
        }),
      );
    });
  });
});

