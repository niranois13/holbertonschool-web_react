import { render, screen, fireEvent } from "@testing-library/react";
import Notifications from "./Notifications";
import { getLatestNotification } from "../utils/utils.js";

describe('Notifications Component Behavior', () => {
  const mockNotifications = [
    { id: 1, type: 'default', value: 'New course available' },
    { id: 2, type: 'urgent', value: 'New resume available' },
    { id: 3, type: 'urgent', html: { __html: getLatestNotification() } },
  ];

  test('Always renders "Your notifications" title', () => {
    render(<Notifications notifications={mockNotifications} displayDrawer={false} />);
    expect(screen.getByText(/your notifications/i)).toBeInTheDocument();
  });

  describe('When displayDrawer is false', () => {
    test('Does not render notification items, list text, or button', () => {
      render(<Notifications notifications={mockNotifications} displayDrawer={false} />);
      expect(screen.queryByText(/here is the list of notifications/i)).not.toBeInTheDocument();
      expect(screen.queryAllByRole('listitem')).toHaveLength(0);
      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });
  });

  describe('When displayDrawer is true and notifications are present', () => {
    test('Renders list text, notifications, and button', () => {
      render(<Notifications notifications={mockNotifications} displayDrawer={true} />);
      expect(screen.getByText(/here is the list of notifications/i)).toBeInTheDocument();
      expect(screen.getAllByRole('listitem')).toHaveLength(3);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    test('Logs message when close button is clicked', () => {
      console.log = jest.fn();
      render(<Notifications notifications={mockNotifications} displayDrawer={true} />);
      const button = screen.getByRole('button', { name: /close/i });
      fireEvent.click(button);
      expect(console.log).toHaveBeenCalled();
      const loggedMessage = console.log.mock.calls[0][0];
      expect(loggedMessage).toMatch(/close button has been clicked/i);
    });
  });

  describe('When displayDrawer is true and notifications is an empty array', () => {
    test('Displays "No new notification for now"', () => {
      render(<Notifications notifications={[]} displayDrawer={true} />);
      expect(screen.getByText(/No new notification for now/i)).toBeInTheDocument();
    });
  });

  describe('When displayDrawer is false and notifications is empty', () => {
    test('Does NOT render "No new notification for now"', () => {
      render(<Notifications notifications={[]} displayDrawer={false} />);
      expect(screen.queryByText(/No new notification for now/i)).not.toBeInTheDocument();
    });
  });
});
