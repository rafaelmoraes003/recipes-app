import React from 'react';
import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import userEvent from '@testing-library/user-event';
import Header from '../components/Header';
import renderWithRouterAndRedux from './renderWithRouterAndRedux';

const searchButtonTestId = 'search-top-btn';

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
    const searchButton = screen.queryByTestId(searchButtonTestId);
    expect(searchButton).not.toBeInTheDocument();
  });
  it('Verifica searchButton (com showSearchIcon true)', () => {
    render(
      <MemoryRouter>
        <Header title="Teste" showSearchIcon />
      </MemoryRouter>,
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
