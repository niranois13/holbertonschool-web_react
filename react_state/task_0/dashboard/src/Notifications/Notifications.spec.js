import { render, screen, fireEvent } from "@testing-library/react";
import Notifications from "./Notifications.jsx";
import { getLatestNotification } from "../utils/utils.js";
import { StyleSheetTestUtils } from 'aphrodite';

beforeEach(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

afterEach(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

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
      expect(screen.queryByRole('button', { name: /close/i })).not.toBeInTheDocument();
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

  test('Clicking a notification logs the correct markAsRead message (case-insensitive)', () => {
    const originalLog = console.log;
    console.log = jest.fn();
    render(<Notifications notifications={mockNotifications} displayDrawer={true} />);
    const firstNotification = screen.getByText(/new course available/i);
    fireEvent.click(firstNotification);
    expect(console.log).toHaveBeenCalledWith(expect.stringMatching(/Notification 1 has been marked as read/i));
    console.log = originalLog;
  });

  test('Notifications component does not re-render if the length of the notifications prop remains the same', () => {
    const { rerender } = render(<Notifications notifications={mockNotifications} displayDrawer={true} />);
    const originalLog = console.log;
    console.log = jest.fn();
    rerender(<Notifications notifications={mockNotifications} displayDrawer={true} />);
    expect(console.log).not.toHaveBeenCalled();
    console.log = originalLog;
  });

  test('Notifications component re-renders when the length of the notifications prop changes', () => {
    const { rerender } = render(<Notifications notifications={mockNotifications} displayDrawer={true} />);
    const newNotifications = [
      ...mockNotifications,
      { id: 4, type: 'default', value: 'New announcement' }
    ];
    rerender(<Notifications notifications={newNotifications} displayDrawer={true} />);
    expect(screen.getByText(/New announcement/i)).toBeInTheDocument();
  });

  test('Clicking on "Your notifications" calls handleDisplayDrawer', () => {
    const handleDisplayDrawer = jest.fn();
    render(
      <Notifications
        notifications={mockNotifications}
        displayDrawer={false}
        handleDisplayDrawer={handleDisplayDrawer}
      />
    );
    fireEvent.click(screen.getByText(/your notifications/i));
    expect(handleDisplayDrawer).toHaveBeenCalled();
  });

  test('Clicking on close button calls handleHideDrawer', () => {
    const handleHideDrawer = jest.fn();
    render(
      <Notifications
        notifications={mockNotifications}
        displayDrawer={true}
        handleHideDrawer={handleHideDrawer}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: /close/i }));
    expect(handleHideDrawer).toHaveBeenCalled();
  });
});


