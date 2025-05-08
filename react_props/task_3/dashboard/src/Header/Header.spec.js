import { render, screen } from "@testing-library/react";
import Header from "./Header";

test('h1 element with the text School Dashboard is rendered', () => {
  render(<Header />);
  const heading = screen.getByRole('heading', { name: /School Dashboard/i });
  expect(heading).toBeInTheDocument();
});

test('an img element is rendered', () => {
  render(<Header />);
  const image = screen.getByAltText(/holberton logo/i);
  expect(image).toBeInTheDocument();
});
