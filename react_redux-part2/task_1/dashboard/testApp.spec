import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import authReducer from '../features/auth/authSlice';
import coursesReducer from '../features/courses/coursesSlice';
import notificationsReducer, { fetchNotifications } from '../features/notifications/notificationsSlice';
import { StyleSheetTestUtils } from "aphrodite";

jest.mock('../features/notifications/notificationsSlice', () => {
  const originalSlice = jest.requireActual('../features/notifications/notificationsSlice');
  return {
    __esModule: true,
    ...originalSlice,
    markNotificationAsRead: jest.fn((id) => ({
      type: 'notifications/markNotificationAsRead', payload: id
    })),
    fetchNotifications: jest.fn(() => ({ type: 'notifications/fetchNotifications' }))
  }
});

const renderWithProvider = (ui, preloadedState = {}) => {
  const store = configureStore({
    reducer: {
      auth: authReducer,
      courses: coursesReducer,
      notifications: notificationsReducer,
    },
    preloadedState,
  });

  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    store,
  };
};



describe('App Component', () => {
  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterEach(() => {
    jest.clearAllMocks();
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  test('renders Login component when isLoggedIn is false', () => {
    const preloadedState = {
      auth: {
        user: {
          email: '',
          password: ''
        },
        isLoggedIn: false
      },
      courses: {
        courses: [],
      },
      notifications: {
        notifications: [],
        displayDrawer: false
      },
    };

    renderWithProvider(<App />, preloadedState);

    expect(screen.getByText(/log in to continue/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /ok/i })).toBeInTheDocument(); // Submit button in Login form
  });

  test('renders CourseList component when isLoggedIn is true', () => {
    const preloadedState = {
      auth: {
        user: {
          email: 'test@example.com',
          password: 'password123'
        },
        isLoggedIn: true,
      },
      courses: {
        courses: [
          { id: 1, name: 'ES6', credit: 60 },
          { id: 2, name: 'Webpack', credit: 20 },
        ],
      },
      notifications: {
        notifications: [],
        displayDrawer: true
      },
    };

    renderWithProvider(<App />, preloadedState);

    expect(screen.getByText(/course list/i)).toBeInTheDocument();
    expect(screen.getByText(/es6/i)).toBeInTheDocument();
    expect(screen.getByText(/webpack/i)).toBeInTheDocument();
  });

  test('fetchNotifications is called on mount and notifications display', async () => {
    const notificationsMock = [
      { id: 1, type: 'default', value: 'New course available' },
      { id: 2, type: 'urgent', value: 'New resume available' },
    ];

    const preloadedState = {
      auth: {
        user: { email: 'test@example.com', password: 'password123' },
        isLoggedIn: true,
      },
      courses: { courses: [] },
      notifications: {
        notifications: notificationsMock,
        displayDrawer: true,
      },
    };

    renderWithProvider(<App />, preloadedState);

    // Confirm fetchNotifications was dispatched
    expect(fetchNotifications).toHaveBeenCalled();

    // Confirm notification items render
    for (const notif of notificationsMock) {
      await waitFor(() => {
        expect(screen.getByText(notif.value)).toBeInTheDocument();
      });
    }
  });
});
