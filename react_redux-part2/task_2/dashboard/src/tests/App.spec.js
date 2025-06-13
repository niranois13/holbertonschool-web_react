import React, { useCallback, useState } from 'react';
import { act, render, fireEvent, renderHook, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from "../App";
import { getLatestNotification } from '../utils/utils';
import mockAxios from 'jest-mock-axios';
import { StyleSheetTestUtils } from "aphrodite";
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import coursesReducer from '../features/courses/coursesSlice';
import notificationsReducer from '../features/notifications/notificationsSlice';


const originalError = console.error;
const originalWarn = console.warn;

let consoleOutput = [];

console.error = (...args) => {
  consoleOutput.push(['error', args[0]]);
};

console.warn = (...args) => {
  consoleOutput.push(['warn', args[0]]);
};

beforeEach(() => {
  consoleOutput = [];
  StyleSheetTestUtils.suppressStyleInjection();
});

afterEach(() => {
  jest.clearAllMocks();

  if (consoleOutput.length > 0) {
    throw new Error(
      'Test failed: Console warnings or errors detected:\n' +
      consoleOutput.map(([type, message]) => `${type}: ${message}`).join('\n')
    );
  }

  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

export function renderWithProvider(ui) {
  const store = configureStore({
    reducer: {
      auth: authReducer,
      courses: coursesReducer,
      notifications: notificationsReducer,
    },
  });

  return render(<Provider store={store}>{ui}</Provider>);
}

jest.mock('axios', () => require('jest-mock-axios').default);

const mockBodySection = jest.fn();
jest.mock("../components/BodySection/BodySection", () => {
  const MockBodySection = (props) => {
    mockBodySection(props);
    return (
      <div>
        <h2>{props.title}</h2>
        {props.children}
      </div>
    );
  };
  MockBodySection.displayName = 'MockBodySection';
  return MockBodySection;
});

test('Should confirm App is a function component', () => {
  expect(Object.keys(App.prototype)).toHaveLength(0);
  expect(Object.getPrototypeOf(App)).not.toBe(React.Component);
  expect(typeof App).toBe('function');
  expect(App.prototype?.render).toBe(undefined);
});

test('Should add the title of "Log in to continue" above the Login component when the isLoggedIn prop set to false', () => {
  renderWithProvider(<App />);
  expect(screen.getByRole('heading', { name: /log in to continue/i })).toBeInTheDocument();
});

test('Should render BodySection as a child component', () => {
  renderWithProvider(<App />);
  expect(mockBodySection).toHaveBeenCalled();
});

test('Should render BodySection with news when logged in', () => {
  renderWithProvider(<App />);
  expect(mockBodySection).toHaveBeenCalled();
});

test('Should render a heading element with a text "", and a paragraph with text ""', () => {
  renderWithProvider(<App />);
  expect(screen.getByRole('heading', { name: /news from the school/i })).toBeInTheDocument();
  expect(screen.getByText(/holberton school news goes here/i)).toBeInTheDocument()
});

describe('Test HOC log mount and unmount "Login" and "CourseList" components', () => {
  beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation(() => { });
  });

  afterEach(() => {
    console.log.mockRestore();
  });

  test('Logs when CourseList is mounted and unmounted based on "isLoggedIn" prop value, and handles nameless components', async () => {
    const { rerender, unmount, container } = renderWithProvider(<App />);
    expect(screen.getByText(/login to access the full dashboard/i)).toBeInTheDocument();
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /ok/i });
    fireEvent.change(emailInput, { target: { value: 'email@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    expect(submitButton).not.toBeDisabled();
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(screen.getByText(/course list/i)).toBeInTheDocument();
      const logoutSection = container.querySelector("div#logoutSection");
      expect(within(logoutSection).getByText('email@example.com')).toBeInTheDocument();
      expect(within(logoutSection).getByText(/logout/i)).toBeInTheDocument();
    });
    expect(console.log).toHaveBeenCalledWith(expect.stringMatching(/Component CourseList is mounted|Component Component is mounted/));
    rerender();
    expect(console.log).toHaveBeenCalledWith(expect.stringMatching(/Component CourseList is mounted|Component Component is mounted/));
    unmount();
    expect(console.log).toHaveBeenCalledWith(expect.stringMatching(/Component CourseList is going to unmount/));
    const logCalls = console.log.mock.calls;
    expect(logCalls.filter(call => call[0].includes('Component CourseList is mounted') || call[0].includes('Component Component is mounted')).length).toBeGreaterThanOrEqual(1);
    expect(logCalls.filter(call => call[0].includes('Component CourseList is going to unmount') || call[0].includes('Component Component is going to unmount')).length).toBe(1);
  });

  test('Logs when Login is mounted and unmounted based on "isLoggedIn" prop value, and handles nameless components', () => {
    const { unmount } = renderWithProvider(<App />);
    expect(console.log).toHaveBeenCalledWith(expect.stringMatching(/Component (Login|Component) is mounted/));
    renderWithProvider(<App />);
    expect(console.log).toHaveBeenCalledWith(expect.stringMatching(/Component (Login|Component) is mounted/));
    unmount();
    expect(console.log).toHaveBeenCalledWith(expect.stringMatching(/Component (Login|Component) is going to unmount/));
    const logCalls = console.log.mock.calls;
    expect(logCalls.filter(call => call[0].includes('Component Login is mounted') || call[0].includes('Component Component is mounted')).length).toBe(2);
    expect(logCalls.filter(call => call[0].includes('Component Login is going to unmount') || call[0].includes('Component Component is going to unmount')).length).toBe(1);
  });
})

test('Should display CourseList and welcome message after login and hide them after logout', async () => {
  renderWithProvider(<App />);
  expect(screen.getByText('Log in to continue')).toBeInTheDocument();
  const emailInput = screen.getByRole('textbox', { name: /email/i });
  const passwordInput = screen.getByLabelText(/password/i);
  const submitButton = screen.getByRole('button', { name: /ok/i });
  await act(async () => {
    await userEvent.type(emailInput, 'email@example.com');
    await userEvent.type(passwordInput, 'password123');
    await userEvent.click(submitButton);
  });
  expect(screen.getByText('Course list')).toBeInTheDocument();
  const logoutLink = screen.getByRole('link', { name: /logout/i });
  await act(async () => {
    await userEvent.click(logoutLink);
  });
  await waitFor(() => {
    expect(screen.getByText(/log in to continue/i)).toBeInTheDocument();
    expect(screen.queryByText(/course list/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Welcome/)).not.toBeInTheDocument();
  });
});

test('Should handle login with valid email and password', async () => {
  renderWithProvider(<App />);
  const emailInput = screen.getByRole('textbox', { name: /email/i });
  const passwordInput = screen.getByLabelText(/password/i);
  const submitButton = screen.getByRole('button', { name: /ok/i });
  await act(async () => {
    fireEvent.change(emailInput, { target: { value: 'email@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);
  });
  expect(screen.getByText('Course list')).toBeInTheDocument();
  expect(screen.queryByText('Log in to continue')).not.toBeInTheDocument();
  const logoutSection = document.querySelector('#logoutSection');
  expect(logoutSection).toBeInTheDocument();
  expect(logoutSection).toHaveTextContent('email@example.com');
});

test('Should render login page when the user is not logged in and handle login flow correctly', async () => {
  renderWithProvider(<App />);
  expect(screen.getByText('Log in to continue')).toBeInTheDocument();
  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);
  const submitButton = screen.getByRole('button', { name: /ok/i });
  await act(async () => {
    fireEvent.change(emailInput, { target: { value: 'email@example.com' } });
    fireEvent.change(passwordInput, { target: { value: '12345678' } });
    fireEvent.click(submitButton);
  });
  expect(screen.getByText(/course list/i)).toBeInTheDocument();
  expect(screen.getByRole('table')).toBeInTheDocument();
  const logoutSection = screen.getByText(/logout/i);
  expect(logoutSection).toBeInTheDocument();
  await act(async () => {
    fireEvent.click(logoutSection);
  });
  expect(screen.getByText(/log in to continue/i)).toBeInTheDocument();
});

test('logIn updates user state and renders CourseList', () => {
  renderWithProvider(<App />);
  expect(screen.getByText(/log in to continue/i)).toBeInTheDocument();
  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);
  const submitButton = screen.getByRole('button', { name: /ok/i });
  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  fireEvent.change(passwordInput, { target: { value: 'password123' } });
  fireEvent.click(submitButton);
  expect(screen.getByText(/course list/i)).toBeInTheDocument();
});

test('logOut function should clears user state and renders Login form', async () => {
  const user = userEvent.setup();
  const { container } = renderWithProvider(<App />);
  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);
  const submitButton = screen.getByRole('button', { name: /ok/i });
  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  fireEvent.change(passwordInput, { target: { value: 'password123' } });
  fireEvent.click(submitButton);
  expect(screen.getByText(/course list/i)).toBeInTheDocument();
  const logoutSection = container.querySelector('#logoutSection');
  const logoutLink = logoutSection.querySelector('a');
  await user.click(logoutLink);
  await waitFor(() => {
    expect(container.querySelector('#logoutSection')).not.toBeInTheDocument();
    expect(screen.queryByText(/course list/i)).not.toBeInTheDocument();
    expect(screen.queryByText('test@example.com')).not.toBeInTheDocument();
    const loginTitle = screen.getByText(/log in to continue/i);
    expect(loginTitle).toBeInTheDocument();
  });
});

describe('App component when user is logged in', () => {
  const mockCoursesResponse = {
    data: {
      "courses": [
        { "id": 1, "name": "ES6", "credit": 60 },
        { "id": 2, "name": "Webpack", "credit": 20 },
        { "id": 3, "name": "React", "credit": 40 }
      ]
    }
  };
  const mockEmptyNotificationsResponse = {
    data: {
      notifications: []
    }
  };

  afterEach(() => {
    mockAxios.reset();
  });

  test('The App component should fetch courses data successfully whenever user is logged in', async () => {
    const user = userEvent.setup();
    mockAxios.get.mockImplementation((url) => {
      if (url.includes('notifications')) {
        return Promise.resolve(mockEmptyNotificationsResponse);
      }
      if (url.includes('courses')) {
        return Promise.resolve(mockCoursesResponse);
      }
    });
    renderWithProvider(<App />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /ok/i });
    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'password123');
    await user.click(submitButton);
    await waitFor(() => {
      expect(screen.getByText('ES6')).toBeInTheDocument();
      expect(screen.getByText('Webpack')).toBeInTheDocument();
      expect(screen.getByText('React')).toBeInTheDocument();
    });
  });
});

describe('User State Tests', () => {
  const mockNotificationsResponse = {
    data: {
      notifications: [
        { id: 1, type: 'default', value: 'New course available' },
        { id: 2, type: 'urgent', value: 'New resume available' },
        { id: 3, type: 'urgent', html: { __html: getLatestNotification() } }
      ]
    }
  };

  const mockCoursesResponse = {
    data: {
      "courses": [
        { "id": 1, "name": "ES6", "credit": 60 },
        { "id": 2, "name": "Webpack", "credit": 20 },
        { "id": 3, "name": "React", "credit": 40 }
      ]
    }
  };

  test('User state management through login/logout cycle', async () => {
    const user = userEvent.setup();
    mockAxios.get.mockImplementation((url) => {
      if (url.includes('notifications')) {
        return Promise.resolve(mockNotificationsResponse);
      }
      if (url.includes('courses')) {
        return Promise.resolve(mockCoursesResponse);
      }
      return Promise.reject(new Error('Invalid URL'));
    });
    renderWithProvider(<App />);
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /log in to continue/i })).toBeInTheDocument();
    });
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole('button', { name: /ok/i });
    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'password123');
    await user.click(loginButton);
    await waitFor(() => {
      expect(screen.getByText(/course list/i)).toBeInTheDocument();
      expect(screen.queryByText(/log in to continue/i)).not.toBeInTheDocument();
    });
    const logoutButton = screen.getByText(/logout/i);
    await user.click(logoutButton);
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /log in to continue/i })).toBeInTheDocument();
      expect(screen.queryByText(/course list/i)).not.toBeInTheDocument();
    });
  });
});

describe('Notifications State Tests', () => {
  const mockNotificationsResponse = {
    data: {
      notifications: [
        { id: 1, type: 'default', value: 'New course available' },
        { id: 2, type: 'urgent', value: 'New resume available' },
        { id: 3, type: 'urgent', html: { __html: getLatestNotification() } }
      ]
    }
  };

  afterEach(() => {
    mockAxios.reset();
  });

  test('Notifications priority and ordering', async () => {
    mockAxios.get.mockResolvedValueOnce(mockNotificationsResponse);
    renderWithProvider(<App />);
    await waitFor(() => {
      const notifications = screen.getAllByRole('listitem');
      const urgentNotifications = notifications.filter(notification =>
        window.getComputedStyle(notification).color === 'red'
      );
      expect(urgentNotifications.length).toBeGreaterThan(0);
      expect(notifications[1]).toBe(urgentNotifications[0]);
    });
  });
});

describe('App Component Hooks', () => {
  describe('handleDisplayDrawer', () => {
    test('Should toggle display state to true', () => {
      const { result } = renderHook(() => {
        const [displayDrawer, setDisplayDrawer] = useState(false);
        const handleDisplayDrawer = useCallback(() => {
          setDisplayDrawer(true);
        }, []);
        return { displayDrawer, handleDisplayDrawer };
      });
      act(() => {
        result.current.handleDisplayDrawer();
      });
      expect(result.current.displayDrawer).toBe(true);
    });

    test('Should maintain reference equality between renders', () => {
      const { result, rerender } = renderHook(() => {
        const [displayDrawer, setDisplayDrawer] = useState(false);
        const handleDisplayDrawer = useCallback(() => {
          setDisplayDrawer(true);
        }, []);
        return { displayDrawer, handleDisplayDrawer };
      });
      const firstReference = result.current.handleDisplayDrawer;
      rerender();
      expect(result.current.handleDisplayDrawer).toBe(firstReference);
    });
  });

  describe('handleHideDrawer', () => {
    it('Should toggle display state to false', () => {
      const { result } = renderHook(() => {
        const [displayDrawer, setDisplayDrawer] = useState(true);
        const handleHideDrawer = useCallback(() => {
          setDisplayDrawer(false);
        }, []);
        return { displayDrawer, handleHideDrawer };
      });
      act(() => {
        result.current.handleHideDrawer();
      });
      expect(result.current.displayDrawer).toBe(false);
    });
  });

  describe('logOut', () => {
    test('should reset user state', () => {
      const { result } = renderHook(() => {
        const [user, setUser] = useState({
          email: 'test@test.com',
          password: 'password123',
          isLoggedIn: true
        });
        const logOut = useCallback(() => {
          setUser({
            email: '',
            password: '',
            isLoggedIn: false,
          });
        }, []);
        return { user, logOut };
      });
      act(() => {
        result.current.logOut();
      });
      expect(result.current.user).toEqual({
        email: '',
        password: '',
        isLoggedIn: false
      });
    });
  });

  describe('markNotificationAsRead', () => {
    const mockNotifications = [
      { id: 1, type: 'default', value: 'Test 1' },
      { id: 2, type: 'urgent', value: 'Test 2' }
    ];

    test('Should remove notification with specified id', () => {
      const { result } = renderHook(() => {
        const [notifications, setNotifications] = useState(mockNotifications);
        const markNotificationAsRead = useCallback((id) => {
          setNotifications(prev =>
            prev.filter(notification => notification.id !== id)
          );
        }, []);
        return { notifications, markNotificationAsRead };
      });
      act(() => {
        result.current.markNotificationAsRead(1);
      });
      expect(result.current.notifications).toHaveLength(1);
      expect(result.current.notifications[0].id).toBe(2);
    });

    test('Should maintain reference equality between renders', () => {
      const { result, rerender } = renderHook(() => {
        const [notifications, setNotifications] = useState(mockNotifications);
        const markNotificationAsRead = useCallback((id) => {
          setNotifications(prev =>
            prev.filter(notification => notification.id !== id)
          );
        }, []);
        return { notifications, markNotificationAsRead };
      });
      const firstReference = result.current.markNotificationAsRead;
      rerender();
      expect(result.current.markNotificationAsRead).toBe(firstReference);
    });
  });
});

describe('App Component Type Tests', () => {
  test('Should verify that App is a functional component', () => {
    function getComponentType(component) {
      if (typeof component !== 'function') {
        return
      }
      if (component.prototype?.isReactComponent) {
        return 'class component';
      }
      return 'functional component';
    }
    expect(typeof App).toBe('function');
    expect(App.prototype?.isReactComponent).toBeUndefined();
    const componentType = getComponentType(App);
    expect(componentType).toBe('functional component');
    expect(() => {
      const element = React.createElement(App);
      expect(React.isValidElement(element)).toBe(true);
    }).not.toThrow();
  });
});

afterAll(() => {
  console.error = originalError;
  console.warn = originalWarn;
});
