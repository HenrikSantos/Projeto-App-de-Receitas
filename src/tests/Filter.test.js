import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from './helpers/renderWith';
import meals from './mock/mealsMock';
import App from '../App';

describe('Testando Filter', () => {
  beforeEach(() => {
    global.alert = jest.fn().mockReturnValue('Your search must have only 1 (one) character');

    global.fetch = jest.fn()
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(meals),
      });
  });
  it('Testando o alerta do firstLetter com a pesquisa com mais de uma letra', async () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/meals'] });
    expect(history.location.pathname).toBe('/meals');

    const buttonSearch = screen.getByTestId('search-top-btn');
    expect(buttonSearch).toBeInTheDocument();
    userEvent.click(buttonSearch);

    const firstLetter = screen.getByTestId('first-letter-search-radio');
    expect(firstLetter).toBeInTheDocument();
    userEvent.click(firstLetter);

    const text = screen.getByRole('textbox');
    expect(text).toBeInTheDocument();

    userEvent.type(text, 'Breakfast');

    const search = screen.getByTestId('exec-search-btn');
    expect(search).toBeInTheDocument();
    userEvent.click(search);

    expect(global.alert()).toBe('Your search must have only 1 (one) character');
    expect(global.alert).toHaveBeenCalledTimes(2);
  });

  it('Testando a renderização da pesquisa do First letter', () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/meals'] });
    expect(history.location.pathname).toBe('/meals');
  });
});
