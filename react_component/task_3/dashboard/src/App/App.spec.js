import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('App component', () => {
  test('renders the main heading', () => {
    render(<App />);
    const heading = screen.getByRole('heading', { level: 1, name: /school dashboard/i });
    expect(heading).toBeInTheDocument();
  });

  test('renders the login and footer paragraphs', () => {
    render(<App />);
    const bodyText = screen.getByText(/login to access the full dashboard/i);
    const footerText = screen.getByText(/copyright/i);
    expect(bodyText).toBeInTheDocument();
    expect(footerText).toBeInTheDocument();
  });

  test('renders the Holberton logo image', () => {
    render(<App />);
    const image = screen.getByAltText(/holberton logo/i);
    expect(image).toBeInTheDocument();
  });

  test('renders two input elements', () => {
    render(<App />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  test('renders two label elements with text Email and Password', () => {
    render(<App />);
    const emailLabel = screen.getByLabelText(/email/i);
    const passwordLabel = screen.getByLabelText(/password/i);
    expect(emailLabel).toBeInTheDocument();
    expect(passwordLabel).toBeInTheDocument();
  });

  test('renders a button with the text OK', () => {
    render(<App />);
    const button = screen.getByRole('button', { name: /ok/i });
    expect(button).toBeInTheDocument();
  });

  test('calls logOut function when Ctrl + h is pressed', () => {
    const mockLogOut = jest.fn();
    render(<App logOut={mockLogOut} />);

    fireEvent.keyDown(document, { key: 'h', ctrlKey: true });

    expect(mockLogOut).toHaveBeenCalledTimes(1);
  });

  test('calls alert with "Logging you out" when Ctrl + h is pressed', () => {
    const mockLogOut = jest.fn();
    const originalAlert = window.alert;
    window.alert = jest.fn();

    render(<App logOut={mockLogOut} />);
    fireEvent.keyDown(document, { key: 'h', ctrlKey: true });

    expect(window.alert).toHaveBeenCalledWith(expect.stringMatching(/Logging you out/i));
    window.alert = originalAlert;
  });

  test('displays "Course list" title when isLoggedIn is true', () => {
    render(<App isLoggedIn={true} />);
    const title = screen.queryByText(/course list/i);
    expect(title).toBeInTheDocument();
  });

  test('displays "Log in to continue" title when isLoggedIn is false', () => {
    render(<App />);
    const loginTitle = screen.getByText(/log in to continue/i);
    expect(loginTitle).toBeInTheDocument();
  });

  test('renders "News from the School" section with proper text', () => {
    render(<App />);
    const newsTitle = screen.getByText(/news from the school/i);
    const newsContent = screen.getByText(/holberton school news goes here/i);
    expect(newsTitle).toBeInTheDocument();
    expect(newsContent).toBeInTheDocument();
  });
});
