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

  test("submit button is enabled when email is valid and password >= 8 chars", () => {
    render(<Login />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole("button", { name: /ok/i });

    // Initially disabled
    expect(submitButton).toBeDisabled();

    // Enter valid email and invalid password
    fireEvent.change(emailInput, { target: { value: "user@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "123" } });
    expect(submitButton).toBeDisabled();

    // Enter valid password
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    expect(submitButton).not.toBeDisabled();
  });

  test("form submission does not reload the page", () => {
    const preventDefault = jest.fn();
    render(<Login />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const form = screen.getByRole("form", { hidden: true }) || screen.getByTestId("login-form");

    fireEvent.change(emailInput, { target: { value: "user@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    fireEvent.submit(form, { preventDefault });
    expect(preventDefault).toHaveBeenCalled();
  });
});
