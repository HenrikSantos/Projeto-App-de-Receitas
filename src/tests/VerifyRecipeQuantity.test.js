import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import { renderWithRouter } from './helpers/renderWith';
import Meals from '../pages/Meals';

import mockGoat from './mock/mockGoat';

/* const mockFetch = (data) => Promise.resolve({
  json: () => Promise.resolve(data),
});
const flushPromises = () => new Promise((r) => { setTimeout(r); });
 */
/*   beforeEach(() => {
  const mockmultFetch = jest.fn()
    .mockReturnValueOnce(mockFetch(mealCategories))
    .mockReturnValueOnce(mockFetch(meals));
  global.fetch = mockmultFetch;
});
*/
describe('Verificação de quantidade Meals', () => {
  const goatMock = () => Promise.resolve({
    json: () => Promise.resolve(mockGoat),
  });
  it('test', async () => {
    jest.spyOn(global, 'fetch').mockImplementationOnce(goatMock);
    const { history, debug } = renderWithRouter(<Meals />);

    history.push('/meals/52968');
    expect(history.location.pathname).toBe('/meals/52968');

    await waitFor(() => {
      const title = screen.getByTestId('0-card-name');
      expect(title).toBeInTheDocument();
    });
    debug();
    global.fetch.mockClear();
  });
});
