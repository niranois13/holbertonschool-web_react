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

test('renders 2 labels and matching inputs in App-body', () => {
  render(<App />);
  const emailLabel = screen.getByLabelText(/email/i);
  const passwordLabel = screen.getByLabelText(/password/i);
  expect(emailLabel).toBeInTheDocument();
  expect(passwordLabel).toBeInTheDocument();
});

test('renders a button in App-body', () => {
  render(<App />);
  const button = screen.getByRole('button', { name: /ok/i });
  expect(button).toBeInTheDocument();
});
