import React from 'react';
import { screen, wait } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouterAndRedux from './renderWithRouterAndRedux';
import DrinkDetail from '../pages/DrinkDetail';
import oneMeal from '../../cypress/mocks/oneMeal';
import meals from '../../cypress/mocks/meals';
import oneDrink from '../../cypress/mocks/oneDrink';
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
  it('Verifica se a página renderiza a receita e suas informações', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(oneDrink),
    });
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(meals),
    });
    const { history } = renderWithRouterAndRedux(
      <DrinkDetail />,
      {},
      pathname,
    );
    expect(history.location.pathname).toBe(pathname);

    const title = await screen.findByTestId('recipe-title');
    const image = await screen.findByTestId('recipe-photo');
    const category = await screen.findByTestId('recipe-category');
    const ingredient0 = await screen.findByTestId('0-ingredient-name-and-measure');
    const ingredient1 = await screen.findByTestId('1-ingredient-name-and-measure');
    const ingredient2 = await screen.findByTestId('2-ingredient-name-and-measure');
    const instructions = await screen.findByTestId('instructions');

    expect(image).toHaveProperty('src', oneDrink.drinks[0].strDrinkThumb);
    expect(title).toHaveTextContent(oneDrink.drinks[0].strDrink);
    expect(category).toHaveTextContent(oneDrink.drinks[0].strAlcoholic);
    expect(ingredient0).toHaveTextContent(/Hpnotiq/i);
    expect(ingredient1).toHaveTextContent(/Pineapple Juice/i);
    expect(ingredient2).toHaveTextContent(/Banana Liqueur/i);
    expect(instructions).toHaveTextContent(oneDrink.drinks[0].strInstructions);
  });
  it('Verifica se a página renderiza cartões de recomendações', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(oneDrink),
    });
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(meals),
    });
    renderWithRouterAndRedux(
      <DrinkDetail />,
      {},
      pathname,
    );
    await wait(() => verifyFoodsCards(meals));
  });
  it('Verifica se é possível favoritar e compartilhar link de receita', async () => {
    await act(async () => {
      const mockClipboard = {
        writeText: jest.fn(),
      };
      global.navigator.clipboard = mockClipboard;
      jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(oneDrink),
      });
      jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(meals),
      });
      renderWithRouterAndRedux(
        <DrinkDetail />,
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
        expect(navigator.clipboard.writeText).toBeCalledWith('http://localhost:3000/drinks/178319');
        expect(screen.getByText('Link copied!')).toBeDefined();
      });
    });
  });
  it('Verifica se é possível acessar food de recomendação', async () => {
    await act(async () => {
      jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(oneDrink),
      });
      jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(meals),
      });
      jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(oneMeal),
      });
      const { history } = renderWithRouterAndRedux(
        <App />,
        {},
        pathname,
      );
      const recomendationCard = await screen.findByTestId('0-recomendation-card');

      userEvent.click(recomendationCard);

      await wait(() => {
        expect(history.location.pathname).toBe('/foods/52977');

        const image = screen.getByTestId('recipe-photo');
        const title = screen.getByTestId('recipe-title');
        const category = screen.getByTestId('recipe-category');
        const ingredient0 = screen.getByTestId('0-ingredient-name-and-measure');
        const ingredient1 = screen.getByTestId('1-ingredient-name-and-measure');
        const ingredient2 = screen.getByTestId('2-ingredient-name-and-measure');
        const ingredient3 = screen.getByTestId('3-ingredient-name-and-measure');
        const ingredient4 = screen.getByTestId('4-ingredient-name-and-measure');
        const ingredient5 = screen.getByTestId('5-ingredient-name-and-measure');
        const ingredient6 = screen.getByTestId('6-ingredient-name-and-measure');
        const ingredient7 = screen.getByTestId('7-ingredient-name-and-measure');
        const instructions = screen.getByTestId('instructions');
        const video = screen.getByTestId('video');

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
    });
  });
});
