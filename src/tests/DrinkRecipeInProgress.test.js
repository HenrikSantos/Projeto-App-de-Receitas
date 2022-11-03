import React from 'react';
// import { screen } from '@testing-library/react';
import DrinkRecipeInProgress from '../pages/DrinkRecipeInProgress';
import { renderWithRouter } from './helpers/renderWith';

describe('Página de receitas em progresso', () => {
  it('Testando a renderização da página', () => {
    const { history } = renderWithRouter(<DrinkRecipeInProgress />, { initialEntries: ['/drinks/:id/in-progress'] });
    expect(history.location.pathname).toBe('/drinks/:id/in-progress');
    console.log(history.location.pathname);
  });
});
