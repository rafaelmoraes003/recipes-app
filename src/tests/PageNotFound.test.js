import React from 'react';
import { screen } from '@testing-library/react';
import PageNotFound from '../pages/PageNotFound';
import renderWithRouterAndRedux from './renderWithRouterAndRedux';

describe('Testa a página NotFound', () => {
  it('Verifica a renderização da página', () => {
    renderWithRouterAndRedux(
      <PageNotFound />,
      {},
      '/explore/drinks/ingredients',
    );
    const notFoundText = screen.getByText('Not Found');
    expect(notFoundText).toBeInTheDocument();
  });
});
