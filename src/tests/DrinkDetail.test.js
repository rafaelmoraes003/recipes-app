import React from 'react';
import { screen, wait } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouterAndRedux from './renderWithRouterAndRedux';
import FoodDetail from '../pages/FoodDetail';
import oneMeal from '../../cypress/mocks/oneMeal';
import drinks from '../../cypress/mocks/drinks';
import oneDrink from '../../cypress/mocks/oneDrink';
import { foodsInLocalStorage } from '../helpers/storageFuncs';
import App from '../App';

describe('Testa o componente DrinkDetail e suas funcionalidades', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  const pathname = '/drinks/178319';
  const verifyFoodsCards = (foodsObject) => {
    const totalRecipesNumber = 6;
    foodsObject.meals.forEach((recipe, index) => {
      if (index < totalRecipesNumber) {
        expect(screen.getByTestId(`${index}-recomendation-card`)).toBeInTheDocument();
        expect(screen.getByTestId(`${index}-recomendation-title`)).toBeInTheDocument();
        expect(screen.getByTestId(`${index}-recomendation-title`))
          .toHaveTextContent(recipe.strMeal);
        expect(screen.getByRole('img', { name: recipe.strMeal })).toBeInTheDocument();
        expect(screen.getByRole('img', { name: recipe.strMeal }).src)
          .toBe(recipe.strMealThumb);
      } else {
        expect(screen.queryByTestId(`${index}-recomendation-card`))
          .not.toBeInTheDocument();
        expect(screen.queryByTestId(`${index}-recomendation-title`))
          .not.toBeInTheDocument();
      }
    });
  };
  afterEach(() => {
    jest.spyOn(global, 'fetch').mockRestore();
  });
});
