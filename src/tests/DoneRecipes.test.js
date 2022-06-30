import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './renderWithRouterAndRedux';
import App from '../App';

//
describe('Testa o componente renderiza meals e drink', () => {
  const DONE_RECIPES = '/done-recipes';
  localStorage.setItem('doneRecipes',
    `[{"id":"52874","type":"food","nationality":"British","category":"Beef","img":"https://www.themealdb.com/images/media/meals/sytuqu1511553755.jpg","alcoholicOrNot":"","name":"Beef and Mustard Pie","image":"https://www.themealdb.com/images/media/meals/sytuqu1511553755.jpg","doneDate":"28/06/2022","tags": ["Meat","Pie"]},
    { "alcoholicOrNot": "Alcoholic", "category": "Ordinary Drink","doneDate": "28/06/2022","id": "15300","image": "https://www.thecocktaildb.com/images/media/drink/rrtssw1472668972.jpg","name": "3-Mile Long Island Iced Tea","nationality": "","tags": [],"type": "drink"}]`);
  it('verifica a rota', () => {
    const { history } = renderWithRouterAndRedux(<App />, {}, DONE_RECIPES);
    const { pathname } = history.location;
    expect(pathname).toBe(DONE_RECIPES);
  });

  it('Verifica se a receita finalizada do tipo FOOD aparecem de maneira correta', () => {
    renderWithRouterAndRedux(<App />, {}, DONE_RECIPES);
    const listRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    // const emailText = screen.getByText(/teste@teste.com/i);
    // Verifica se a img esta correta
    const imgRecipes = screen.getByTestId('0-horizontal-image');
    expect(imgRecipes).toBeInTheDocument();
    expect(imgRecipes).toHaveAttribute('src', listRecipes[0].image);

    // verifica se categoria e comida esta correta
    const textCategory = screen.getByTestId('0-horizontal-top-text');
    expect(textCategory).toBeInTheDocument();
    if (listRecipes[0].type === 'food') {
      expect(textCategory).toHaveTextContent('British - Beef');
    }

    // verifica se o nome da comida esta correta
    const textName = screen.getByTestId('0-horizontal-name');
    expect(textName).toBeInTheDocument();
    expect(textName).toHaveTextContent(`${listRecipes[0].name}`);

    // verifica se a data esta correta
    const doneData = screen.getByTestId('0-horizontal-done-date');
    expect(doneData).toBeInTheDocument();
    expect(doneData).toHaveTextContent(`${listRecipes[0].doneDate}`);

    // verifica tag1
    if (listRecipes[0].type === 'food') {
      const tag1 = listRecipes[0].tags[0];
      const recipesTag01 = screen.getByTestId(`0-${tag1}-horizontal-tag`);
      expect(recipesTag01).toBeInTheDocument();
      expect(recipesTag01).toHaveTextContent(tag1);

      // verifica tag2
      const tag2 = listRecipes[0].tags[1];
      const recipesTag02 = screen.getByTestId(`0-${tag2}-horizontal-tag`);
      expect(recipesTag02).toBeInTheDocument();
      expect(recipesTag02).toHaveTextContent(tag2);
    }
  });
  it('Verifica se a receita finalizada do tipo drink aparecem de maneira correta', () => {
    renderWithRouterAndRedux(<App />, {}, DONE_RECIPES);
    const listRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    // const emailText = screen.getByText(/teste@teste.com/i);
    // Verifica se a img esta correta
    const imgRecipes = screen.getByTestId('1-horizontal-image');
    expect(imgRecipes).toBeInTheDocument();
    expect(imgRecipes).toHaveAttribute('src', listRecipes[1].image);

    // verifica se categoria e comida esta correta
    const textCategory = screen.getByTestId('1-horizontal-top-text');
    expect(textCategory).toBeInTheDocument();
    if (listRecipes[1].type === 'food') {
      expect(textCategory).toHaveTextContent(`${listRecipes.alcoholicOrNot}`);
    }

    // verifica se o nome da comida esta correta
    const textName = screen.getByTestId('1-horizontal-name');
    expect(textName).toBeInTheDocument();
    expect(textName).toHaveTextContent(`${listRecipes[1].name}`);

    // verifica se a data esta correta
    const doneData = screen.getByTestId('1-horizontal-done-date');
    expect(doneData).toBeInTheDocument();
    expect(doneData).toHaveTextContent(`${listRecipes[1].doneDate}`);

    // verifica tag1
    if (listRecipes[1].type === 'food') {
      const tag1 = listRecipes[1].tags[0];
      const recipesTag01 = screen.getByTestId(`1-${tag1}-horizontal-tag`);
      expect(recipesTag01).toBeInTheDocument();
      expect(recipesTag01).toHaveTextContent(tag1);

      // verifica tag2
      const tag2 = listRecipes[1].tags[1];
      const recipesTag02 = screen.getByTestId(`1-${tag2}-horizontal-tag`);
      expect(recipesTag02).toBeInTheDocument();
      expect(recipesTag02).toHaveTextContent(tag2);
    }
  });
  it('Verifica se o button de filtro all esta funcionando corretamente', () => {
    const listRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    renderWithRouterAndRedux(<App />, {}, DONE_RECIPES);
    // Clica no button food
    const buttonFood = screen.getByRole('button', { name: /Food/i });
    expect(buttonFood).toBeInTheDocument();
    buttonFood.click();

    // Verifica se existe informação de drink
    const textNameDrink = screen.getByTestId('1-horizontal-name');
    expect(textNameDrink).toBeInTheDocument();
    expect(textNameDrink).toHaveTextContent(`${listRecipes[1].name}`);

    // Verifica se existe informação de food
    const textNameFood = screen.getByTestId('0-horizontal-name');
    expect(textNameFood).toBeInTheDocument();
    expect(textNameFood).toHaveTextContent(`${listRecipes[0].name}`);

    // Clica no button filtro All
    const buttonAll = screen.getByRole('button', { name: /All/i });
    expect(buttonAll).toBeInTheDocument();
    buttonAll.click();

    expect(textNameFood).toBeInTheDocument();
    expect(textNameFood).toHaveTextContent(`${listRecipes[0].name}`);

    expect(textNameDrink).toHaveTextContent(`${listRecipes[1].name}`);
  });

  it('Verifica se o button drink esta funcionando corretamente', () => {
    const listRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    renderWithRouterAndRedux(<App />, {}, DONE_RECIPES);
    // Clica no button food
    const buttonFood = screen.getByRole('button', { name: /Drinks/i });
    expect(buttonFood).toBeInTheDocument();
    buttonFood.click();

    const textNameDrink = screen.getByTestId('1-horizontal-name');
    expect(textNameDrink).toBeInTheDocument();
    expect(textNameDrink).toHaveTextContent(`${listRecipes[1].name}`);
  });

  it('Verifica se o input de compartilhar funciona corretamente', async () => {
    Object.assign(navigator, {
      clipboard: {
        writeText: () => {},
      },
    });

    jest.spyOn(navigator.clipboard, 'writeText');

    const { debug } = renderWithRouterAndRedux(<App />, {}, DONE_RECIPES);
    // const listRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    debug();
    const imgRecipes = screen.getByTestId('0-horizontal-share-btn');
    userEvent.click(imgRecipes);

    const textCopied = await screen.findAllByText(/Link copied!/i);
    expect(textCopied[0]).toHaveTextContent('Link copied!');
  });
  it('Verifica se o input de compartilhar funciona corretamente', async () => {
    Object.assign(navigator, {
      clipboard: {
        writeText: () => {},
      },
    });

    jest.spyOn(navigator.clipboard, 'writeText');

    const { debug } = renderWithRouterAndRedux(<App />, {}, DONE_RECIPES);
    // const listRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    debug();
    const imgRecipes = screen.getByTestId('1-horizontal-share-btn');
    userEvent.click(imgRecipes);

    const textCopied = await screen.findAllByText(/Link copied!/i);
    expect(textCopied[0]).toHaveTextContent('Link copied!');
  });
});
