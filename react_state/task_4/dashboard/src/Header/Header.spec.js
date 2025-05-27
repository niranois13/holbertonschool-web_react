import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from './Header';
import newContext from '../Context/context';
import { StyleSheetTestUtils } from 'aphrodite';

beforeEach(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

afterEach(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

test('renders h1 with School dashboard', () => {
  render(<Header />);
  const heading = screen.getByRole('heading', { name: /School dashboard/i });
  expect(heading).toBeInTheDocument();
});

test('renders Holberton logo', () => {
  render(<Header />);
  const image = screen.getByAltText(/holberton logo/i);
  expect(image).toBeInTheDocument();
});

test('does not render logoutSection by default', () => {
  render(<Header />);
  const logoutSection = screen.queryByTestId('logoutSection');
  expect(logoutSection).not.toBeInTheDocument();
});

test('renders logoutSection when user is logged in', () => {
  const ContextProvider = newContext.Provider;
  const user = { email: 'test@example.com', password: '1234', isLoggedIn: true };
  render(
    <ContextProvider value={{ user, logOut: jest.fn() }}>
      <Header />
    </ContextProvider>
  );
  expect(screen.getByText(/Welcome test@example.com/i)).toBeInTheDocument();
  expect(screen.getByText(/\(logout\)/i)).toBeInTheDocument();
});

test('calls logOut when logout link is clicked', () => {
  const logOutMock = jest.fn();
  const user = { email: 'test@example.com', password: '1234', isLoggedIn: true };
  render(
    <newContext.Provider value={{ user, logOut: logOutMock }}>
      <Header />
    </newContext.Provider>
  );
  const logoutLink = screen.getByText(/\(logout\)/i);
  fireEvent.click(logoutLink);
  expect(logOutMock).toHaveBeenCalled();
});
