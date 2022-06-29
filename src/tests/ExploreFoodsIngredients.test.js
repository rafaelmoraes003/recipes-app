import { screen, wait } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import chickenMeals from '../../cypress/mocks/chickenMeals';
import mealIngredients from '../../cypress/mocks/mealIngredients';
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

  const ingredPage = '/explore/foods/ingredients';

  it('Verifica se 12 cards são carregados', async () => {
    const ingredList = mealIngredients;

    spyOns(ingredList);

    renderWithRouterAndRedux(

      <App />,
      {},
      ingredPage,
    );

    const firstIngredFromList = await screen.findByRole('button', { name: /chicken/i });
    expect(firstIngredFromList).toBeInTheDocument();

    const lastIngredFromList = await screen
      .findByRole('button', { name: /balsamic vinegar/i });
    expect(lastIngredFromList).toBeInTheDocument();
  });

  it('Verifica se as imagens correspondem ao item', async () => {
    const ingredList = mealIngredients;

    spyOns(ingredList);

    renderWithRouterAndRedux(

      <App />,
      {},
      ingredPage,
    );

    const ingredImg = await screen.findByTestId('1-card-img');
    expect(ingredImg).toHaveAttribute('src', expect.stringContaining('https://www.themealdb.com/images/ingredients/Salmon-Small.png'));

    const ingredName = await screen.findByTestId('1-card-name');
    expect(ingredName).toHaveTextContent(/salmon/i);

    const ingredImgB = await screen.findByTestId('3-card-img');
    expect(ingredImgB).toHaveAttribute('src', expect.stringContaining('https://www.themealdb.com/images/ingredients/Pork-Small.png'));

    const ingredNameB = await screen.findByTestId('3-card-name');
    expect(ingredNameB).toHaveTextContent(/pork/i);
  });

  it(`Verifica se ao clicar no ingrediente a página /foods recarrega
  listando as receitas contendo o ingrediente`, async () => {
    const ingredList = mealIngredients;

    spyOns(ingredList);
    spyOns(chickenMeals);

    const { history } = renderWithRouterAndRedux(

      <App />,
      {},
      ingredPage,
    );

    const firstIngredFromList = await screen.findByRole('button', { name: /chicken/i });

    userEvent.click(firstIngredFromList);

    await wait(() => expect(history.location.pathname).toBe('/foods'));

    const firstChickenRecipe = await screen.findByTestId('0-card-name');
    expect(firstChickenRecipe).toHaveTextContent(/brown stew chicken/i);

    const secondChickenRecipe = await screen.findByTestId('1-card-name');
    expect(secondChickenRecipe).toHaveTextContent(/chick-fil-a sandwich/i);
  });
});
