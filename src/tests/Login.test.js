import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouter } from './helpers/renderWith';

describe('Testa a página de Login', () => {
  test('testa o email e senha', () => {
    const { history } = renderWithRouter(<App />);
    const inputEmail = screen.getByPlaceholderText(/email/i);
    const inputSenha = screen.getByPlaceholderText(/password/i);
    const btnEnter = screen.getByText(/enter/i);

    userEvent.type(inputEmail, 'invalido');
    userEvent.type(inputSenha, '1234567');
    expect(btnEnter).toBeDisabled();

    userEvent.clear(inputEmail);
    userEvent.clear(inputSenha);

    userEvent.type(inputEmail, 'test@gmail.com');
    userEvent.type(inputSenha, '123');
    expect(btnEnter).toBeDisabled();

    userEvent.clear(inputEmail);
    userEvent.clear(inputSenha);

    userEvent.type(inputEmail, 'test@gmail.com');
    userEvent.type(inputSenha, '1234567');
    expect(btnEnter).toBeEnabled();

    expect(history.location.pathname).toBe('/');
    userEvent.click(btnEnter);
  });
});
