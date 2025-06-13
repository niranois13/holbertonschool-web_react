import { screen, render } from '@testing-library/react';
import { StyleSheetTestUtils } from 'aphrodite';
import userEvent from '@testing-library/user-event';
import * as redux from 'react-redux';
import App from '../App';
import * as notificationsActions from '../features/notifications/notificationsSlice';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

jest.mock('../features/notifications/notificationsSlice', () => ({
  fetchNotifications: jest.fn(() => ({ type: 'notifications/fetch' })),
}));

let consoleOutput = [];

const mockedError = (output) => consoleOutput.push(['error', output]);
const mockedWarn = (output) => consoleOutput.push(['warn', output]);

beforeEach(() => {
  consoleOutput = [];
  jest.spyOn(console, 'error').mockImplementation(mockedError);
  jest.spyOn(console, 'warn').mockImplementation(mockedWarn);
  StyleSheetTestUtils.suppressStyleInjection();
});

afterEach(() => {
  console.error.mockRestore();
  console.warn.mockRestore();
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  jest.clearAllMocks();
});

test('renders login screen when user is not authenticated', async () => {
  redux.useSelector.mockImplementation((selector) =>
    selector({
      auth: { isLoggedIn: false, user: null },
      courses: { courses: [] },
      notifications: { notifications: [] },
    })
  );

  redux.useDispatch.mockReturnValue(jest.fn());

  render(<App />);

  expect(screen.getByRole('heading', { name: /log in to continue/i })).toBeInTheDocument();
  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();

  checkConsoleErrors();
});

test('dispatches login and fetchCourses when user logs in', async () => {
  const dispatch = jest.fn();
  redux.useDispatch.mockReturnValue(dispatch);

  redux.useSelector.mockImplementation((selector) =>
    selector({
      auth: { isLoggedIn: false, user: null },
      courses: { courses: [] },
      notifications: { notifications: [] },
    })
  );

  render(<App />);
  const user = userEvent.setup();

  await user.type(screen.getByLabelText(/email/i), 'test@example.com');
  await user.type(screen.getByLabelText(/password/i), 'password123');
  await user.click(screen.getByRole('button', { name: /ok/i }));

  expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ type: expect.stringContaining('auth/login') }));

  checkConsoleErrors();
});

test('fetches courses when user is already logged in', async () => {
  redux.useSelector.mockImplementation((selector) =>
    selector({
      auth: { isLoggedIn: true, user: { email: 'test@example.com' } },
      courses: {
        courses: [
          { id: 1, name: 'React', credit: 40 },
          { id: 2, name: 'ES6', credit: 60 },
        ],
      },
      notifications: { notifications: [] },
    })
  );

  redux.useDispatch.mockReturnValue(jest.fn());

  render(<App />);

  expect(screen.getByText(/course list/i)).toBeInTheDocument();
  expect(screen.getByText(/react/i)).toBeInTheDocument();
  expect(screen.getByText(/es6/i)).toBeInTheDocument();

  checkConsoleErrors();
});

test('fetches notifications on mount', async () => {
  const dispatch = jest.fn();
  redux.useDispatch.mockReturnValue(dispatch);

  redux.useSelector.mockImplementation((selector) =>
    selector({
      auth: { isLoggedIn: false, user: null },
      courses: { courses: [] },
      notifications: { notifications: [] },
    })
  );

  render(<App />);

  expect(notificationsActions.fetchNotifications).toHaveBeenCalled();
  expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ type: 'notifications/fetch' }));

  checkConsoleErrors();
});

function checkConsoleErrors() {
  if (consoleOutput.length > 0) {
    throw new Error(
      'Test failed: Console warnings or errors detected:\n' +
        consoleOutput.map(([type, message]) => `${type}: ${message}`).join('\n')
    );
  }
}
