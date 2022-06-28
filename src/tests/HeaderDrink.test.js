import React from 'react'; //
import { screen, wait } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouterAndRedux from './renderWithRouterAndRedux';
import meals from '../../cypress/mocks/meals';
import drinks from '../../cypress/mocks/drinks';
import drinkCategories from '../../cypress/mocks/drinkCategories';
import oneDrink from '../../cypress/mocks/oneDrink';
import emptyDrinks from '../../cypress/mocks/emptyDrinks';

const spyOns = (response) => {
  jest.spyOn(global, 'fetch').mockResolvedValueOnce({
    json: jest.fn().mockResolvedValueOnce(response),
  });
};

const nameID = 'name-search-radio';
const searchInputID = 'search-input';
const searchButtonID = 'exec-search-btn';

describe('Testa o Header - drinks', () => {
  it('Verifica se muda de rota', async () => {
    spyOns(drinks);
    spyOns(drinkCategories);

    await act(async () => {
      const { history } = renderWithRouterAndRedux(<App />, {}, '/drinks');
      const searchIcon = screen.getByTestId('search-top-btn');

      userEvent.click(searchIcon);

      const nameRadio = await screen.findByTestId(nameID);
      const searchInput = await screen.findByTestId(searchInputID);
      const searchButton = await screen.findByTestId(searchButtonID);

      userEvent.click(nameRadio);
      userEvent.type(searchInput, 'Aquamarine');
      userEvent.click(searchButton);
      spyOns(oneDrink);
      spyOns(meals);
      await wait(() => {
        const { pathname } = history.location;
        expect(pathname).toBe('/drinks/178319');
      });
    });
  });

  it('Verifica se dispara alert com ingrediente não existe', async () => {
    spyOns(drinks);
    spyOns(drinkCategories);
    spyOns(emptyDrinks);
    global.alert = jest.fn();

    await act(async () => {
      renderWithRouterAndRedux(<App />, {}, '/drinks');
      const searchIcon = screen.getByTestId('search-top-btn');

      userEvent.click(searchIcon);

      const ingredientRadio = await screen.findByTestId('ingredient-search-radio');
      const searchInput = await screen.findByTestId(searchInputID);
      const searchButton = await screen.findByTestId(searchButtonID);

      userEvent.click(ingredientRadio);
      userEvent.type(searchInput, 'groselha');
      userEvent.click(searchButton);
      await wait(() => {
        expect(global.alert).toHaveBeenCalled();
      });
    });
  });
});
