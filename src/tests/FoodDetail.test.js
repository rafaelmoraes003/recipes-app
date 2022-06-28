import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouterAndRedux from './renderWithRouterAndRedux';
import FoodDetail from '../pages/FoodDetail';
import oneMeal from '../../cypress/mocks/oneMeal';
import drinks from '../../cypress/mocks/drinks';

describe('Testa o componente FoodDetail e suas funcionalidades', () => {
  const verifyDrinksCards = (drinksObject) => {
    const totalRecipesNumber = 5;
    drinksObject.drinks.forEach((recipe, index) => {
      if (index < totalRecipesNumber) {
        expect(screen.getByTestId(`${index}-recipe-card`)).toBeInTheDocument();
        expect(screen.getByTestId(`${index}-card-name`)).toBeInTheDocument();
        expect(screen.getByTestId(`${index}-card-name`))
          .toHaveTextContent(recipe.strDrink);
        expect(screen.getByTestId(`${index}-card-img`)).toBeInTheDocument();
        expect(screen.getByTestId(`${index}-card-img`).src)
          .toBe(recipe.strDrinkThumb);
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
  it('Verifica se a página renderiza a receita e suas informações', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(oneMeal),
    });
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(drinks),
    });
    renderWithRouterAndRedux(
      <FoodDetail />,
      {},
      '/foods/52771',
    );
    const image = await screen.findByTestId('recipe-photo');
    const title = await screen.findByTestId('recipe-title');
    const category = await screen.findByTestId('recipe-category');
    const ingredient0 = await screen.findByTestId('0-ingredient-name-and-measure');
    const ingredient1 = await screen.findByTestId('1-ingredient-name-and-measure');
    const ingredient2 = await screen.findByTestId('2-ingredient-name-and-measure');
    const ingredient3 = await screen.findByTestId('3-ingredient-name-and-measure');
    const ingredient4 = await screen.findByTestId('4-ingredient-name-and-measure');
    const ingredient5 = await screen.findByTestId('5-ingredient-name-and-measure');
    const ingredient6 = await screen.findByTestId('6-ingredient-name-and-measure');
    const ingredient7 = await screen.findByTestId('7-ingredient-name-and-measure');
    const instructions = await screen.findByTestId('instructions');
    const video = await screen.findByTestId('video');

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
    expect(video.src).toBe('https://www.youtube.com/embed/1IszT_guI08');
  });
  it('Verifica se a página renderiza cartões de recoemndações', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(oneMeal),
    });
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(drinks),
    });
    renderWithRouterAndRedux(
      <FoodDetail />,
      {},
      '/foods/52771',
    );
  });
});
