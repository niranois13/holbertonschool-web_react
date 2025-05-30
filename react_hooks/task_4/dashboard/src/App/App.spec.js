import React from 'react';
import { render, screen, fireEvent, cleanup, waitFor } from '@testing-library/react';
import App from './App';
import { StyleSheetTestUtils } from 'aphrodite';
import axios from 'axios';

// Mock axios globally
jest.mock('axios');

const mockNotifications = [
  { id: 1, type: 'default', value: 'New course available' },
  { id: 2, type: 'urgent', value: 'New resume available' },
  { id: 3, type: 'urgent', html: { __html: '<strong>Urgent requirement</strong>' } },
];

const mockCourses = [
  { id: 1, name: 'ES6', credit: 60 },
  { id: 2, name: 'Webpack', credit: 20 },
  { id: 3, name: 'React', credit: 40 },
];

describe('App component', () => {
  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();

    axios.get.mockImplementation((url) => {
      switch (url) {
        case '/notifications.json':
          return Promise.resolve({ data: mockNotifications });
        case '/courses.json':
          return Promise.resolve({ data: mockCourses });
        default:
          return Promise.reject(new Error('not found'));
      }
    });
  });

  afterEach(() => {
    cleanup();
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
    jest.clearAllMocks();
  });

  describe('Basic rendering when not logged in', () => {
    beforeEach(async () => {
      render(<App />);
      await waitFor(() => screen.getByText(/login to access the full dashboard/i));
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
    test('displays Course List instead of Login', async () => {
      render(<App />);
      fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'user@holberton.io' } });
      fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'pass1234' } });
      fireEvent.click(screen.getByRole('button', { name: /ok/i }));

      await waitFor(() => screen.getByText(/course list/i));
      expect(screen.queryByText(/log in to continue/i)).not.toBeInTheDocument();
      expect(screen.getByText(/course list/i)).toBeInTheDocument();
    });
  });

  test('clicking Notifications menu item toggles displayDrawer state', async () => {
    render(<App />);
    await waitFor(() => screen.getByText(/your notifications/i));

    const menuItem = document.getElementById('menuItem');
    fireEvent.click(menuItem);
    expect(screen.getByText(/here is the list of notifications/i)).toBeInTheDocument();
  });

  test('clicking Notifications close button hides drawer', async () => {
    render(<App />);
    await waitFor(() => screen.getByText(/your notifications/i));

    fireEvent.click(document.getElementById('menuItem'));
    fireEvent.click(document.getElementById('close-btn'));
    expect(screen.queryByText(/here is the list of notifications/i)).not.toBeInTheDocument();
  });

  describe('Notification behavior', () => {
    test('removes notification on click and logs correctly', async () => {
      const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
      render(<App />);
      await waitFor(() => screen.getByText(/your notifications/i));
      fireEvent.click(screen.getByText(/your notifications/i));
      const notif = screen.getByText(/new course available/i);
      fireEvent.click(notif);

      expect(logSpy).toHaveBeenCalledWith('Notification 1 has been marked as read');
      expect(screen.queryByText(/new course available/i)).not.toBeInTheDocument();
      logSpy.mockRestore();
    });
  });

  describe('Accessibility and semantics', () => {
    test('all inputs have accessible labels', async () => {
      render(<App />);
      await waitFor(() => screen.getByLabelText(/email/i));
      const email = screen.getByLabelText(/email/i);
      const password = screen.getByLabelText(/password/i);

      expect(email).toHaveAttribute('type', 'email');
      expect(password).toHaveAttribute('type', 'password');
    });
  });
});
