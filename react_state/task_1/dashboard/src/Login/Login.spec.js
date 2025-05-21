import { render, screen, fireEvent } from "@testing-library/react";
import Login from "./Login";
import { StyleSheetTestUtils } from "aphrodite";

beforeEach(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

afterEach(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

describe("Login component", () => {
  test("renders login instructional text", () => {
    render(<Login />);
    expect(screen.getByText(/login to access the full dashboard/i)).toBeInTheDocument();
  });

  test("renders email and password input fields", () => {
    render(<Login />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  test("renders submit button with text OK", () => {
    render(<Login />);
    const submitButton = screen.getByRole("button", { name: /ok/i });
    expect(submitButton).toBeInTheDocument();
  });

  test("submit button is disabled by default", () => {
    render(<Login />);
    const submitButton = screen.getByRole("button", { name: /ok/i });
    expect(submitButton).toBeDisabled();
  });

  test("submit button is enabled only when email is valid and password >= 8 chars", () => {
    render(<Login />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole("button", { name: /ok/i });
    expect(submitButton).toBeDisabled();

    fireEvent.change(emailInput, { target: { value: "user@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "123" } });
    expect(submitButton).toBeDisabled();

    fireEvent.change(passwordInput, { target: { value: "password123" } });
    expect(submitButton).not.toBeDisabled();
  });

  test('form submission does not reload the page', () => {
    render(<Login />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const form = screen.getByTestId('login-form');

    fireEvent.change(emailInput, { target: { value: 'user@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    // Attach a spy to the form to intercept the submit event
    const preventDefault = jest.fn();
    form.addEventListener('submit', e => e.preventDefault = preventDefault);

    fireEvent.submit(form);
  
    expect(preventDefault).toHaveBeenCalled();
  });
});
