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

const mockNotifications = [
  { id: 1, type: 'default', value: 'New course available' },
  { id: 2, type: 'urgent', value: 'New resume available' },
  { id: 3, type: 'urgent', html: { __html: getLatestNotification() } },
];

describe('Notifications', () => {
  it('renders title "Your notifications" always', () => {
    render(<Notifications notifications={mockNotifications} displayDrawer={false} />);
    expect(screen.getByText(/your notifications/i)).toBeInTheDocument();
  });

  describe('When displayDrawer is false', () => {
    it('does not render list or close button', () => {
      render(<Notifications notifications={mockNotifications} displayDrawer={false} />);
      expect(screen.queryByText(/here is the list/i)).not.toBeInTheDocument();
      expect(screen.queryByRole('list')).not.toBeInTheDocument();
      expect(screen.queryAllByRole('listitem')).toHaveLength(0);
      expect(screen.queryByRole('button', { name: /close/i })).not.toBeInTheDocument();
    });

    it('does NOT display "No new notification for now"', () => {
      render(<Notifications notifications={[]} displayDrawer={false} />);
      expect(screen.queryByText(/no new notification for now/i)).not.toBeInTheDocument();
    });
  });

  describe('When displayDrawer is true', () => {
    it('renders list header, items and close button when notifications exist', () => {
      render(<Notifications notifications={mockNotifications} displayDrawer={true} />);
      expect(screen.getByText(/here is the list/i)).toBeInTheDocument();
      expect(screen.getAllByRole('listitem')).toHaveLength(3);
      expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
    });

    it('renders "No new notification for now" when notifications is empty', () => {
      render(<Notifications notifications={[]} displayDrawer={true} />);
      expect(screen.getByText(/no new notification for now/i)).toBeInTheDocument();
    });

    // it('calls console.log when close button is clicked', () => {
    //   const logSpy = jest.spyOn(console, 'log').mockImplementation(() => { });
    //   render(<Notifications notifications={mockNotifications} displayDrawer={true} />);
    //   fireEvent.click(screen.getByRole('button', { name: /close/i }));
    //   expect(logSpy).toHaveBeenCalledWith(expect.stringMatching(/close button has been clicked/i));
    //   logSpy.mockRestore();
    // });
  });

  describe('Edge cases and props', () => {
    it('renders safely with no props', () => {
      render(<Notifications />);
      expect(screen.getByText(/your notifications/i)).toBeInTheDocument();
    });

    it('renders safely when displayDrawer is true but notifications is undefined', () => {
      render(<Notifications displayDrawer={true} />);
      expect(screen.getByText(/no new notification for now/i)).toBeInTheDocument();
    });
  });

  describe('Interactions', () => {
    it.skip('clicking a notification logs markAsRead message', () => {
      const logSpy = jest.spyOn(console, 'log').mockImplementation(() => { });
      render(<Notifications notifications={mockNotifications} displayDrawer={true} />);
      fireEvent.click(screen.getByText(/new course available/i));
      expect(logSpy).toHaveBeenCalledWith(expect.stringMatching(/notification 1 has been marked as read/i));
      logSpy.mockRestore();
    });

    it('clicking a notification calls markNotificationAsRead', () => {
      const mockHandler = jest.fn();
      render(<Notifications notifications={mockNotifications} displayDrawer={true} markNotificationAsRead={mockHandler} />);
      fireEvent.click(screen.getByText(/new course available/i));
      expect(mockHandler).toHaveBeenCalledWith(1);
    });
  });

  describe('Notifications interaction handlers', () => {
    it('calls handleDisplayDrawer when "Your notifications" is clicked', () => {
      const handleDisplayDrawer = jest.fn(() => console.log('handleDisplayDrawer called'));
      render(
        <Notifications
          notifications={mockNotifications}
          handleDisplayDrawer={handleDisplayDrawer}
        />
      );

      const menuItem = document.getElementById('menuItem');
      expect(menuItem).toBeInTheDocument();
      fireEvent.click(menuItem);
      expect(handleDisplayDrawer).toHaveBeenCalledTimes(1);
    });

    it('calls handleHideDrawer when close button is clicked', () => {
      const handleHideDrawer = jest.fn(() => console.log('handleHideDrawer has been called'));
      render(
        <Notifications
          notifications={mockNotifications}
          displayDrawer={true}
          handleHideDrawer={handleHideDrawer}
        />
      );

      const closeBtn = document.getElementById('close-btn');
      expect(closeBtn).toBeInTheDocument();

      fireEvent.click(closeBtn);
      expect(handleHideDrawer).toHaveBeenCalledTimes(1);
    });
  });


  describe('Performance', () => {
    it('does not re-render when notifications length is unchanged', () => {
      const logSpy = jest.spyOn(console, 'log').mockImplementation(() => { });
      const { rerender } = render(<Notifications notifications={mockNotifications} displayDrawer={true} />);
      rerender(<Notifications notifications={mockNotifications} displayDrawer={true} />);
      expect(logSpy).not.toHaveBeenCalled();
      logSpy.mockRestore();
    });

    it('re-renders when notifications length changes', () => {
      const { rerender } = render(<Notifications notifications={mockNotifications} displayDrawer={true} />);
      rerender(<Notifications notifications={[...mockNotifications, { id: 4, type: 'default', value: 'New message' }]} displayDrawer={true} />);
      expect(screen.getByText(/new message/i)).toBeInTheDocument();
    });
  });
});
