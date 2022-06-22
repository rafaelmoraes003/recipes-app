import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Explore from '../pages/Explore';
import renderWithRouterAndRedux from './renderWithRouterAndRedux';

const exploreFoods = 'explore-foods';
const exploreDrinks = 'explore-drinks';

describe('Testa o componente Explore e suas funcionalidades', () => {
  it('Verifica se existem 2 buttons na tela', () => {
    renderWithRouterAndRedux(

      <Explore />,
      {},
      '/Explore',
    );
    const exploreFoodsButton = screen.getByTestId(exploreFoods);
    expect(exploreFoodsButton).toBeInTheDocument();

    const exploreDrinksButton = screen.getByTestId(exploreDrinks);
    expect(exploreDrinksButton).toBeInTheDocument();
  });

  it('Verifica se o button explore food é redirecionado para tela ExploreFoods', () => {
    const { history } = renderWithRouterAndRedux(

      <Explore />,
      {},
      '/Explore',
    );
    const exploreFoodsButton = screen.getByTestId(exploreFoods);
    expect(exploreFoodsButton).toBeInTheDocument();
    userEvent.click(exploreFoodsButton);

    const { pathname } = history.location;
    expect(pathname).toBe('/explore/foods');
  });

  it(`Verifica se o button explore drinks é 
  redirecionado para tela ExploreDrinks`, () => {
    const { history } = renderWithRouterAndRedux(

      <Explore />,
      {},
      '/Explore',
    );
    const exploreDrinksButton = screen.getByTestId(exploreDrinks);
    expect(exploreDrinksButton).toBeInTheDocument();
    userEvent.click(exploreDrinksButton);

    const { pathname } = history.location;
    expect(pathname).toBe('/explore/drinks');
  });
});
