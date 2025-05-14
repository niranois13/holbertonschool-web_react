import React from 'react';
import { render, screen } from '@testing-library/react';
import BodySectionWithMarginBottom from './BodySectionWithMarginBottom';
import { StyleSheetTestUtils } from 'aphrodite';

beforeEach(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

afterEach(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

describe('BodySectionWithMarginBottom component', () => {
  test('renders a div with the class bodySectionWithMargin', () => {
    const { container } = render(
      <BodySectionWithMarginBottom title="Test title">
        <p>Some content</p>
      </BodySectionWithMarginBottom>
    );
    screen.debug();
    const wrapper = container.querySelector('.bodySectionWithMargin');
    expect(wrapper).toBeInTheDocument();
  });

  test('renders the BodySection component inside', () => {
    render(
      <BodySectionWithMarginBottom title="Section title">
        <p>Child content</p>
      </BodySectionWithMarginBottom>
    );
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toHaveTextContent(/section title/i);
    expect(screen.getByText(/child content/i)).toBeInTheDocument();
  });
});
