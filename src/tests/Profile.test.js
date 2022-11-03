import { screen /* waitFor */ } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { act } from 'react-dom/test-utils';
import App from '../App';
import Profile from '../components/Profile';
import { renderWithRouter } from './helpers/renderWith';

const dataTestEmail = 'profile-email';
const profileBtn = 'profile-done-btn';
const favoriteBtn = 'profile-favorite-btn';
const logoutProfile = 'profile-logout-btn';

const emailTest = 'teste@teste.com';
// const passwordTest = '123456';
// const dataTestPassword = 'password-input';

// beforeEach(() => localStorage.setItem('user', JSON.stringify({ email: emailTest })));

describe('Teste o componente <Profile.js />', () => {
  it('test text elements', () => {
    renderWithRouter(<Profile />);
    const email = screen.getByTestId(dataTestEmail);
    expect(email).toBeInTheDocument();

    const btnProfile = screen.getByTestId(profileBtn);
    expect(btnProfile).toBeInTheDocument();
  });

  it('test button Logout', () => {
    const { history } = renderWithRouter(<Profile />);

    const btnlogoutProfile = screen.getByTestId(logoutProfile);
    expect(btnlogoutProfile).toBeInTheDocument();
    userEvent.click(btnlogoutProfile);
    expect(history.location.pathname).toBe('/');
  });

  it('test button Favorite', () => {
    const { history } = renderWithRouter(<Profile />);

    const btnProfileFavorite = screen.getByTestId(favoriteBtn);
    expect(btnProfileFavorite).toBeInTheDocument();
    userEvent.click(btnProfileFavorite);
    expect(history.location.pathname).toBe('/favorite-recipes');
  });

  it('test button Done', () => {
    const { history } = renderWithRouter(<Profile />);

    const btnlogoutDone = screen.getByRole('button', { name: /done recipes/i });
    expect(btnlogoutDone).toBeInTheDocument();
    userEvent.click(btnlogoutDone);
    expect(history.location.pathname).toBe('/done-recipes');
  });

  it('tests local storage-related functions part 1 - user', async () => {
    renderWithRouter(<App />, { initialEntries: ['/profile'] });
    const initialLocalStorage = JSON.parse(localStorage.getItem('user'));
    expect(initialLocalStorage.email).toBe(emailTest);

    const wrongInitialUser = 'notDaniel@gmail.com';
    expect(initialLocalStorage.email).not.toBe(wrongInitialUser);
  });

  // it('tests local storage-related functions part 2 - false user', async () => { NUNCA VAI PASSAR!
  //   renderWithRouter(<App />);
  //   const inputEmail = screen.getByPlaceholderText(/email/i);
  //   const inputSenha = screen.getByPlaceholderText(/password/i);
  //   // const btnEnter = screen.getByText(/enter/i);

  //   userEvent.type(inputEmail, 'invalido'); // não sobrescreve o beforeEach para testar o IF no setState com LocalStorage
  //   userEvent.type(inputSenha, '123456');
  //   const initialFalseLocalStorage = JSON.parse(localStorage.getItem('user'));
  //   expect(initialFalseLocalStorage).toBeFalsy();
  // });

  it('tests local storage-related functions part 3 - logout', async () => {
    renderWithRouter(<App />, { initialEntries: ['/profile'] });
    const btnlogoutProfile = screen.getByTestId(logoutProfile);
    act(() => {
      userEvent.click(btnlogoutProfile);
    });

    // console.log(history.location.pathname);
    // debug();
    const inputEmail = await screen.findByTestId('email-input');
    expect(inputEmail).toBeInTheDocument();
    const localStorageUser = JSON.parse(localStorage.getItem('user'));
    expect(localStorageUser).toBeNull();
  });

  it('testa botão para a mealDB', async () => {
    renderWithRouter(<App />, { initialEntries: ['/profile'] });
    const btnMeals = screen.getByTestId('meals-bottom-btn');
    act(() => {
      userEvent.click(btnMeals);
    });
    const txtMeals = await screen.findByRole('heading', { name: /meals/i });
    expect(txtMeals).toBeInTheDocument();
  });

  it('testa botão para a mealDB', async () => {
    renderWithRouter(<App />, { initialEntries: ['/profile'] });
    const btnDrinks = screen.getByTestId('drinks-bottom-btn');
    act(() => {
      userEvent.click(btnDrinks);
    });
    const txtDrinks = await screen.findByRole('heading', { name: /drinks/i });
    expect(txtDrinks).toBeInTheDocument();
  });
});
