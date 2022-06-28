import React from 'react';
import { screen, wait } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './renderWithRouterAndRedux';
import ExploreDrinks from '../pages/ExploreDrinks';
import App from '../App';
import oneDrink from '../../cypress/mocks/oneDrink';

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

  it(`Verifica se surpriseMeButton é redirecionado
  para tela de detalhes de uma bebida aleatória`, async () => {
    const randomDrink = oneDrink;

    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(randomDrink),
    });

    const { history } = renderWithRouterAndRedux(

      <App />,
      {},
      '/explore/drinks',
    );

    const surpriseMeButton = screen.getByTestId(exploreSurpriseMe);

    userEvent.click(surpriseMeButton);

    await wait(() => expect(history.location.pathname).toBe('/explore/drinks/178319'));
  });
});
