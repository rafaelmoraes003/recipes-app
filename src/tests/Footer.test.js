import React from 'react';
import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import userEvent from '@testing-library/user-event';
import Footer from '../components/Footer';
import renderWithRouterAndRedux from './renderWithRouterAndRedux';
import App from '../App';
import Foods from '../pages/Foods';

describe('Testa o componente Footer e suas funcionalidades', () => {
  it('Verifica a existência do footer', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    );
    const footer = screen.getByTestId('footer');
    expect(footer).toBeInTheDocument();
  });

  it('Verifica os elementos do footer', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    );
    const drinks = screen.getByRole('button', { name: /drink/i });
    const foods = screen.getByRole('button', { name: /food/i });
    const explorer = screen.getByRole('button', { name: /explore/i });
    expect(drinks).toBeInTheDocument();
    expect(foods).toBeInTheDocument();
    expect(explorer).toBeInTheDocument();
  });

  const arrRoutes = ['/foods', '/drinks', '/explore', '/explore/foods',
    '/explore/drinks', '/explore/foods/ingredients',
    '/explore/drinks/ingredients', '/explore/foods/nationalities',
    '/profile'];
  arrRoutes.forEach((route) => {
    it(`Verifica se o <Footer /> é exibido apenas na rota ${route}`, () => {
      renderWithRouterAndRedux(<App />, {}, route);
      const footer = screen.getByTestId('footer');
      expect(footer).toBeInTheDocument();
    });
  });

  it('Redirecione para uma lista de cocktails ao clicar no ícone de bebidas', () => {
    const { history } = renderWithRouterAndRedux(
      <Foods />,
    );
    const drinks = screen.getByRole('button', { name: /drink/i });
    userEvent.click(drinks);
    expect(history.location.pathname).toBe('/drinks');
  });

  it('Redirecione para a tela de explorar ao clicar no ícone de exploração', () => {
    const { history } = renderWithRouterAndRedux(
      <Foods />,
    );
    const explorer = screen.getByRole('button', { name: /explore/i });
    userEvent.click(explorer);
    expect(history.location.pathname).toBe('/explore');
  });

  it('Redirecione para uma lista de comidas ao clicar no ícone de comidas', () => {
    const { history } = renderWithRouterAndRedux(
      <Foods />,
    );
    const food = screen.getByRole('button', { name: /food/i });
    userEvent.click(food);
    expect(history.location.pathname).toBe('/foods');
  });
});
