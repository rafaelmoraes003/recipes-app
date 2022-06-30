import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './renderWithRouterAndRedux';
import App from '../App';

describe('Testa a tela de perfil', () => {
  localStorage.setItem('user', '{ "email": "teste@teste.com"}');
  it('Verifica a rota', () => {
    const { history } = renderWithRouterAndRedux(<App />, {}, '/profile');
    const { pathname } = history.location;
    expect(pathname).toBe('/profile');
  });

  it('Verifica a visualização do email', async () => {
    renderWithRouterAndRedux(<App />, {}, '/profile');
    const emailText = await screen.findByText(/teste@teste.com/i);
    expect(emailText).toBeInTheDocument();
  });

  it('Verifica se todos os botões da página existem', () => {
    const numberOfButtons = 4;
    renderWithRouterAndRedux(<App />, {}, '/profile');
    const profileButtons = screen.getAllByRole('button');
    expect(profileButtons).toHaveLength(numberOfButtons);
  });

  it('Verifica o botão de receitas concluídas', async () => {
    const { history } = renderWithRouterAndRedux(<App />, {}, '/profile');
    const doneRecipesBtn = await screen.findByRole('button', { name: /done recipes/i });
    userEvent.click(doneRecipesBtn);
    const { pathname } = history.location;
    expect(pathname).toBe('/done-recipes');
  });

  it('Verifica o botão de receitas favoritas', async () => {
    const { history } = renderWithRouterAndRedux(<App />, {}, '/profile');
    const favoriteRecipes = await screen
      .findByRole('button', { name: /favorite recipes/i });
    userEvent.click(favoriteRecipes);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorite-recipes');
  });

  it.only('Verifica o botão de logout', async () => {
    const { history } = renderWithRouterAndRedux(<App />, {}, '/profile');
    const logoutBtn = await screen.findByRole('button', { name: /logout/i });
    userEvent.click(logoutBtn);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
    expect(localStorage).toHaveLength(0);
  });
});
