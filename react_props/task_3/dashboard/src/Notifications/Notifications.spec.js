import { render, screen, fireEvent } from "@testing-library/react";
import Notifications from "./Notifications";

describe('Notifications', () => {
  const mockNotifications = [
    { id: 1, type: 'default', value: 'New course available' },
    { id: 2, type: 'urgent', value: 'New resume available' },
    { id: 3, type: 'urgent', html: { __html: '<strong>Urgent requirement</strong> - complete by EOD' } },
  ];

  test('Check the existence of the notifications title Here is the list of notifications', () => {
    render(<Notifications notifications={mockNotifications} />);
    const notiftitle = screen.getByText(/Here is the list of notifications/i);

    expect(notiftitle).toBeInTheDocument();
  });

  test('Check the existence of the button element in the notifications', () => {
    render(<Notifications notifications={mockNotifications} />);
    const button = screen.getByRole('button');

    expect(button).toBeInTheDocument();
  });

  test('Verify that there are 3 li elements as notifications rendered', () => {
    render(<Notifications notifications={mockNotifications} />);
    const lielements = screen.getAllByRole('listitem');

    expect(lielements.length).toBe(3);
  });

  test('logs message when close button is clicked (case-insensitive, with props)', () => {
    console.log = jest.fn();
    render(<Notifications notifications={mockNotifications} />);
    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);
    expect(console.log).toHaveBeenCalled();
    const loggedMessage = console.log.mock.calls[0][0];
    expect(loggedMessage).toMatch(/close button has been clicked/i);
  });
});
