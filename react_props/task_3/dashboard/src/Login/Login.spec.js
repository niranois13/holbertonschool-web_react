import { render, screen } from "@testing-library/react";
import Login from "./Login";

test('the text content within the 2 p elements in the app-body and app-footer divs matches', () => {
  render(<Login />);
  const divbody = screen.getByText(/Login to access the full dashboard/i);

  expect(divbody).toBeInTheDocument();
});

test('renders 2 input elements', () => {
  render(<Login />);
  const labelemail = screen.getByLabelText(/Email/i);
  const labelpassword = screen.getByLabelText(/Password/i);

  expect(labelemail).toBeInTheDocument();
  expect(labelpassword).toBeInTheDocument();
});

test('renders 2 label elements with the text Email and Password', () => {
  render(<Login />);
  const labelemail = screen.getByLabelText(/email/i);
  const labelpassword = screen.getByLabelText(/password/i);

  expect(labelemail).toBeInTheDocument();
  expect(labelpassword).toBeInTheDocument();
});

test('renders a button with the text OK', () => {
  render(<Login />);
  const button = screen.getByRole('button', { name: /ok/i });

  expect(button).toBeInTheDocument();
});
