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
  const ingredientTres = '3-ingredient-step';
  const ingredientQuatro = '4-ingredient-step';
  const ingredientCinco = '5-ingredient-step';
  const ingredientSeis = '6-ingredient-step';
  const ingredientSete = '7-ingredient-step';

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
    const ingredient0 = await screen.findByTestId(ingredientZero);
    const ingredient1 = await screen.findByTestId(ingredientUm);
    const ingredient2 = await screen.findByTestId(ingredientDois);
    const ingredient3 = await screen.findByTestId(ingredientTres);
    const ingredient4 = await screen.findByTestId(ingredientQuatro);
    const ingredient5 = await screen.findByTestId(ingredientCinco);
    const ingredient6 = await screen.findByTestId(ingredientSeis);
    const ingredient7 = await screen.findByTestId(ingredientSete);
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
  it('Verifica se é possível marcar e desmarcar os ingredientes', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(oneMeal),
    });
    renderWithRouterAndRedux(
      <ProgressFoods />,
      {},
      pathname,
    );
    const ingredient0 = await screen.findByTestId(ingredientZero);
    const ingredient1 = await screen.findByTestId(ingredientUm);
    const ingredient2 = await screen.findByTestId(ingredientDois);
    const ingredient3 = await screen.findByTestId(ingredientTres);
    const ingredient4 = await screen.findByTestId(ingredientQuatro);
    const ingredient5 = await screen.findByTestId(ingredientCinco);
    const ingredient6 = await screen.findByTestId(ingredientSeis);
    const ingredient7 = await screen.findByTestId(ingredientSete);

    verifyCheck(ingredient0);
    verifyCheck(ingredient1);
    verifyCheck(ingredient2);
    verifyCheck(ingredient3);
    verifyCheck(ingredient4);
    verifyCheck(ingredient5);
    verifyCheck(ingredient6);
    verifyCheck(ingredient7);
  });
  it('Verifica o funcionamento do botão Finish Recipe', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(oneMeal),
    });
    const { history } = renderWithRouterAndRedux(
      <App />,
      {},
      pathname,
    );
    const ingredient0 = await screen.findByTestId(ingredientZero);
    const ingredient1 = await screen.findByTestId(ingredientUm);
    const ingredient2 = await screen.findByTestId(ingredientDois);
    const ingredient3 = await screen.findByTestId(ingredientTres);
    const ingredient4 = await screen.findByTestId(ingredientQuatro);
    const ingredient5 = await screen.findByTestId(ingredientCinco);
    const ingredient6 = await screen.findByTestId(ingredientSeis);
    const ingredient7 = await screen.findByTestId(ingredientSete);
    const finishButton = await screen.findByTestId('finish-recipe-btn');

    expect(finishButton).toBeDisabled();
    userEvent.click(ingredient0);
    expect(finishButton).toBeDisabled();
    userEvent.click(ingredient1);
    expect(finishButton).toBeDisabled();
    userEvent.click(ingredient2);
    expect(finishButton).toBeDisabled();
    userEvent.click(ingredient3);
    expect(finishButton).toBeDisabled();
    userEvent.click(ingredient4);
    expect(finishButton).toBeDisabled();
    userEvent.click(ingredient5);
    expect(finishButton).toBeDisabled();
    userEvent.click(ingredient6);
    expect(finishButton).toBeDisabled();
    userEvent.click(ingredient7);
    expect(finishButton).not.toBeDisabled();

    userEvent.click(finishButton);

    await wait(() => {
      expect(history.location.pathname).toBe('/done-recipes');
      expect(screen.getByTestId('page-title')).toHaveTextContent('Done Recipes');
    });
  });
});
