import React from 'react';
import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import Header from '../components/Header';

describe('Testa o componente Header e suas funcionalidades', () => {
  it('Verifica a existência do header', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );
    const header = screen.getByTestId('header');
    expect(header).toBeInTheDocument();
  });
});
