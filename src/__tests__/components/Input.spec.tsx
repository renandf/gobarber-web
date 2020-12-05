import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import 'jest-styled-components';

import Input from '../../components/Input';

jest.mock('@unform/core', () => {
  return {
    useField() {
      return {
        fieldName: 'email',
        defaultValue: '',
        error: '',
        registerField: jest.fn(),
      }
    }
  }
})

describe('Input component', () => {
  it('should be able to render an input', () => {
    const { getByPlaceholderText } = render(
      <Input name="email" placeholder="Email" />,
    );

    expect(getByPlaceholderText('Email')).toBeTruthy();
  });

  it('should toggle input highlight style on focus and blur of empty field', async () => {
    const { getByPlaceholderText } = render(
      <Input name="email" placeholder="Email" />,
    );

    const inputElement = getByPlaceholderText('Email');
    const containerElement = screen.getByTestId('input-container');

    fireEvent.focus(inputElement);

    await waitFor(() => {
      expect(containerElement).toHaveStyleRule('border-color', '#ff9000');
      expect(containerElement).toHaveStyleRule('color', '#ff9000');
    });

    fireEvent.blur(inputElement);

    await waitFor(() => {
      expect(containerElement).not.toHaveStyleRule('border-color', '#ff9000');
      expect(containerElement).not.toHaveStyleRule('color', '#ff9000');
    });
  });

  it('should keep highlighted borders when input is filled', async () => {
    const { getByPlaceholderText } = render(
      <Input name="email" placeholder="Email" />,
    );

    const inputElement = getByPlaceholderText('Email');
    const containerElement = screen.getByTestId('input-container');

    fireEvent.change(inputElement, {
      target: { value: 'johndoe@example.comm' }
    });

    fireEvent.blur(inputElement);

    await waitFor(() => {
      expect(containerElement).toHaveStyleRule('color', '#ff9000');
    });
  });
});
