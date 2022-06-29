import { screen, wait } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { act } from 'react-dom/test-utils';
import drinkIngredients from '../../cypress/mocks/drinkIngredients';
import ginDrinks from '../../cypress/mocks/ginDrinks';
import App from '../App';
import renderWithRouterAndRedux from './renderWithRouterAndRedux';

describe(`Testa o componente FoodsIngredientCard e a 
página ExploreFoodsIngredients`, () => {
  afterEach(() => {
    jest.spyOn(global, 'fetch').mockRestore();
  });

  const spyOns = (response) => {
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(response),
    });
  };

  const ingredPage = '/explore/drinks/ingredients';

  it('Verifica se 12 cards são carregados', async () => {
    spyOns(drinkIngredients);

    await act(async () => {
      renderWithRouterAndRedux(

        <App />,
        {},
        ingredPage,
      );

      const firstButton = await screen.findByRole('button', { name: 'Light rum' });
      expect(firstButton).toBeInTheDocument();

      const lastButton = await screen.findByRole('button', { name: 'Brandy' });
      expect(lastButton).toBeInTheDocument();
    });
  });

  it('Verifica se as imagens correspondem ao item', async () => {
    const ingredList = drinkIngredients;

    spyOns(ingredList);

    renderWithRouterAndRedux(

      <App />,
      {},
      ingredPage,
    );

    const ingredientImg = await screen.findByTestId('2-card-img');
    expect(ingredientImg).toHaveAttribute('src', expect.stringContaining('https://www.thecocktaildb.com/images/ingredients/Gin-Small.png'));

    const ingredName = await screen.findByTestId('2-card-name');
    expect(ingredName).toHaveTextContent(/gin/i);

    const ingredImgB = await screen.findByTestId('1-card-img');
    expect(ingredImgB).toHaveAttribute('src', expect.stringContaining('https://www.thecocktaildb.com/images/ingredients/Applejack-Small.png'));

    const ingredNameB = await screen.findByTestId('1-card-name');
    expect(ingredNameB).toHaveTextContent(/applejack/i);
  });

  it(`Verifica se ao clicar no ingrediente a página /foods recarrega
  listando as receitas contendo o ingrediente`, async () => {
    const ingredList = drinkIngredients;

    spyOns(ingredList);
    spyOns(ginDrinks);

    const { history } = renderWithRouterAndRedux(

      <App />,
      {},
      ingredPage,
    );

    const ingredFromList = await screen.findByRole('button', { name: /gin/i });

    userEvent.click(ingredFromList);

    await wait(() => expect(history.location.pathname).toBe('/drinks'));

    const firstChickenRecipe = await screen.findByTestId('0-card-name');
    expect(firstChickenRecipe).toHaveTextContent(/gin fizz/i);

    const secondChickenRecipe = await screen.findByTestId('1-card-name');
    expect(secondChickenRecipe).toHaveTextContent(/gin sour/i);
  });
});
