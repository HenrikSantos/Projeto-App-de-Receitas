import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from './helpers/renderWith';
import Footer from '../components/Footer';

describe('Testando Footer', () => {
  test('Testando botão de perfil', () => {
    const { history } = renderWithRouter(<Footer />);
    const drinkLink = screen.getByTestId('drinks-bottom-btn');
    const mealLink = screen.getByTestId('meals-bottom-btn');
    userEvent.click(drinkLink);
    expect(history.location.pathname).toBe('/drinks');
    userEvent.click(mealLink);
    expect(history.location.pathname).toBe('/meals');
  });
});
