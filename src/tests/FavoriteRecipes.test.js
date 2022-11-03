// import { screen } from '@testing-library/react';
import { renderWithRouter } from './helpers/renderWith';
import FavoriteRecipes from '../pages/FavoriteRecipes';

describe('Página de favoritos', () => {
  it('Testando renderização da página de favoritos', () => {
    const { history } = renderWithRouter(<FavoriteRecipes />, { initialEntries: ['/favorite-recipes'] });
    expect(history.location.pathname).toBe('/favorite-recipes');
  });
});
