import React from 'react';
import { screen, wait } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouterAndRedux from './renderWithRouterAndRedux';
import ProgressFoods from '../pages/ProgressFoods';
import oneMeal from '../../cypress/mocks/oneMeal';
import drinks from '../../cypress/mocks/drinks';
import oneDrink from '../../cypress/mocks/oneDrink';
import App from '../App';

describe('Testa o componente FoodDetail e suas funcionalidades', () => {
  const pathname = '/foods/52771/in-progress';
  afterEach(() => {
    jest.spyOn(global, 'fetch').mockRestore();
  });
  it('Verifica se a página renderiza a receita e suas informações', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(oneMeal),
    });
    renderWithRouterAndRedux(
      <ProgressFoods />,
      {},
      pathname,
    );
    const image = await screen.findByTestId('recipe-photo');
    const title = await screen.findByTestId('recipe-title');
    const category = await screen.findByTestId('recipe-category');
    const ingredient0 = await screen.findByTestId('0-ingredient-step');
    const ingredient1 = await screen.findByTestId('1-ingredient-step');
    const ingredient2 = await screen.findByTestId('2-ingredient-step');
    const ingredient3 = await screen.findByTestId('3-ingredient-step');
    const ingredient4 = await screen.findByTestId('4-ingredient-step');
    const ingredient5 = await screen.findByTestId('5-ingredient-step');
    const ingredient6 = await screen.findByTestId('6-ingredient-step');
    const ingredient7 = await screen.findByTestId('7-ingredient-step');
    const instructions = await screen.findByTestId('instructions');

    expect(image.src).toBe(oneMeal.meals[0].strMealThumb);
    expect(title).toHaveTextContent(oneMeal.meals[0].strMeal);
    expect(category).toHaveTextContent(oneMeal.meals[0].strCategory);
    expect(ingredient0).toHaveTextContent(/penne rigate - 1 pound/i);
    expect(ingredient1).toHaveTextContent(/olive oil/i);
    expect(ingredient2).toHaveTextContent(/garlic - 3 cloves/i);
    expect(ingredient3).toHaveTextContent(/chopped tomatoes - 1 tin/i);
    expect(ingredient4).toHaveTextContent(/red chile flakes/i);
    expect(ingredient5).toHaveTextContent(/italian seasoning/i);
    expect(ingredient6).toHaveTextContent(/basil - 6 leaves/i);
    expect(ingredient7).toHaveTextContent(/Parmigiano-Reggiano - spinkling/i);
    expect(instructions).toHaveTextContent(oneMeal.meals[0].strInstructions);
  });
});
