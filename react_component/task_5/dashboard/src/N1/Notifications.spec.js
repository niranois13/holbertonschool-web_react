import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Notifications from './Notifications';
import { getLatestNotification } from '../utils/utils'


describe('Notifications component', () => {

  test('renders the notifications title', () => {
    const props = {
      notifications: [
        { id:1, type:'default', value:'New course available' },
        { id:2, type:'urgent', value:'New resume available' },
        { id:3, type:'urgent', html:{ __html: getLatestNotification()} }
      ],
      displayDrawer: true
    }
    render(<Notifications {...props} />);
    const titleElement = screen.getByText(/Here is the list of notifications/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('renders the close button', () => {
    const props = {
      notifications: [
        { id:1, type:'default', value:'New course available' },
        { id:2, type:'urgent', value:'New resume available' },
        { id:3, type:'urgent', html:{ __html: getLatestNotification()} }
      ],
      displayDrawer: true
    }
    render(<Notifications {...props} />);
    const buttonElement = screen.getByRole('button', { name: /close/i });
    expect(buttonElement).toBeInTheDocument();
  });

  test('renders three notifications', () => {
    const props = {
      notifications: [
        { id:1, type:'default', value:'New course available' },
        { id:2, type:'urgent', value:'New resume available' },
        { id:3, type:'urgent', html:{ __html: getLatestNotification()} }
      ],
      displayDrawer: true
    }
    render(<Notifications {...props} />);
    const listItemElements = screen.getAllByRole('listitem');
    expect(listItemElements).toHaveLength(3);
  });

  test('logs message when close button is clicked', () => {
    console.log = jest.fn();
    const props = {
      notifications: [
        { id:1, type:'default', value:'New course available' },
        { id:2, type:'urgent', value:'New resume available' },
        { id:3, type:'urgent', html:{ __html: getLatestNotification()} }
      ],
      displayDrawer: true
    }
    render(<Notifications {...props} />);
    const buttonElement = screen.getByRole('button', { name: /close/i });
    fireEvent.click(buttonElement);
    expect(console.log).toHaveBeenCalledWith('Close button has been clicked');
  });

  test('should display the 3 notification items with their given text', () => {
    const props = {
      notifications: [
        { id: 1, type: 'default', value: 'New course available' },
        { id: 2, type: 'urgent', value: 'New resume available' },
        { id: 3, type: 'urgent', html: { __html: getLatestNotification() } }
      ],
      displayDrawer: true
    };

    render(<Notifications {...props} />);
    expect(screen.getByText('New course available')).toBeInTheDocument();
    expect(screen.getByText('New resume available')).toBeInTheDocument();
    expect(screen.getByText(/Urgent requirement/)).toBeInTheDocument();
  });

  test('should display the text No new notification for now when Notifications list is empty', () => {
    const props = {
      notifications: [],
      displayDrawer: true
    };

    render(<Notifications {...props} />);
    expect(screen.getByText('No new notification for now')).toBeInTheDocument();
  });


  test('it should rerender when prop values change', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    const initialProps = {
      displayDrawer: false,
      notifications: [],
    };

    render(<Notifications {...initialProps} />);

    expect(screen.queryByText('Here is the list of notifications')).toBeNull();

    const updatedProps = {
      displayDrawer: true,
      notifications: [
        { id: 1, type: 'default', value: 'New notification' }
      ],
    };

    render(<Notifications {...updatedProps} />);
    const firstListItemElement = screen.getAllByRole('listitem')[0];

    fireEvent.click(firstListItemElement)

    expect(consoleSpy).toHaveBeenCalledWith('Notification 1 has been marked as read')

    expect(screen.getByText('Here is the list of notifications')).toBeInTheDocument();
    expect(screen.getByRole('listitem')).toBeInTheDocument()
  });

  test('Notifications does not re-render if the notifications prop length stays the same', () => {
    const initialNotifications = [
      { id: 1, type: 'default', value: 'New course available' },
      { id: 2, type: 'urgent', value: 'New resume available' }
    ];

    const { rerender } = render(<Notifications notifications={initialNotifications} />);

    rerender(<Notifications notifications={initialNotifications} />);

    expect(screen.getByText('Here is the list of notifications')).toBeInTheDocument();
  });

  test('Notifications re-renders when the notifications prop length changes', () => {
    const initialNotifications = [
      { id: 1, type: 'default', value: 'New course available' }
    ];

    const newNotifications = [
      { id: 1, type: 'default', value: 'New course available' },
      { id: 2, type: 'urgent', value: 'New resume available' }
    ];

    const { rerender } = render(<Notifications notifications={initialNotifications} />);

    rerender(<Notifications notifications={newNotifications} />);

    expect(screen.getByText('New resume available')).toBeInTheDocument();
  });

});
