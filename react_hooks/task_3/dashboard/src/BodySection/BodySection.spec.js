import React from 'react';
import { render, screen } from '@testing-library/react';
import BodySection from './BodySection';
import { StyleSheetTestUtils } from 'aphrodite';

beforeEach(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

afterEach(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

describe('BodySection component', () => {
  test('renders the title inside an h2 (case-insensitive)', () => {
    render(<BodySection title="Test Title"><p>Child content</p></BodySection>);
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(/test title/i);
  });

  test('renders any children passed to it', () => {
    render(
      <BodySection title="With children">
        <p>First child</p>
        <p>Second child</p>
      </BodySection>
    );
    expect(screen.getByText(/first child/i)).toBeInTheDocument();
    expect(screen.getByText(/second child/i)).toBeInTheDocument();
  });
});
