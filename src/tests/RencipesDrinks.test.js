import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import drinks from './mock/drinksMock';
import { renderWithRouter } from './helpers/renderWith';
import App from '../App';

describe('Página de Meals', () => {
  const mockFetch = () => Promise.resolve({
    json: () => Promise.resolve(drinks),
  });

  afterEach(() => jest.resetAllMocks());

  it('Testando a página de Meals', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(mockFetch);
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

    const buttonDrinks = screen.getByTestId('drinks-bottom-btn');
    expect(buttonDrinks).toBeInTheDocument();

    userEvent.click(buttonDrinks);

    history.push('/drinks');

    await waitFor(() => {
      const cardName = screen.getByTestId('0-card-name');
      expect(cardName).toBeInTheDocument();

      const recipeCard = screen.getByTestId('0-recipe-card');
      expect(recipeCard).toBeInTheDocument();

      const cardButton = screen.getByTestId('0-card-button');
      expect(cardButton).toBeInTheDocument();
    }, 5000);

    const cardButton = screen.getByTestId('0-card-button');
    expect(cardButton).toBeInTheDocument();

    userEvent.click(cardButton);

    history.push('/drinks/15997');

    console.log(history.location.pathname);

    await waitFor(() => {
      const cardName = screen.getByTestId('0-card-name');
      expect(cardName).toBeInTheDocument();

      const singleData = screen.getByTestId('0-singleData[0]-card');
      expect(singleData).toBeInTheDocument();

      const cardImg = screen.getByTestId('0-card-img');
      expect(cardImg).toBeInTheDocument();
    }, 5000);

    debug();
    global.fetch.mockClear();
  });
});
