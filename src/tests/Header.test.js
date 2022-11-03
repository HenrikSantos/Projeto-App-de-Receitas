import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from './helpers/renderWith';
import Header from '../components/Header';

describe('Testando Header', () => {
  test('Testando botão de perfil', () => {
    const { history } = renderWithRouter(<Header />);
    const botaoPerfil = screen.getByTestId('profile-top-btn');
    userEvent.click(botaoPerfil);
    expect(history.location.pathname).toBe('/profile');
  });
  test('Testando botão de pesquisa', () => {
    renderWithRouter(<Header />);
    const botaoPesquisa = screen.getByRole('img', {
      name: /icone de pesquisa/i,
    });
    userEvent.click(botaoPesquisa);
    const inputPesquisa = screen.getByTestId('search-input');
    userEvent.click(botaoPesquisa);
    expect(inputPesquisa).not.toBeInTheDocument();
  });
});
