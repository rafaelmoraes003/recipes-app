import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import Header from '../components/Header';
import renderWithRouterAndRedux from './renderWithRouterAndRedux';
import meals from '../../cypress/mocks/meals';
import soupMeals from '../../cypress/mocks/soupMeals';
// import oneMeal from '../../cypress/mocks/oneMeal';
import emptyMeals from '../../cypress/mocks/emptyMeals';
import mealCategories from '../../cypress/mocks/mealCategories';

const searchButtonTestId = 'search-top-btn';
const route = '/foods';

describe('Testa o componente Header e suas funcionalidades', () => {
  it('Verifica a existência do header', () => {
    renderWithRouterAndRedux(<Header title="Teste" showSearchIcon />, {}, '/foods');
    const header = screen.getByTestId('header');
    expect(header).toBeInTheDocument();
  });
  it('Verifica searchButton (com showSearchIcon false)', () => {
    renderWithRouterAndRedux(
      <Header title="Teste" showSearchIcon={ false } />, {}, '/profile',
    );
    const searchButton = screen.queryByTestId(searchButtonTestId);
    expect(searchButton).not.toBeInTheDocument();
  });
  it('Verifica searchButton (com showSearchIcon true)', () => {
    renderWithRouterAndRedux(
      <Header title="Teste" showSearchIcon />, {}, '/foods',
    );
    const searchButton = screen.queryByTestId(searchButtonTestId);
    expect(searchButton).toBeInTheDocument();
  });
  it('Verifica profileButton', () => {
    const { history } = renderWithRouterAndRedux(

      <Header title="Teste" showSearchIcon />,
      {},
      '/foods',

    );

    const profileButton = screen.getByTestId('profile-top-btn');

    userEvent.click(profileButton);
    const { pathname } = history.location;
    expect(pathname).toBe('/profile');
  });
  it('Verifica o toggle do input', () => {
    renderWithRouterAndRedux(

      <Header title="Teste" showSearchIcon />,
      {},
      '/foods',

    );

    const searchButton = screen.getByTestId(searchButtonTestId);
    userEvent.click(searchButton);
    const searchInput = screen.getByRole('textbox');
    expect(searchInput).toBeInTheDocument();
    userEvent.click(searchButton);
    expect(searchInput).not.toBeInTheDocument();
  });
});

describe('Testa o input do header', () => {
  it('Verifica se é possível filtrar por nome', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(meals),
    });

    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(soupMeals),
    });

    await act(async () => {
      renderWithRouterAndRedux(
        <App />,
        {},
        route,
      );
      const searchIcon = screen.getByTestId('search-top-btn');

      userEvent.click(searchIcon);

      const ingredientRadio = await screen.findByTestId('ingredient-search-radio');
      const searchInput = await screen.findByTestId('search-input');
      const searchButton = await screen.findByTestId('exec-search-btn');

      userEvent.click(ingredientRadio);
      userEvent.type(searchInput, 'soup');
      userEvent.click(searchButton);
      expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?i=soup');
      const soupImages = await screen.findAllByRole('img');
      expect(soupImages).toHaveLength((2 + 1) * 2 * 2);
      soupImages.forEach((soup, index) => {
        expect(screen.getByTestId(`${index}-recipe-card`)).toBeInTheDocument();
      });
    });
  });

  it.only('Testa se dispara alert', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(meals),
    });

    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mealCategories),
    });

    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(emptyMeals),
    });

    global.alert = jest.fn();

    await act(async () => {
      renderWithRouterAndRedux(<App />, {}, route);
      const searchIcon = screen.getByTestId(searchButtonTestId);

      userEvent.click(searchIcon);

      const nameRadio = await screen.findByTestId('name-search-radio');
      const searchInput = await screen.findByTestId('search-input');
      const searchButton = await screen.findByTestId('exec-search-btn');

      userEvent.click(nameRadio);
      userEvent.type(searchInput, 'xablau');
      userEvent.click(searchButton);
    });
  });
});
