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
    render(<App />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole('button', { name: /ok/i });

    fireEvent.change(emailInput, { target: { value: 'user@holberton.io' } });
    fireEvent.change(passwordInput, { target: { value: 'pass1234' } });
    fireEvent.click(loginButton);

    expect(screen.queryByText(/log in to continue/i)).not.toBeInTheDocument()
    expect(screen.getByText(/course list/i)).toBeInTheDocument();
  });

  test('logs out user when Ctrl+H is pressed', () => {
    window.alert = jest.fn();
    render(<App />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    fireEvent.change(emailInput, { target: { value: 'user@holberton.io' } });
    fireEvent.change(passwordInput, { target: { value: 'pass123' } });
    fireEvent.click(screen.getByRole('button', { name: /ok/i }));

    fireEvent.keyDown(document, { key: 'h', ctrlKey: true });

    expect(window.alert).toHaveBeenCalledWith('Logging you out');
    expect(screen.getByText(/log in to continue/i)).toBeInTheDocument();
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

  test('clicking Notifications menu item toggles displayDrawer state', () => {
    render(<App />);
    const menuItem = document.getElementById('menuItem');
    fireEvent.click(menuItem);
    expect(screen.getByText(/here is the list of notifications/i)).toBeInTheDocument();
  });

  test('clicking Notifications close button toggles displayDrawer state', () => {
    render(<App />);
    const menuItem = document.getElementById('menuItem');
    fireEvent.click(menuItem);
    const closeButton = document.getElementById('close-btn');
    fireEvent.click(closeButton);
    expect(screen.queryByText(/here is the list of notifications/i)).not.toBeInTheDocument();
  })
});

describe('App behavior', () => {
  it('removes notification on click and logs correctly', () => {
    const fixedNotifications = [
      { id: 'fixed-id-123', type: 'default', value: 'New course available' },
    ];
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    render(<App notifications={fixedNotifications} />);
    fireEvent.click(screen.getByText(/your notifications/i));
    const notif = screen.getByText(/new course available/i);
    fireEvent.click(notif);

    expect(logSpy).toHaveBeenCalledWith('Notification fixed-id-123 has been marked as read');
    expect(screen.queryByText(/new course available/i)).not.toBeInTheDocument();

    logSpy.mockRestore();
  });
});
