import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Notifications from './Notifications';

describe('Notifications component', () => {
  test('renders the notifications title', () => {
    render(<Notifications />);
    const title = screen.getByText(/Here is the list of notifications/i);
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
    expect(console.log).toHaveBeenCalledWith('Close button has been clicked');
  });

  test('renders exactly 8 direct child elements inside the notifications container', () => {
    const { container } = render(<Notifications />);
    const notificationContainer = container.querySelector('.notifications');
    const allElements = notificationContainer.querySelectorAll('*');
    expect(allElements.length).toBe(8);
  });
});
