import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import { renderWithRouter } from './helpers/renderWith';
import App from '../App';
import drinkCent from './mock/mockDrinkCent';

describe('Verificação de quantidade Drinks', () => {
  const drinksCentmock = () => Promise.resolve({
    json: () => Promise.resolve(drinkCent),
  });

  it('Testando renderização da página de detalhes do drink 50/50', async () => {
    jest.spyOn(global, 'fetch').mockImplementationOnce(drinksCentmock);
    const { history, debug } = renderWithRouter(<App />, { initialEntries: ['/drinks/14598'] });
    console.log(history.location.pathname);

    expect(history.location.pathname).toBe('/drinks/14598');

    await waitFor(() => {
      const title = screen.getByTestId('0-card-name');
      expect(title).toBeInTheDocument();
      debug();
    });
    global.fetch.mockClear();
  });
});
