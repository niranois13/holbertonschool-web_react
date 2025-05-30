import React from 'react';
import { render, screen, waitFor, cleanup } from '@testing-library/react';
import App from './App';
import mockAxios from 'jest-mock-axios';
import { StyleSheetTestUtils } from 'aphrodite';

jest.mock('axios');

const mockNotifications = [
  { id: 1, type: 'default', value: 'New course available' },
  { id: 2, type: 'urgent', value: 'New resume available' },
  { id: 3, type: 'urgent', html: { __html: '<strong>Urgent requirement</strong>' } },
];

describe('App component', () => {
  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
    mockAxios.reset();
  });

  afterEach(() => {
    cleanup();
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
    jest.clearAllMocks();
  });

  test('all inputs have accessible labels', async () => {
    mockAxios.get.mockResolvedValueOnce({ data: mockNotifications });

    render(<App />);

    await waitFor(() => screen.getByLabelText(/email/i));

    const email = screen.getByLabelText(/email/i);
    const password = screen.getByLabelText(/password/i);

    expect(email).toHaveAttribute('type', 'email');
    expect(password).toHaveAttribute('type', 'password');
  });
});
