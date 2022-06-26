import React from 'react';
import { screen, wait } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './renderWithRouterAndRedux';
import meals from '../../cypress/mocks/meals';
import mealCategories from '../../cypress/mocks/mealCategories';
import Foods from '../pages/Foods';
import App from '../App';

describe('Testa o componente Foods e suas funcionalidades', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(meals),
    });

    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mealCategories),
    });
  });

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
  it('Verifica se a página resderiza 12 receitas com informações corretas',
    async () => {
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
      const totalRecipesNumber = 12;
      meals.meals.forEach((recipe, index) => {
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
    });
});
