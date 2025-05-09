import { render, screen, fireEvent } from "@testing-library/react";
import Notifications from "./Notifications";
import { getLatestNotification } from "../utils/utils.js";

describe('Notifications Component Behavior', () => {
  const mockNotifications = [
    { id: 1, type: 'default', value: 'New course available' },
    { id: 2, type: 'urgent', value: 'New resume available' },
    { id: 3, type: 'urgent', html: { __html: getLatestNotification() } },
  ];

  test('Always renders the "Your notifications" title (case-insensitive)', () => {
    render(<Notifications notifications={mockNotifications} displayDrawer={false} />);
    expect(screen.getByText(/your notifications/i)).toBeInTheDocument();
  });

  describe('When displayDrawer is false', () => {
    test('Does not render the list, list items, or close button', () => {
      render(<Notifications notifications={mockNotifications} displayDrawer={false} />);
      expect(screen.queryByText(/here is the list of notifications/i)).not.toBeInTheDocument();
      expect(screen.queryByRole('list')).not.toBeInTheDocument();
      expect(screen.queryAllByRole('listitem')).toHaveLength(0);
      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });

    test('Does NOT render "No new notification for now" even if notifications is empty', () => {
      render(<Notifications notifications={[]} displayDrawer={false} />);
      expect(screen.queryByText(/no new notification for now/i)).not.toBeInTheDocument();
    });
  });

  describe('When displayDrawer is true and notifications are present', () => {
    test('Renders list header, all notification items, and close button', () => {
      render(<Notifications notifications={mockNotifications} displayDrawer={true} />);
      expect(screen.getByText(/here is the list of notifications/i)).toBeInTheDocument();
      expect(screen.getAllByRole('listitem')).toHaveLength(3);
      expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
    });

    test('Clicking close button logs expected message', () => {
      const originalLog = console.log;
      console.log = jest.fn();

      render(<Notifications notifications={mockNotifications} displayDrawer={true} />);
      fireEvent.click(screen.getByRole('button', { name: /close/i }));

      expect(console.log).toHaveBeenCalledWith(expect.stringMatching(/close button has been clicked/i));

      console.log = originalLog;
    });
  });

  describe('When displayDrawer is true and notifications array is empty', () => {
    test('Displays "No new notification for now"', () => {
      render(<Notifications notifications={[]} displayDrawer={true} />);
      expect(screen.getByText(/no new notification for now/i)).toBeInTheDocument();
    });
  });

  describe('When props are omitted or partially missing', () => {
    test('Renders safely with no props (uses defaults)', () => {
      render(<Notifications />);
      expect(screen.getByText(/your notifications/i)).toBeInTheDocument();
      expect(screen.queryByText(/here is the list/i)).not.toBeInTheDocument();
    });

    test('Renders safely when only displayDrawer is true and notifications is undefined', () => {
      render(<Notifications displayDrawer={true} />);
      expect(screen.getByText(/no new notification for now/i)).toBeInTheDocument();
    });
  });
});
