import React from 'react';
import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import Header from '../components/Header';

describe('Testa o componente Header e suas funcionalidades', () => {
  it('Verifica a existência do header', () => {
    render(
      <MemoryRouter>
        <Header title="Teste" showSearchIcon />
      </MemoryRouter>,
    );
    const header = screen.getByTestId('header');
    expect(header).toBeInTheDocument();
  });
  it('Verifica searchButton (com showSearchIcon false)', () => {
    render(
      <MemoryRouter>
        <Header title="Teste" showSearchIcon={ false } />
      </MemoryRouter>,
    );
    const searchButton = screen.queryByTestId('search-top-btn');
    expect(searchButton).not.toBeInTheDocument();
  });
  it('Verifica searchButton (com showSearchIcon true)', () => {
    render(
      <MemoryRouter>
        <Header title="Teste" showSearchIcon />
      </MemoryRouter>,
    );
    const searchButton = screen.queryByTestId('search-top-btn');
    expect(searchButton).toBeInTheDocument();
  });
  it('');
});
