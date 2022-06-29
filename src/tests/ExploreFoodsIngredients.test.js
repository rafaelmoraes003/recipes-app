import { screen } from '@testing-library/react';
import React from 'react';
import mealIngredients from '../../cypress/mocks/mealIngredients';
import App from '../App';
import renderWithRouterAndRedux from './renderWithRouterAndRedux';

describe(`Testa o componente FoodsIngredientCard e a 
página ExploreFoodsIngredients`, () => {
  afterEach(() => {
    jest.spyOn(global, 'fetch').mockRestore();
  });

  it('Verifica se 12 cards são carregados', async () => {
    const ingredList = mealIngredients;

    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(ingredList),
    });

    renderWithRouterAndRedux(

      <App />,
      {},
      '/explore/foods/ingredients',
    );

    const firstIngredFromList = await screen.findByRole('button', { name: /chicken/i });
    expect(firstIngredFromList).toBeInTheDocument();

    const lastIngredFromList = await screen
      .findByRole('button', { name: /balsamic vinegar/i });
    expect(lastIngredFromList).toBeInTheDocument();
  });

  it('Verifica se as imagens correspondem ao item', async () => {
    const ingredList = mealIngredients;

    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(ingredList),
    });

    renderWithRouterAndRedux(

      <App />,
      {},
      '/explore/foods/ingredients',
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

  // it('Verifica se ao clicar no ingrediente a página /foods recarrega listando ', async () => {
  //   const ingredList = mealIngredients;

  //   jest.spyOn(global, 'fetch').mockResolvedValue({
  //     json: jest.fn().mockResolvedValue(ingredList),
  //   });

  //   renderWithRouterAndRedux(

  //     <App />,
  //     {},
  //     '/explore/foods/ingredients',
  //   );

  //   const ingredImg = await screen.findByTestId('1-card-img');
  //   expect(ingredImg).toHaveAttribute('src', expect.stringContaining('https://www.themealdb.com/images/ingredients/Salmon-Small.png'));

  //   const ingredName = await screen.findByTestId('1-card-name');
  //   expect(ingredName).toHaveTextContent(/salmon/i);

  //   const ingredImgB = await screen.findByTestId('3-card-img');
  //   expect(ingredImgB).toHaveAttribute('src', expect.stringContaining('https://www.themealdb.com/images/ingredients/Pork-Small.png'));

  //   const ingredNameB = await screen.findByTestId('3-card-name');
  //   expect(ingredNameB).toHaveTextContent(/pork/i);
  // });
});

// it('Verifica se é possível filtrar por ingrediente', async () => {
//   jest.spyOn(global, 'fetch').mockResolvedValueOnce({
//     json: jest.fn().mockResolvedValueOnce(meals),
//   });

//   jest.spyOn(global, 'fetch').mockResolvedValueOnce({
//     json: jest.fn().mockResolvedValueOnce(mealCategories),
//   });

//   jest.spyOn(global, 'fetch').mockResolvedValueOnce({
//     json: jest.fn().mockResolvedValueOnce(mealsByIngredient),
//   });
//   await act(async () => {
//     renderWithRouterAndRedux(
//       <Foods />,
//       {},
//       '/foods',
//     );
//     const searchIcon = screen.getByTestId('search-top-btn');

//     userEvent.click(searchIcon);

//     const ingredientRadio = await screen.findByTestId('ingredient-search-radio');
//     const searchInput = await screen.findByTestId('search-input');
//     const searchButton = await screen.findByTestId('exec-search-btn');

//     userEvent.click(ingredientRadio);
//     userEvent.type(searchInput, 'chicken');
//     userEvent.click(searchButton);

//     await waitFor(() => verifyFoodsCars(mealsByIngredient));
//   });
