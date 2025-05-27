import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import WithLogging from './WithLogging';
import { StyleSheetTestUtils } from 'aphrodite';

beforeEach(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

afterEach(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

afterEach(cleanup);

class MockApp extends React.Component {
  render() {
    return <h1>Hello from Mock App Component</h1>;
  }
}

describe('WithLogging HOC', () => {
  const MockAppWithLogging = WithLogging(MockApp);

  test('renders heading from wrapped component', () => {
    render(<MockAppWithLogging />);
    expect(screen.getByText(/hello from mock app component/i)).toBeInTheDocument();
  });

  test('logs mounting and unmounting to console', () => {
    const originalLog = console.log;
    console.log = jest.fn();

    const { unmount } = render(<MockAppWithLogging />);
    expect(console.log).toHaveBeenCalledWith(expect.stringMatching(/Component MockApp is mounted/i));

    unmount();
    expect(console.log).toHaveBeenCalledWith(expect.stringMatching(/Component MockApp is going to unmount/i));

    console.log = originalLog;
  });

  test('has correct displayName format', () => {
    expect(MockAppWithLogging.displayName).toBe('WithLogging(MockApp)');
  });
});
