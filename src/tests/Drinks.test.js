import React from 'react';
import { renderWithRouter } from './helpers/renderWith';
import drinksMock from './mock/drinksMock';
import Drinks from '../pages/Drinks';

describe('Página de Drinks', () => {
  const mockFetch = () => Promise.resolve({
    json: () => Promise.resolve(drinksMock),
  });

  it('Testando renderização da pagina Drinks', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(mockFetch);
    const { history } = renderWithRouter(<Drinks />, { initialEntries: ['/drinks'] });
    expect(history.location.pathname).toBe('/drinks');
  }, 6000);
});
