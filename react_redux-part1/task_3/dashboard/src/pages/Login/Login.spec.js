import { fireEvent, render, screen, waitFor, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import Login from './Login';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import authReducer from '../../features/auth/authSlice';


let store;

beforeEach(() => {
  store = configureStore({
    reducer: {
      auth: authReducer,
    },
    preloadedState: {
      auth: {
        user: { email: '', password: '' },
        isLoggedIn: false,
      },
    },
  });
});

afterEach(() => {
  cleanup();
});

function renderWithProvider(ui) {
  return render(<Provider store={store}>{ui}</Provider>);
}

test('Testing signin form elements', () => {
  renderWithProvider(<Login />);
  const emailInput = screen.getByRole('textbox');
  const passwordInput = screen.getByLabelText(/password/i);
  const submitButton = screen.getByRole('button', { name: 'OK' });
  expect(emailInput).toBeInTheDocument();
  expect(emailInput).toHaveAttribute('type', 'email');
  expect(screen.getByLabelText(/email/i)).toBe(emailInput);
  expect(passwordInput).toBeInTheDocument();
  expect(passwordInput).toHaveAttribute('type', 'password');
  expect(submitButton).toBeInTheDocument();
  expect(submitButton).toBeDisabled();
});

test('Should check that the email input element will be focused whenever the associated label is clicked', async () => {
  renderWithProvider(<Login />);
  const emailInput = screen.getByLabelText('Email');
  const emailLabel = screen.getByText('Email');
  userEvent.click(emailLabel);
  await waitFor(() => {
    expect(emailInput).toHaveFocus();
  });
})

test('Should check that the password input element will be focused whenver the associated label is clicked', async () => {
  renderWithProvider(<Login />);
  const passwordLabel = screen.getByText('Password');
  const passwordInput = screen.getByLabelText('Password');
  userEvent.click(passwordLabel);
  await waitFor(() => {
    expect(passwordInput).toHaveFocus();
  });
});

test('Submit button is disabled by default', () => {
  renderWithProvider(<Login />);
  const submitButton = screen.getByText('OK');
  expect(submitButton).toBeDisabled();
});

test('Submit button is enabled only with a valid email and password of at least 8 characters', () => {
  renderWithProvider(<Login />);
  const emailInput = screen.getByLabelText('Email');
  const passwordInput = screen.getByLabelText('Password');
  const submitButton = screen.getByText('OK');
  expect(submitButton).toBeDisabled();
  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  fireEvent.change(passwordInput, { target: { value: '123' } });
  expect(submitButton).toBeDisabled();
  fireEvent.change(emailInput, { target: { value: 'test.com' } });
  fireEvent.change(passwordInput, { target: { value: '12345678' } });
  expect(submitButton).toBeDisabled();
  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  fireEvent.change(passwordInput, { target: { value: '12345678' } });
  expect(submitButton).not.toBeDisabled();
});

describe('Login Component Tests', () => {
  test('Should initialize with default email and password', () => {
    renderWithProvider(<Login />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    expect(emailInput.value).toBe('');
    expect(passwordInput.value).toBe('');
  });

  test('Should dispatch login action on valid form submission', () => {
    renderWithProvider(<Login />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /ok/i });

    fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    // Optionnel : tester les effets du dispatch avec `useSelector` ou observer le state
    const state = store.getState();
    expect(state.auth.user.email).toBe('test@test.com');
    expect(state.auth.isLoggedIn).toBe(true);
  });

  test('Should enable the submit button only with valid email and password', () => {
    renderWithProvider(<Login />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /ok/i });
    expect(submitButton).toBeDisabled();
    fireEvent.change(emailInput, { target: { value: 'valid@test.com' } });
    fireEvent.change(passwordInput, { target: { value: 'validpassword' } });
    expect(submitButton).not.toBeDisabled();
  });

  test('Should update state on email and password input change', () => {
    renderWithProvider(<Login />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    fireEvent.change(emailInput, { target: { value: 'newemail@test.com' } });
    fireEvent.change(passwordInput, { target: { value: 'newpassword' } });
    expect(emailInput.value).toBe('newemail@test.com');
    expect(passwordInput.value).toBe('newpassword');
  });
});
