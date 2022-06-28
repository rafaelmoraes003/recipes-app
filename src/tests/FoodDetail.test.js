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

describe('Testa o componente FoodDetail e suas funcionalidades', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  const pathname = '/foods/52771';
  const verifyDrinksCards = (drinksObject) => {
    const totalRecipesNumber = 6;
    drinksObject.drinks.forEach((recipe, index) => {
      if (index < totalRecipesNumber) {
        expect(screen.getByTestId(`${index}-recomendation-card`)).toBeInTheDocument();
        expect(screen.getByTestId(`${index}-recomendation-title`)).toBeInTheDocument();
        expect(screen.getByTestId(`${index}-recomendation-title`))
          .toHaveTextContent(recipe.strDrink);
        expect(screen.getByRole('img', { name: recipe.strDrink })).toBeInTheDocument();
        expect(screen.getByRole('img', { name: recipe.strDrink }).src)
          .toBe(recipe.strDrinkThumb);
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
      pathname,
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
  it('Verifica se a página renderiza cartões de recomendações', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(oneMeal),
    });
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(drinks),
    });
    renderWithRouterAndRedux(
      <FoodDetail />,
      {},
      pathname,
    );
    await wait(() => verifyDrinksCards(drinks));
  });
  it('Verifica se épossível favoritar e compartilhar link de receita', async () => {
    await act(async () => {
      const mockClipboard = {
        writeText: jest.fn(),
      };
      global.navigator.clipboard = mockClipboard;
      jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(oneMeal),
      });
      jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(drinks),
      });
      renderWithRouterAndRedux(
        <FoodDetail />,
        {},
        pathname,
      );
      const favoriteButton = await screen.findByTestId('favorite-btn');
      const shareButton = await screen.findByTestId('share-btn');

      expect(favoriteButton).toHaveProperty('src', 'http://localhost/whiteHeartIcon.svg');
      userEvent.click(favoriteButton);
      expect(favoriteButton).toHaveProperty('src', 'http://localhost/blackHeartIcon.svg');
      await wait(() => {
        expect(localStorage).toHaveProperty('favoriteRecipes');
      });
      userEvent.click(favoriteButton);
      expect(favoriteButton).toHaveProperty('src', 'http://localhost/whiteHeartIcon.svg');

      userEvent.click(shareButton);

      await wait(() => {
        expect(navigator.clipboard.writeText).toBeCalled();
        expect(navigator.clipboard.writeText).toBeCalledWith('http://localhost:3000/foods/52771');
        expect(screen.getByText('Link copied!')).toBeDefined();
      });
    });
  });
  it('Verifica se é possível acessar drink de recomendação', async () => {
    await act(async () => {
      jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(oneMeal),
      });

      jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(drinks),
      });

      jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(oneDrink),
      });
      const { history } = renderWithRouterAndRedux(
        <App />,
        {},
        pathname,
      );
      const recomendationCard = await screen.findByTestId('0-recomendation-card');

      userEvent.click(recomendationCard);

      await wait(() => {
        expect(history.location.pathname).toBe('/drinks/15997');

        const title = screen.getByTestId('recipe-title');
        const image = screen.getByTestId('recipe-photo');
        const category = screen.getByTestId('recipe-category');
        const ingredient0 = screen.getByTestId('0-ingredient-name-and-measure');
        const ingredient1 = screen.getByTestId('1-ingredient-name-and-measure');
        const ingredient2 = screen.getByTestId('2-ingredient-name-and-measure');
        const instructions = screen.getByTestId('instructions');

        expect(image).toHaveProperty('src', oneDrink.drinks[0].strDrinkThumb);
        expect(title).toHaveTextContent(oneDrink.drinks[0].strDrink);
        expect(category).toHaveTextContent(oneDrink.drinks[0].strAlcoholic);
        expect(ingredient0).toHaveTextContent(/Hpnotiq/i);
        expect(ingredient1).toHaveTextContent(/Pineapple Juice/i);
        expect(ingredient2).toHaveTextContent(/Banana Liqueur/i);
        expect(instructions).toHaveTextContent(oneDrink.drinks[0].strInstructions);
      });
    });
  });
  it('Verifica o button start-recipe-btn', async () => {
    // const mockFood = jest.spyOn(foodsInLocalStorage);
    foodsInLocalStorage('52771');
    await act(async () => {
      jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(oneMeal),
      });
      jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(drinks),
      });
      jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(oneMeal),
      });
      jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(oneMeal),
      });
      jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(drinks),
      });
      const { history } = renderWithRouterAndRedux(
        <App />,
        {},
        pathname,
      );
      const startButton = await screen.findByTestId('start-recipe-btn');

      expect(startButton).toHaveTextContent('Start Recipe');

      userEvent.click(startButton);

      await wait(() => {
        expect(history.location.pathname).toBe('/foods/52771/in-progress');
      });

      history.push('/foods/52771');

      await wait(() => {
        console.log(history.location.pathname);
        expect(screen.getByTestId('start-recipe-btn'))
          .toHaveTextContent('Continue Recipe');
      });
    });
  });
});
