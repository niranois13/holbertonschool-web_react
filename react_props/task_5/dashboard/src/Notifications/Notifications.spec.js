import { render, screen, fireEvent } from "@testing-library/react";
import Notifications from "./Notifications";
import { getLatestNotification } from "../utils/utils.js";

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
    render(<Notifications notifications={mockNotifications} displayDrawer={true} />);
    const lielements = screen.getAllByRole('listitem');

    expect(lielements.length).toBe(3);
  })

  test('logs message when close button is clicked (case-insensitive, with props)', () => {
    console.log = jest.fn();
    render(<Notifications notifications={mockNotifications} displayDrawer={true} />);
    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);
    expect(console.log).toHaveBeenCalled();
    const loggedMessage = console.log.mock.calls[0][0];
    expect(loggedMessage).toMatch(/close button has been clicked/i);
  });
});

describe('Whenever the prop displayDrawer set to false', () => {
  test('Check that the Notifications component doesn t displays the elements', () => {
    const notifications = [
        { id: 1, type: 'default', value: 'New course available' },
        { id: 2, type: 'urgent', value: 'New resume available' },
        { id: 3, type: 'urgent', html: { __html: getLatestNotification() } },
      ];
    render(<Notifications notifications={notifications} displayDrawer={false} />);

    expect(screen.queryByText("Here is the list of notifications")).not.toBeInTheDocument();
    expect(screen.queryAllByRole('listitem')).toHaveLength(0);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  })
})

describe('Whenever the the prop displayDrawer set to true', () => {
  test('Check that the Notifications component displays the elements', () => {
    const notifications = [
      { id: 1, type: 'default', value: 'New course available' },
      { id: 2, type: 'urgent', value: 'New resume available' },
      { id: 3, type: 'urgent', html: { __html: getLatestNotification() } },
    ];
    render(<Notifications notifications={notifications} displayDrawer={true} />);

    expect(screen.queryByText("Here is the list of notifications")).toBeInTheDocument();
    expect(screen.queryAllByRole('listitem')).toHaveLength(3);
    expect(screen.queryByRole('button')).toBeInTheDocument();
  });

  test('Check that the Notifications component displays the elements', () => {
    const notifications = [];
    render(<Notifications notifications={notifications} displayDrawer={true} />);

    expect(screen.queryByText("No new notification for now")).toBeInTheDocument();
  });
})
