import React from 'react';
import { screen, wait } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouterAndRedux from './renderWithRouterAndRedux';
import ExploreFoodNationality from '../pages/ExploreFoodNationality';
import fetch from '../../cypress/mocks/fetch';
import meals from '../../cypress/mocks/meals';
import areas from '../../cypress/mocks/areas';
import japaneseMeals from '../../cypress/mocks/japaneseMeals';

describe('Testa a página ExploreFoodNationality e suas funcionalidades', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(fetch);
  });

  const pathname = '/explore/foods/nationalities';

  const verifyFoodsCards = (mealsObject) => {
    const totalRecipesNumber = 12;
    mealsObject.meals.forEach((recipe, index) => {
      if (index < totalRecipesNumber) {
        expect(screen.getByTestId(`${index}-recipe-card`)).toBeInTheDocument();
        expect(screen.getByTestId(`${index}-card-name`)).toBeInTheDocument();
        expect(screen.getByTestId(`${index}-card-name`))
          .toHaveTextContent(recipe.strMeal);
        expect(screen.getByTestId(`${index}-card-img`)).toBeInTheDocument();
        expect(screen.getByTestId(`${index}-card-img`).src)
          .toBe(recipe.strMealThumb);
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
  it('Verifica a renderização inicial da página', async () => {
    const { history } = renderWithRouterAndRedux(
      <ExploreFoodNationality />,
      {},
      pathname,
    );
    await wait(() => expect(history.location.pathname).toBe(pathname));
    verifyFoodsCards(meals);

    areas.meals.forEach(({ strArea }) => {
      expect(screen.getByTestId(`${strArea}-option`)).toBeInTheDocument();
    });
  });
  it('Verifica se é possível buscar por nacionalidade', async () => {
    await act(async () => {
      const { history } = renderWithRouterAndRedux(
        <ExploreFoodNationality />,
        {},
        pathname,
      );

      const select = await screen.findByTestId('explore-by-nationality-dropdown');
      const japanese = await screen.findByText('Japanese');

      expect(japanese).toBeInTheDocument();

      userEvent.selectOptions(select, ['Japanese']);

      await wait(() => {
        expect(history.location.pathname).toBe(pathname);
        verifyFoodsCards(japaneseMeals);
      });
    });
  });
});
