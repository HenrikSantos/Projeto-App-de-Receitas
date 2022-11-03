import React from 'react';
// import { screen } from '@testing-library/react';
import App from '../App';
import { renderWithRouter } from './helpers/renderWith';

describe('Página de receitas prontas', () => {
  it('Testando renderização de receitas prontas', () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/done-recipes'] });
    expect(history.location.pathname).toBe('/done-recipes');
  });
});
