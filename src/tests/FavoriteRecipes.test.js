/* eslint-disable sonarjs/no-duplicate-string */
import React from 'react';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './renderWithRouterAndRedux';
import App from '../App';

const favoriteRecipes = [
  {
    id: '52771',
    type: 'food',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
  },
  {
    id: '178319',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
  },
];

const route = '/favorite-recipes';

describe('Testa a página de receitas favoritas', () => {
  beforeEach(() => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
  });

  Object.assign(navigator, {
    clipboard: {
      writeText: () => {},
    },
  });
  jest.spyOn(navigator.clipboard, 'writeText');

  it('Verifica a rota', () => {
    const { history } = renderWithRouterAndRedux(<App />, {}, route);
    const { pathname } = history.location;
    expect(pathname).toBe(route);
  });

  it('Verifica se a página possui todos os botões corretos', () => {
    renderWithRouterAndRedux(<App />, {}, route);
    const buttons = ['All', 'Food', 'Drink'];
    buttons.forEach((filterButton) => {
      const button = screen.getByRole('button', { name: filterButton });
      expect(button).toBeInTheDocument();
    });
  });

  it('Verifica se as comidas são renderizadas corretamente', () => {
    renderWithRouterAndRedux(<App />, {}, route);
    favoriteRecipes.forEach((recipe, index) => {
      const name = screen.getByText(recipe.name);
      const image = screen.getAllByRole('img')[index];
      let nationalityAndCategory;
      if (index === 1) {
        nationalityAndCategory = screen.getByText(`${recipe.alcoholicOrNot}`);
      } else {
        nationalityAndCategory = screen
          .getByText(`${recipe.nationality} - ${recipe.category}`);
      }
      expect(name).toBeInTheDocument();
      expect(image).toHaveAttribute('src', favoriteRecipes[index].image);
      expect(nationalityAndCategory).toBeInTheDocument();
    });
  });

  it('Testa o botão de copiar link - comida', async () => {
    renderWithRouterAndRedux(<App />, {}, route);
    const shareBtn = screen.getByTestId(`${0}-horizontal-share-btn`);
    expect(shareBtn).toBeInTheDocument();
    userEvent.click(shareBtn);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      `http://localhost:3000/foods/${favoriteRecipes[0].id}`,
    );
    const loadingMessage = await screen.findByText('Link copied!');
    expect(loadingMessage).toBeInTheDocument();
    await waitForElementToBeRemoved(() => screen.queryByText('Link copied!'));
  });

  it('Testa o botão de copiar link - bebida', async () => {
    renderWithRouterAndRedux(<App />, {}, route);
    const shareBtn = screen.getByTestId(`${1}-horizontal-share-btn`);
    expect(shareBtn).toBeInTheDocument();
    userEvent.click(shareBtn);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      `http://localhost:3000/drinks/${favoriteRecipes[1].id}`,
    );
    const loadingMessage = await screen.findByText('Link copied!');
    expect(loadingMessage).toBeInTheDocument();
    await waitForElementToBeRemoved(() => screen.queryByText('Link copied!'));
  });

  it('Testa o botão de favoritar - comida', () => {
    renderWithRouterAndRedux(<App />, {}, route);
    const favBtn = screen.getByTestId('0-horizontal-favorite-btn');
    expect(favBtn).toBeInTheDocument();
    userEvent.click(favBtn);
    const storage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    expect(storage).toEqual([favoriteRecipes[1]]);
  });

  it('Testa o botão de favoritar - bebida', () => {
    renderWithRouterAndRedux(<App />, {}, route);
    const favBtn = screen.getByTestId('1-horizontal-favorite-btn');
    expect(favBtn).toBeInTheDocument();
    userEvent.click(favBtn);
    const storage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    expect(storage).toEqual([favoriteRecipes[0]]);
  });

  it('Testa os filtros da página', () => {
    renderWithRouterAndRedux(<App />, {}, route);
    const allBtn = screen.getByRole('button', { name: /all/i });
    const foodBtn = screen.getByRole('button', { name: 'Food' });
    const drinkBtn = screen.getByRole('button', { name: 'Drink' });

    userEvent.click(allBtn);
    expect(screen.getAllByRole('img')).toHaveLength(2);

    userEvent.click(foodBtn);
    expect(screen.getAllByRole('img')).toHaveLength(1);

    userEvent.click(drinkBtn);
    expect(screen.getAllByRole('img')).toHaveLength(1);
  });

  it(`Testa se ao clicar na imagem da
   receita o usuário vai para a página de detalhes - comida`, () => {
    const { history } = renderWithRouterAndRedux(<App />, {}, route);
    const mealImage = screen.getAllByRole('img')[0];
    userEvent.click(mealImage);
    const { pathname } = history.location;
    expect(pathname).toBe(`/${favoriteRecipes[0].type}s/${favoriteRecipes[0].id}`);
  });

  it(`Testa se ao clicar na imagem da
   receita o usuário vai para a página de detalhes - bebida`, () => {
    const { history } = renderWithRouterAndRedux(<App />, {}, route);
    const drinkImage = screen.getAllByRole('img')[1];
    userEvent.click(drinkImage);
    const { pathname } = history.location;
    expect(pathname).toBe(`/${favoriteRecipes[1].type}s/${favoriteRecipes[1].id}`);
  });

  it(`Testa se ao clicar no nome da
   receita o usuário vai para a página de detalhes - comida`, () => {
    const { history } = renderWithRouterAndRedux(<App />, {}, route);
    const mealName = screen.getByText(favoriteRecipes[0].name);
    userEvent.click(mealName);
    const { pathname } = history.location;
    expect(pathname).toBe(`/${favoriteRecipes[0].type}s/${favoriteRecipes[0].id}`);
  });

  it(`Testa se ao clicar no nome da
   receita o usuário vai para a página de detalhes - bebida`, () => {
    const { history } = renderWithRouterAndRedux(<App />, {}, route);
    const drinkName = screen.getByText(favoriteRecipes[1].name);
    userEvent.click(drinkName);
    const { pathname } = history.location;
    expect(pathname).toBe(`/${favoriteRecipes[1].type}s/${favoriteRecipes[1].id}`);
  });

  it('Testa a página com localStorage vazio', () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify({}));
    renderWithRouterAndRedux(<App />, {}, route);
    expect(screen.queryByText(favoriteRecipes[0].name)).toBeNull();
  });
});
