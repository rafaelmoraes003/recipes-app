import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouterAndRedux from './renderWithRouterAndRedux';
import FoodDetail from '../pages/FoodDetail';
import oneMeal from '../../cypress/mocks/oneMeal';
import drinks from '../../cypress/mocks/drinks';

describe('Testa o componente FoodDetail e suas funcionalidades', () => {
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
  });
});
