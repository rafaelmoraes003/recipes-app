import React from 'react';
import { screen, wait } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouterAndRedux from './renderWithRouterAndRedux';
import oneDrink from '../../cypress/mocks/oneDrink';
import App from '../App';
import ProgressDrinks from '../pages/ProgressDrinks';

describe('Testa o componente ProgressDrink e suas funcionalidades', () => {
  const pathname = '/drinks/178319/in-progress';

  const verifyCheck = (ingredient) => {
    userEvent.click(ingredient);
    expect(ingredient)
      .toHaveAttribute('class', 'done');
    userEvent.click(ingredient);
    expect(ingredient)
      .toHaveAttribute('class', 'missing');
  };

  const ingredientZero = '0-ingredient-step';
  const ingredientUm = '1-ingredient-step';
  const ingredientDois = '2-ingredient-step';

  afterEach(() => {
    jest.spyOn(global, 'fetch').mockRestore();
  });
  it('Verifica se a página renderiza a receita e suas informações', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(oneDrink),
    });
    renderWithRouterAndRedux(
      <ProgressDrinks />,
      {},
      pathname,
    );
    const image = await screen.findByTestId('recipe-photo');
    const title = await screen.findByTestId('recipe-title');
    const category = await screen.findByTestId('recipe-category');
    const ingredient0 = await screen.findByTestId(ingredientZero);
    const ingredient1 = await screen.findByTestId(ingredientUm);
    const ingredient2 = await screen.findByTestId(ingredientDois);
    const instructions = await screen.findByTestId('instructions');

    expect(image.src).toBe(oneDrink.drinks[0].strDrinkThumb);
    expect(title).toHaveTextContent(oneDrink.drinks[0].strDrink);
    expect(category).toHaveTextContent(oneDrink.drinks[0].strAlcoholic);
    expect(ingredient0).toHaveTextContent(/Hpnotiq/i);
    expect(ingredient1).toHaveTextContent(/Pineapple Juice/i);
    expect(ingredient2).toHaveTextContent(/Banana Liqueur/i);
    expect(instructions).toHaveTextContent(oneDrink.drinks[0].strInstructions);
  });
});
