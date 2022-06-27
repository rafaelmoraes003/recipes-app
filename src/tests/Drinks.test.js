import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouterAndRedux from './renderWithRouterAndRedux';
import drinks from '../../cypress/mocks/drinks';
import drinkCategories from '../../cypress/mocks/drinkCategories';
import ordinaryDrinks from '../../cypress/mocks/ordinaryDrinks';
import cocktailDrinks from '../../cypress/mocks/cocktailDrinks';
import milkDrinks from '../../cypress/mocks/milkDrinks';
import otherDrinks from '../../cypress/mocks/otherDrinks';
import cocoaDrinks from '../../cypress/mocks/cocoaDrinks';
import drinksByIngredient from '../../cypress/mocks/drinksByIngredient';
import Drinks from '../pages/Drinks';

describe('Testa o componente Drinks e suas funcionalidades', () => {
  const verifyDrinksCards = (drinksObject) => {
    const totalRecipesNumber = 12;
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
  it('Verifica se a página resderiza 12 receitas retornadas pela API', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(drinks),
    });

    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(drinkCategories),
    });
    const { history } = renderWithRouterAndRedux(

      <Drinks />,
      {},
      '/drinks',
    );
    await waitFor(() => expect(history.location.pathname).toBe('/drinks'));
    const totalRecipesNumber = 12;
    drinks.drinks.slice(0, totalRecipesNumber).forEach((recipeIndex) => {
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
      json: jest.fn().mockResolvedValueOnce(drinks),
    });

    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(drinkCategories),
    });
    const { history } = renderWithRouterAndRedux(

      <Drinks />,
      {},
      '/drinks',
    );
    await waitFor(() => expect(history.location.pathname).toBe('/drinks'));
    verifyDrinksCards(drinks);
  });
  it('Verifica as categorias renderizadas e se é possível filtrar por categorias',
    async () => {
      jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(drinks),
      });

      jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(drinkCategories),
      });

      jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(ordinaryDrinks),
      });

      jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(cocktailDrinks),
      });

      jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(milkDrinks),
      });

      jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(otherDrinks),
      });

      jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(cocoaDrinks),
      });

      jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(drinks),
      });
      await act(async () => {
        renderWithRouterAndRedux(
          <Drinks />,
          {},
          '/drinks',
        );
        const OrdinaryDrink = await screen
          .findByLabelText('Ordinary Drink', { selector: 'input' });
        const Cocktail = await screen.findByLabelText('Cocktail', { selector: 'input' });
        const Milk = await screen.findByLabelText(/Milk/, { selector: 'input' });
        const Other = await screen.findByLabelText(/Other/, { selector: 'input' });
        const Cocoa = await screen.findByLabelText('Cocoa', { selector: 'input' });

        expect(Other).toBeInTheDocument();
        expect(Cocoa).toBeInTheDocument();

        userEvent.click(OrdinaryDrink);

        await waitFor(() => verifyDrinksCards(ordinaryDrinks));

        userEvent.click(Cocktail);

        await waitFor(() => verifyDrinksCards(cocktailDrinks));

        userEvent.click(Milk);

        await waitFor(() => verifyDrinksCards(milkDrinks));

        userEvent.click(Other);

        await waitFor(() => verifyDrinksCards(otherDrinks));

        userEvent.click(Cocoa);

        await waitFor(() => verifyDrinksCards(cocoaDrinks));

        const All = await screen.findByLabelText('All', { selector: 'input' });
        userEvent.click(All);

        await waitFor(() => verifyDrinksCards(drinks));
      });
    });
  it('Verifica se ao clicar em uma categoria filtrada, o filtro é retirado', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(drinks),
    });

    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(drinkCategories),
    });

    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(cocoaDrinks),
    });

    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(drinks),
    });
    await act(async () => {
      renderWithRouterAndRedux(
        <Drinks />,
        {},
        '/drinks',
      );

      const Cocoa = await screen.findByLabelText('Cocoa', { selector: 'input' });

      userEvent.click(Cocoa);

      await waitFor(() => verifyDrinksCards(cocoaDrinks));

      userEvent.click(Cocoa);

      await waitFor(() => verifyDrinksCards(drinks));
    });
  });
  it('Verifica se é possível filtrar por ingrediente', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(drinks),
    });

    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(drinkCategories),
    });

    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(drinksByIngredient),
    });
    await act(async () => {
      renderWithRouterAndRedux(
        <Drinks />,
        {},
        '/drinks',
      );
      const searchIcon = screen.getByTestId('search-top-btn');

      userEvent.click(searchIcon);

      const ingredientRadio = await screen.findByTestId('ingredient-search-radio');
      const searchInput = await screen.findByTestId('search-input');
      const searchButton = await screen.findByTestId('exec-search-btn');

      userEvent.click(ingredientRadio);
      userEvent.type(searchInput, 'lemon');
      userEvent.click(searchButton);

      await waitFor(() => verifyDrinksCards(drinksByIngredient));
    });
  });
});
