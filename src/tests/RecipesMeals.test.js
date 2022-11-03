import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MealRecipe from '../pages/MealRecipe';
import App from '../App';
import meals from './mock/mealsMock';
import { renderWithRouter } from './helpers/renderWith';

describe('Página de Meals', () => {
  const mockFetch = () => Promise.resolve({
    json: () => Promise.resolve(meals),
  });

  /*   const mockBotoes = () => Promise.resolve({
    json: () => Promise.resolve(mealCategories),
  }); */

  it('Testando Barra de filtro', async () => {
    jest.spyOn(global, 'fetch').mockImplementationOnce(mockFetch);
    const { history, debug } = renderWithRouter(<App />);
    expect(history.location.pathname).toBe('/');

    const inputEmail = screen.getByPlaceholderText(/email/i);
    const inputSenha = screen.getByPlaceholderText(/password/i);
    const btnEnter = screen.getByText(/enter/i);

    userEvent.type(inputEmail, 'test@gmail.com');
    userEvent.type(inputSenha, '1234567');
    expect(btnEnter).toBeEnabled();

    userEvent.click(btnEnter);

    history.push('/meals');

    const buttonGoat = await screen.findByTestId('Goat-category-filter');
    expect(buttonGoat).toBeInTheDocument();

    debug();

    const searchImg = screen.getByRole('button', { name: /icone de pesquisa/i });
    expect(searchImg).toBeInTheDocument();

    userEvent.click(searchImg);

    const search = screen.getByRole('textbox');

    userEvent.type(search, 'Goat');

    const searchButton = screen.getByRole('button', { name: /search/i });

    userEvent.click(searchButton);

    history.push('/meals/52968');

    const mbuzi = await screen.findByRole('heading', { name: /mbuzi choma \(roasted goat\)/i });
    expect(mbuzi).toBeInTheDocument();

    global.fetch.mockClear();
  });

  it('Testando a renderização das receitas', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(mockFetch);
    const { history } = renderWithRouter(<MealRecipe />, { initialEntries: ['/meals/52977'] });
    expect(history.location.pathname).toBe('/meals/52977');

    await waitFor(() => {
      const cardName = screen.getByTestId('0-card-name');
      expect(cardName).toBeInTheDocument();

      const singleData = screen.getByTestId('0-singleData[0]-card');
      expect(singleData).toBeInTheDocument();
    });
    global.fetch.mockClear();
  });
});
