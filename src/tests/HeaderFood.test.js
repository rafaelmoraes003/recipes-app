import React from 'react';
import { screen, wait } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouterAndRedux from './renderWithRouterAndRedux';
import meals from '../../cypress/mocks/meals';
import drinks from '../../cypress/mocks/drinks';
import soupMeals from '../../cypress/mocks/soupMeals';
import oneMeal from '../../cypress/mocks/oneMeal';
import emptyMeals from '../../cypress/mocks/emptyMeals';
import mealCategories from '../../cypress/mocks/mealCategories';

const route = '/foods';

const spyOns = (response) => {
  jest.spyOn(global, 'fetch').mockResolvedValueOnce({
    json: jest.fn().mockResolvedValueOnce(response),
  });
};

const searchIconTestId = 'search-top-btn';
const nameID = 'name-search-radio';
const firstLetterID = 'first-letter-search-radio';
const searchInputID = 'search-input';
const searchButtonID = 'exec-search-btn';

describe('Testa o input do header', () => {
  it('Verifica se é possível filtrar por nome', async () => {
    spyOns(meals);
    spyOns(mealCategories);
    spyOns(soupMeals);
    const numberOfCards = 12;

    await act(async () => {
      renderWithRouterAndRedux(<App />, {}, route);
      const searchIcon = screen.getByTestId(searchIconTestId);

      userEvent.click(searchIcon);

      const nameRadio = await screen.findByTestId(nameID);
      const searchInput = await screen.findByTestId(searchInputID);
      const searchButton = await screen.findByTestId(searchButtonID);

      userEvent.click(nameRadio);
      userEvent.type(searchInput, 'soup');
      userEvent.click(searchButton);
      const soupImages = await screen.findAllByRole('img');
      expect(soupImages).toHaveLength(numberOfCards);
      soupImages.forEach((soup, index) => {
        expect(screen.getByTestId(`${index}-recipe-card`)).toBeInTheDocument();
      });
    });
  });

  it('Testa se dispara alert', async () => {
    spyOns(meals);
    spyOns(mealCategories);
    spyOns(emptyMeals);

    global.alert = jest.fn();

    await act(async () => {
      renderWithRouterAndRedux(<App />, {}, route);
      const searchIcon = screen.getByTestId(searchIconTestId);

      userEvent.click(searchIcon);

      const nameRadio = await screen.findByTestId(nameID);
      const searchInput = await screen.findByTestId(searchInputID);
      const searchButton = await screen.findByTestId(searchButtonID);

      userEvent.click(nameRadio);
      userEvent.type(searchInput, 'berinjela');
      userEvent.click(searchButton);
      await wait(() => expect(global.alert).toHaveBeenCalled());
    });
  });
  it('Testa se muda de rota', async () => {
    spyOns(meals);
    spyOns(mealCategories);
    spyOns(oneMeal);

    await act(async () => {
      const { history } = renderWithRouterAndRedux(<App />, {}, route);
      const searchIcon = screen.getByTestId(searchIconTestId);

      userEvent.click(searchIcon);

      const nameRadio = await screen.findByTestId(nameID);
      const searchInput = await screen.findByTestId(searchInputID);
      const searchButton = await screen.findByTestId(searchButtonID);

      userEvent.click(nameRadio);
      userEvent.type(searchInput, 'Arrabiata');
      userEvent.click(searchButton);
      spyOns(oneMeal);
      spyOns(drinks);
      await wait(() => {
        const { pathname } = history.location;
        expect(pathname).toBe('/foods/52771');
      });
    });
  });

  it('Testa pesquisa por primeira letra', async () => {
    spyOns(meals);
    spyOns(mealCategories);
    const cardsWithFirstLetterEqualToA = 4;

    await act(async () => {
      renderWithRouterAndRedux(<App />, {}, route);
      const searchIcon = screen.getByTestId(searchIconTestId);

      userEvent.click(searchIcon);

      const firstLetter = await screen.findByTestId(firstLetterID);
      const searchInput = await screen.findByTestId(searchInputID);
      const searchButton = await screen.findByTestId(searchButtonID);

      userEvent.click(firstLetter);
      userEvent.type(searchInput, 'a');
      userEvent.click(searchButton);

      await wait(async () => {
        const imageCards = await screen.findAllByRole('img');
        expect(imageCards).toHaveLength(cardsWithFirstLetterEqualToA);
      });
    });
  });

  it('Testa pesquisa por primeira letra - erro', async () => {
    spyOns(meals);
    spyOns(mealCategories);
    spyOns(emptyMeals);
    global.alert = jest.fn();

    await act(async () => {
      renderWithRouterAndRedux(<App />, {}, route);
      const searchIcon = screen.getByTestId(searchIconTestId);

      userEvent.click(searchIcon);

      const firstLetter = await screen.findByTestId(firstLetterID);
      const searchInput = await screen.findByTestId(searchInputID);
      const searchButton = await screen.findByTestId(searchButtonID);

      userEvent.click(firstLetter);
      userEvent.type(searchInput, 'z');
      userEvent.click(searchButton);

      await wait(() => expect(global.fetch).toHaveBeenCalled());
    });
  });

  it(`Verifica se lança erro ao pesquisa por 
  primeira letra e colocar 2 letras`, async () => {
    spyOns(meals);
    spyOns(mealCategories);
    global.alert = jest.fn();

    await act(async () => {
      renderWithRouterAndRedux(<App />, {}, route);
      const searchIcon = screen.getByTestId(searchIconTestId);

      userEvent.click(searchIcon);

      const firstLetter = await screen.findByTestId(firstLetterID);
      const searchInput = await screen.findByTestId(searchInputID);
      const searchButton = await screen.findByTestId(searchButtonID);

      userEvent.click(firstLetter);
      userEvent.type(searchInput, 'aaa');
      userEvent.click(searchButton);
      expect(global.alert).toHaveBeenCalled();
      expect(global.alert)
        .toHaveBeenCalledWith('Your search must have only 1 (one) character');
    });
  });

  it('Verifica erro ao pesquisar por ingrediante que não existe', async () => {
    spyOns(meals);
    spyOns(mealCategories);
    // spyOns(emptyMeals);
    global.alert = jest.fn();

    await act(async () => {
      renderWithRouterAndRedux(<App />, {}, route);

      const searchIcon = screen.getByTestId(searchIconTestId);

      userEvent.click(searchIcon);

      const ingredientRadio = await screen.findByTestId('ingredient-search-radio');
      const searchInput = await screen.findByTestId(searchInputID);
      const searchButton = await screen.findByTestId(searchButtonID);

      userEvent.click(ingredientRadio);
      userEvent.type(searchInput, 'pimenta');
      userEvent.click(searchButton);
      await wait(() => expect(global.alert).toHaveBeenCalled());
    });
  });
});
