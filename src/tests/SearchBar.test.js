import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from './helpers/renderWith';
import SearchBar from '../components/SearchBar';
import apiData from './helpers/apiData';

describe('Testa a componente SearchBar', () => {
  test('testa o email e senha', () => {
    global.fetch = jest.fn(async () => ({
      json: async () => apiData,
    }));

    renderWithRouter(<SearchBar />);
    const nameInput = screen.getByTestId('search-input');
    expect(nameInput).toBeInTheDocument();
    userEvent.type(nameInput, 'chicken');

    const nameRadio = screen.getByText(/name/i);
    expect(nameRadio).toBeInTheDocument();
    userEvent.click(nameRadio);

    const firstLetterRadio = screen.getByText(/first letter/i);
    expect(firstLetterRadio).toBeInTheDocument();
    userEvent.click(firstLetterRadio);

    const ingredientRadio = screen.getByText(/ingredient/i);
    expect(ingredientRadio).toBeInTheDocument();
    userEvent.click(ingredientRadio);

    const btnSearch = screen.getByTestId('exec-search-btn');
    expect(btnSearch).toBeInTheDocument();

    userEvent.click(btnSearch);
  });
});
