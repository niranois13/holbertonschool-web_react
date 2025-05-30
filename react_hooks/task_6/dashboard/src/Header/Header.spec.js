import { render, screen, fireEvent } from '@testing-library/react';
import Header from './Header';

const loggedInUser = {
  email: 'test@example.com',
  password: '1234',
  isLoggedIn: true,
};

const loggedOutUser = {
  email: '',
  password: '',
  isLoggedIn: false,
};

describe('Header component', () => {
  test('renders h1 with School dashboard', () => {
    render(<Header user={loggedOutUser} />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/school dashboard/i);
  });

  test('renders Holberton logo', () => {
    render(<Header user={loggedOutUser} />);
    expect(screen.getByAltText(/holberton logo/i)).toBeInTheDocument();
  });

  test('does not render logoutSection by default', () => {
    render(<Header user={loggedOutUser} />);
    expect(screen.queryByTestId('logoutSection')).not.toBeInTheDocument();
  });

  test('renders logoutSection when user is logged in', () => {
    render(<Header user={loggedInUser} />);
    expect(screen.getByTestId('logoutSection')).toBeInTheDocument();
  });

  test('calls logOut when logout link is clicked', () => {
    const mockLogOut = jest.fn();
    render(<Header user={loggedInUser} logOut={mockLogOut} />);
    const logoutLink = screen.getByText(/logout/i);
    fireEvent.click(logoutLink);
    expect(mockLogOut).toHaveBeenCalledTimes(1);
  });
});
