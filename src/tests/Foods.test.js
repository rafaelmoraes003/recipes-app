import React from 'react';
import { screen, wait } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouterAndRedux from './renderWithRouterAndRedux';
import meals from '../../cypress/mocks/meals';
import mealCategories from '../../cypress/mocks/mealCategories';
import beefMeals from '../../cypress/mocks/beefMeals';
import breakfastMeals from '../../cypress/mocks/breakfastMeals';
import chickenMeals from '../../cypress/mocks/chickenMeals';
import dessertMeals from '../../cypress/mocks/dessertMeals';
import goatMeals from '../../cypress/mocks/goatMeals';
import mealsByIngredient from '../../cypress/mocks/mealsByIngredient';
import Foods from '../pages/Foods';
import App from '../App';

describe('Testa o componente Foods e suas funcionalidades', () => {
  const verifyFoodsCars = (mealsObject) => {
    const totalRecipesNumber = 12;
    mealsObject.meals.forEach((recipe, index) => {
      if (index < totalRecipesNumber) {
        expect(screen.getByTestId(`${index}-recipe-card`)).toBeInTheDocument();
        expect(screen.getByTestId(`${index}-card-name`)).toBeInTheDocument();
        expect(screen.getByTestId(`${index}-card-name`))
          .toHaveTextContent(recipe.strMeal);
        expect(screen.getByTestId(`${index}-card-img`)).toBeInTheDocument();
        expect(screen.getByTestId(`${index}-card-img`).src)
          .toBe(recipe.strMealThumb);
      } else {
        expect(screen.queryByTestId(`${index}-recipe-card`))
          .not.toBeInTheDocument();
        expect(screen.queryByTestId(`${index}-card-name`))
          .not.toBeInTheDocument();
        expect(screen.queryByTestId(`${index}-card-img`))
          .not.toBeInTheDocument();
      }
    });
  };
  afterEach(() => {
    jest.spyOn(global, 'fetch').mockRestore();
  });

  it('Verifica se a página Foods é renderizada ao fazer login', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByRole('textbox', { name: /e-mail/i });
    const passwordInput = screen.getByLabelText(/password/i);
    const button = screen.getByRole('button', { name: /login/i });

    userEvent.type(emailInput, 'teste@teste.com');
    userEvent.type(passwordInput, '1234567');
    userEvent.click(button);

    await wait(() => expect(history.location.pathname).toBe('/foods'));
  });
  it('Verifica se a página resderiza 12 receitas retornadas pela API', async () => {
    const { history } = renderWithRouterAndRedux(

      <Foods />,
      {},
      '/foods',
    );
    await wait(() => expect(history.location.pathname).toBe('/foods'));
    const totalRecipesNumber = 12;
    meals.meals.slice(0, totalRecipesNumber).forEach((recipeIndex) => {
      if (recipeIndex < totalRecipesNumber) {
        expect(screen.getByTestId(`${recipeIndex}-recipe-card`)).toBeInTheDocument();
        expect(screen.getByTestId(`${recipeIndex}-card-name`)).toBeInTheDocument();
        expect(screen.getByTestId(`${recipeIndex}-card-img`)).toBeInTheDocument();
      } else {
        expect(screen.queryByTestId(`${recipeIndex}-recipe-card`))
          .not.toBeInTheDocument();
        expect(screen.queryByTestId(`${recipeIndex}-card-name`))
          .not.toBeInTheDocument();
        expect(screen.queryByTestId(`${recipeIndex}-card-img`))
          .not.toBeInTheDocument();
      }
    });
  });
  it('Verifica se a página resderiza 12 receitas com informações corretas', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(meals),
    });

    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mealCategories),
    });
    const { history } = renderWithRouterAndRedux(

      <Foods />,
      {},
      '/foods',
    );
    await wait(() => expect(history.location.pathname).toBe('/foods'));
    verifyFoodsCars(meals);
  });
  it('Verifica as categorias renderizadas e se é possível filtrar por categorias',
    async () => {
      jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(meals),
      });

      jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(mealCategories),
      });

      jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(beefMeals),
      });

      jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(breakfastMeals),
      });

      jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(chickenMeals),
      });

      jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(dessertMeals),
      });

      jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(goatMeals),
      });

      jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(meals),
      });
      await act(async () => {
        renderWithRouterAndRedux(
          <Foods />,
          {},
          '/foods',
        );
        const Beef = await screen.findByTestId('Beef-category-filter');
        const Breakfast = await screen
          .findByLabelText('Breakfast', { selector: 'input' });
        const Chicken = await screen.findByLabelText('Chicken', { selector: 'input' });
        const Dessert = await screen.findByLabelText('Dessert', { selector: 'input' });
        const Goat = await screen.findByLabelText('Goat', { selector: 'input' });

        userEvent.click(Beef);

        await wait(() => verifyFoodsCars(beefMeals));

        userEvent.click(Breakfast);

        await wait(() => verifyFoodsCars(breakfastMeals));

        userEvent.click(Chicken);

        await wait(() => verifyFoodsCars(chickenMeals));

        userEvent.click(Dessert);

        await wait(() => verifyFoodsCars(dessertMeals));

        userEvent.click(Goat);

        await wait(() => verifyFoodsCars(goatMeals));

        const All = await screen.findByLabelText('All', { selector: 'input' });
        userEvent.click(All);

        await wait(() => verifyFoodsCars(meals));
      });
    });
  it('Verifica se ao clicar em uma categoria filtrada, o filtro é retirado', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(meals),
    });

    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mealCategories),
    });

    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(beefMeals),
    });

    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(meals),
    });
    await act(async () => {
      renderWithRouterAndRedux(
        <Foods />,
        {},
        '/foods',
      );
      const Beef = await screen.findByTestId('Beef-category-filter');

      userEvent.click(Beef);

      await wait(() => verifyFoodsCars(beefMeals));

      userEvent.click(Beef);

      await wait(() => verifyFoodsCars(meals));
    });
  });
  it('Verifica se é possível filtrar por ingrediente', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(meals),
    });

    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mealCategories),
    });

    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mealsByIngredient),
    });
    await act(async () => {
      renderWithRouterAndRedux(
        <Foods />,
        {},
        '/foods',
      );
      const searchIcon = screen.getByTestId('search-top-btn');

      userEvent.click(searchIcon);

      const ingredientRadio = await screen.findByTestId('ingredient-search-radio');
      const searchInput = await screen.findByTestId('search-input');
      const searchButton = await screen.findByTestId('exec-search-btn');

      userEvent.click(ingredientRadio);
      userEvent.type(searchInput, 'chicken');
      userEvent.click(searchButton);

      await wait(() => verifyFoodsCars(mealsByIngredient));
    });
  });
});
