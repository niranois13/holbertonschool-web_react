import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import NotificationItem from './NotificationItem';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../../features/auth/authSlice';
import coursesReducer from '../../features/courses/coursesSlice';
import notificationsReducer, { markNotificationAsRead } from '../../features/notifications/notificationsSlice';
import { StyleSheetTestUtils } from "aphrodite";

jest.mock('../../features/notifications/notificationsSlice', () => {
  const originalSlice = jest.requireActual('../../features/notifications/notificationsSlice');
  return {
    __esModule: true,
    ...originalSlice,
    markNotificationAsRead: jest.fn((id) => ({
      type: 'notifications/markNotificationAsRead', payload: id
    }))
  }
});

beforeEach(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});


afterEach(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

const preloadedState = {
  auth: {
    user: {
      email: 'test@testing.tst',
      password: '12345678'
    },
    isLoggedIn: true
  },
  notifications: {
    notifications: [
      {
        id: 1,
        type: 'default',
        value: 'New course available'
      },
      {
        id: 2,
        type: 'urgent',
        value: 'New resume available'
      },
      {
        id: 3,
        type: 'urgent',
        html: {
          __html: '<strong>Urgent requirement</strong> - complete by EOD'
        }
      }
    ],
    displayDrawer: true
  },
  courses: {
    courses: [
      {
        id: 1, name: 'ES6', credit: 60
      },
      {
        id: 2, name: 'Webpack', credit: 20
      },
      {
        id: 3, name: 'React', credit: 40
      }
    ]
  }
}

function renderWithProvider(ui, preloadedState = {}) {
  const store = configureStore({
    reducer: {
      auth: authReducer,
      courses: coursesReducer,
      notifications: notificationsReducer,
    },
    preloadedState,
  });

  const renderResult = render(<Provider store={store}>{ui}</Provider>);

  const rerenderWithNewState = (newUI, newState) => {
    const newStore = configureStore({
      reducer: {
        auth: authReducer,
        courses: coursesReducer,
        notifications: notificationsReducer,
      },
      preloadedState: newState,
    });

    renderResult.rerender(<Provider store={newStore}>{newUI}</Provider>);
  };

  return { store, ...renderResult, rerenderWithNewState };
}

describe('NotificationItem Tests', () => {
  test('The NotificationItem is rendered without crashing', () => {
    renderWithProvider(<NotificationItem />, preloadedState);
  });

  test('Should return true if the NotificationItem component is a functional component', () => {
    expect(typeof NotificationItem.type).toBe('function');
    expect(NotificationItem.$$typeof.toString()).toBe('Symbol(react.memo)');
    expect(NotificationItem.type.prototype?.isReactComponent).toBeUndefined();
  });
});

describe('NotificationItem general behavior Test', () => {
  test('It should log to the console the "Notification id has been marked as read" with the correct notification item id', () => {
    renderWithProvider(<NotificationItem id={1} />, preloadedState);
    const firstListItemElement = screen.getAllByRole('listitem')[0];
    fireEvent.click(firstListItemElement)
    expect(markNotificationAsRead).toHaveBeenCalledWith(1);
  });
});
