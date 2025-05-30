import { render, screen } from '@testing-library/react';
import Footer from './Footer';

describe('Footer component', () => {
  test('renders Contact us when user is logged in', () => {
    const loggedInUser = {
      email: 'test@example.com',
      password: 'password',
      isLoggedIn: true,
    };

    render(<Footer user={loggedInUser} />);

    expect(screen.getByText(/contact us/i)).toBeInTheDocument();
  });

  test('does not render Contact us when user is logged out', () => {
    const loggedOutUser = {
      email: '',
      password: '',
      isLoggedIn: false,
    };

    render(<Footer user={loggedOutUser} />);

    expect(screen.queryByText(/contact us/i)).not.toBeInTheDocument();
  });
});
