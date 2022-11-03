import React from 'react';
// import { screen } from '@testing-library/react';
import MealRecipeInProgress from '../pages/MealRecipeInProgress';
import { renderWithRouter } from './helpers/renderWith';

describe('Página de receitas em progresso', () => {
  it('Testando a renderização da página', () => {
    const { history } = renderWithRouter(<MealRecipeInProgress />, { initialEntries: ['/meals/:id/in-progress'] });
    expect(history.location.pathname).toBe('/meals/:id/in-progress');
    console.log(history.location.pathname);
  });
});
