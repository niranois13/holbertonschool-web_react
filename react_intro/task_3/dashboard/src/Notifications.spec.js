import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Notifications from './Notifications';

describe('Notifications component', () => {
  test('renders the notifications title (case-insensitive match)', () => {
    render(<Notifications />);
    const title = screen.getByText((content, element) => {
      return element?.tagName.toLowerCase() === 'p' &&
             /here is the list of notifications/i.test(content);
    });
    expect(title).toBeInTheDocument();
  });

  test('renders the close button', () => {
    render(<Notifications />);
    const closeButton = screen.getByLabelText(/close/i);
    expect(closeButton).toBeInTheDocument();
  });

  test('renders 3 list items', () => {
    render(<Notifications />);
    const listItems = screen.getAllByRole('listitem');
    expect(listItems.length).toBe(3);
  });

  test('logs message when close button is clicked', () => {
    console.log = jest.fn();
    render(<Notifications />);
    const closeButton = screen.getByLabelText(/close/i);
    fireEvent.click(closeButton);
    expect(console.log).toHaveBeenCalledWith(/Close button has been clicked/i);
  });
});
