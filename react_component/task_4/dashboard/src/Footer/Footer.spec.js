import { render, screen } from "@testing-library/react";
import { getCurrentYear, getFooterCopy } from "../utils/utils";
import Footer from "./Footer";

test('the text content within the 2 p elements in the app-body and app-footer divs matches', () => {
  render(<Footer />);
  const divfooter = screen.getByText(/Copyright 2025 - holberton School/i);

  expect(divfooter).toBeInTheDocument();
});

test('renders correct footer content when isIndex is true', () => {
  render(<Footer />);

  const year = getCurrentYear();
  const copy = getFooterCopy(true);
  const expectedText = `Copyright ${year} - ${copy}`;

  const footerText = screen.getByText(expectedText, { exact: false });
  expect(footerText).toBeInTheDocument();
});
