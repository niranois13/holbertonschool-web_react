import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import App from './App';
import { StyleSheetTestUtils } from 'aphrodite';

describe('App component', () => {
  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterEach(() => {
    cleanup();
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  describe('Basic rendering when not logged in', () => {
    beforeEach(() => {
      render(<App />);
    });

    test('renders the main heading', () => {
      const heading = screen.getByRole('heading', { level: 1, name: /school dashboard/i });
      expect(heading).toBeInTheDocument();
    });

    test('renders login message and footer', () => {
      expect(screen.getByText(/login to access the full dashboard/i)).toBeInTheDocument();
      expect(screen.getByText(/copyright/i)).toBeInTheDocument();
    });

    test('renders Holberton logo image', () => {
      expect(screen.getByAltText(/holberton logo/i)).toBeInTheDocument();
    });

    test('renders login form with two inputs and labels', () => {
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    });

    test('renders login button with OK text', () => {
      expect(screen.getByRole('button', { name: /ok/i })).toBeInTheDocument();
    });

    test('renders login section title', () => {
      expect(screen.getByText(/log in to continue/i)).toBeInTheDocument();
    });

    test('renders News section and content', () => {
      expect(screen.getByText(/news from the school/i)).toBeInTheDocument();
      expect(screen.getByText(/holberton school news goes here/i)).toBeInTheDocument();
    });
  });

  describe('When user is logged in', () => {
    test('displays Course List instead of Login', () => {
      render(<App isLoggedIn={true} />);
      expect(screen.getByText(/course list/i)).toBeInTheDocument();
      expect(screen.queryByText(/log in to continue/i)).not.toBeInTheDocument();
    });
  });

  describe('Keyboard interactions', () => {
    test('calls logOut function on Ctrl + H', () => {
      const mockLogOut = jest.fn();
      render(<App logOut={mockLogOut} />);
      fireEvent.keyDown(document, { key: 'h', ctrlKey: true });
      expect(mockLogOut).toHaveBeenCalledTimes(1);
    });

    test('shows alert on Ctrl + H', () => {
      const mockLogOut = jest.fn();
      const originalAlert = window.alert;
      window.alert = jest.fn();

      render(<App logOut={mockLogOut} />);
      fireEvent.keyDown(document, { key: 'h', ctrlKey: true });

      expect(window.alert).toHaveBeenCalledWith(expect.stringMatching(/logging you out/i));
      window.alert = originalAlert;
    });
  });

  describe('Accessibility and semantics', () => {
    test('all inputs have accessible labels', () => {
      render(<App />);
      const inputs = screen.getAllByRole('textbox');
      inputs.forEach((input) => {
        expect(input.getAttribute('aria-label') || input.getAttribute('id')).toBeTruthy();
      });
    });
  });
});
