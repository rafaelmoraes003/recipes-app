import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';

describe('Testa a tela de Login', () => {
  it('Verifica se a URL é a raiz', () => {
    const { history } = renderWithRouterAndStore(<App />);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('Verifica a existência dos inputs de email e password e do botão', () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByRole('textbox', { name: /e-mail/i });
    const passwordInput = screen.getByLabelText(/password/i);
    const button = screen.getByRole('button', { name: /login/i });
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('Verifica se o botão está desabilitado quando carrega a página', () => {
    renderWithRouterAndRedux(<App />);
    const button = screen.getByRole('button', { name: /login/i });
    expect(button).toBeDisabled();
  });

  it('Verifica as condições de habilitação do botão (false)', () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByRole('textbox', { name: /e-mail/i });
    const passwordInput = screen.getByLabelText(/password/i);
    const button = screen.getByRole('button', { name: /login/i });

    userEvent.type(emailInput, 'xxxx');
    userEvent.type(passwordInput, 'xxx');

    expect(button).toBeDisabled();

    userEvent.type(emailInput, 'teste@teste.com');
    userEvent.type(passwordInput, 'xxx');

    expect(button).toBeDisabled();

    userEvent.type(emailInput, 'xxxx');
    userEvent.type(passwordInput, '1234567');

    expect(button).toBeDisabled();
  });

  it('Verifica as condições de habilitação do botão (true)', () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByRole('textbox', { name: /e-mail/i });
    const passwordInput = screen.getByLabelText(/password/i);
    const button = screen.getByRole('button', { name: /login/i });

    userEvent.type(emailInput, 'teste@teste.com');
    userEvent.type(passwordInput, '1234567');

    expect(button).not.toBeDisabled();
  });

  it('Verifica se os tokens são salvos na localStorage', () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByRole('textbox', { name: /e-mail/i });
    const passwordInput = screen.getByLabelText(/password/i);
    const button = screen.getByRole('button', { name: /login/i });

    userEvent.type(emailInput, 'teste1@teste.com');
    userEvent.type(passwordInput, '1234567');
    userEvent.click(button);

    expect(localStorage).toHaveProperty('user', '{"email":"teste1@teste.com"}');
  });
});
