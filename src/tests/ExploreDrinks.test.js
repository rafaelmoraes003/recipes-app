import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './renderWithRouterAndRedux';
import ExploreDrinks from '../pages/ExploreDrinks';

const exploreByIngredient = 'explore-by-ingredient';
const exploreSurpriseMe = 'explore-surprise';

describe('Testa o componente ExploreDrinks e suas funcionalidades', () => {
  it('Verifica se existem 3 buttons na tela', () => {
    renderWithRouterAndRedux(

      <ExploreDrinks />,
      {},
      '/ExploreDrinks',
    );
    const exploreByIngredientButton = screen.getByTestId(exploreByIngredient);
    expect(exploreByIngredientButton).toBeInTheDocument();

    const exploreSurpriseMeButton = screen.getByTestId(exploreSurpriseMe);
    expect(exploreSurpriseMeButton).toBeInTheDocument();
  });

  it('Verifica se ByIngredientButton é redirecionado para tela DrinksIngredient', () => {
    const { history } = renderWithRouterAndRedux(

      <ExploreDrinks />,
      {},
      '/ExploreDrinks',
    );

    const exploreByIngredientButton = screen.getByTestId(exploreByIngredient);

    userEvent.click(exploreByIngredientButton);

    const { pathname } = history.location;
    expect(pathname).toBe('/explore/drinks/ingredients');
  });
});
