import { render, screen } from "@testing-library/react";
import App from "./App.jsx";

test('renders an h1 with text "School dashboard"', () => {
  render(<App />);
  const heading = screen.getByRole('heading', { name: /School dashboard/i });
  expect(heading).toBeInTheDocument();
});

test('renders correct text in App-body and App-footer', () => {
  render(<App />);
  expect(screen.getByText(/Login to access the full dashboard/i)).toBeInTheDocument();
  expect(screen.getByText(/Copyright 2025 - holberton School/i)).toBeInTheDocument();
});

test('renders an img element', () => {
  render(<App />);
  const img = screen.getByRole('img', { name: /holberton logo/i });
  expect(img).toBeInTheDocument();
});

test('renders two inputs in App-body', () => {
  render(<App />);
  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);
  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
});

test('renders two label elements with Email and Password', () => {
  render(<App />);
  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
});

test('renders a button in App-body', () => {
  render(<App />);
  const button = screen.getByRole('button', { name: /ok/i });
  expect(button).toBeInTheDocument();
});
