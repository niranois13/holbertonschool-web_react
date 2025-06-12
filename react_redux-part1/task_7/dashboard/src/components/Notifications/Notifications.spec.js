import { render, screen, fireEvent } from '@testing-library/react';
import { getLatestNotification } from '../../utils/utils'
import Notifications from './Notifications';
import { StyleSheetTestUtils } from "aphrodite";
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../../features/auth/authSlice';
import coursesReducer from '../../features/courses/coursesSlice';
import notificationsReducer from '../../features/notifications/notificationsSlice';
import axios from 'axios';

jest.mock('axios');

beforeEach(() => {
  axios.get.mockResolvedValue({
    data: {
      notifications: [
        { id: 1, type: 'default', value: 'Mock notification 1' },
        { id: 2, type: 'urgent', value: 'Mock notification 2' },
      ],
    },
  });
  StyleSheetTestUtils.suppressStyleInjection();
});


afterEach(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

const preloadedState = {
  auth: {
    user: {
      email: 'test@testing.tst',
      password: '12345678'
    },
    isLoggedIn: true
  },
  notifications: {
    notifications: [
      {
        id: 1,
        type: 'default',
        value: 'New course available'
      },
      {
        id: 2,
        type: 'urgent',
        value: 'New resume available'
      },
      {
        id: 3,
        type: 'urgent',
        html: {
          __html: '<strong>Urgent requirement</strong> - complete by EOD'
        }
      }
    ],
    displayDrawer: true
  },
  courses: {
    courses: [
      {
        id: 1, name: 'ES6', credit: 60
      },
      {
        id: 2, name: 'Webpack', credit: 20
      },
      {
        id: 3, name: 'React', credit: 40
      }
    ]
  }
}

function renderWithProvider(ui, preloadedState = {}) {
  const store = configureStore({
    reducer: {
      auth: authReducer,
      courses: coursesReducer,
      notifications: notificationsReducer,
    },
    preloadedState,
  });

  const renderResult = render(<Provider store={store}>{ui}</Provider>);

  return { store, ...renderResult };
}

test('Should display a title, button and a 3 list items, whenever the "displayDrawer" set to true', () => {
  renderWithProvider(<Notifications />, preloadedState);
  const notificationsTitle = screen.getByText('Here is the list of notifications');
  const notificationsButton = screen.getByRole('button');
  const notificationsListItems = screen.getAllByRole('listitem');
  expect(notificationsTitle).toBeInTheDocument();
  expect(notificationsButton).toBeInTheDocument();
  expect(notificationsListItems).toHaveLength(3);
});

test('Should display 3 notification items as expected', () => {
  renderWithProvider(<Notifications />, preloadedState);
  const notificationsFirstItem = screen.getByText('New course available');
  const notificationsSecondItem = screen.getByText('New resume available');
  const notificationsListItems = screen.getAllByRole('listitem');
  expect(notificationsFirstItem).toBeInTheDocument();
  expect(notificationsSecondItem).toBeInTheDocument();
  const reactPropsKey = Object.keys(notificationsListItems[2]).find(key => /^__reactProps/.test(key));
  if (reactPropsKey) {
    const dangerouslySetInnerHTML = notificationsListItems[2][reactPropsKey].dangerouslySetInnerHTML.__html;
    expect(dangerouslySetInnerHTML).toContain('<strong>Urgent requirement</strong>');
    expect(dangerouslySetInnerHTML).toContain(' - complete by EOD');
  } else {
    throw new Error('No property found matching the regex');
  }
});

test('Should display the correct notification colors', () => {
  renderWithProvider(<Notifications />, preloadedState);
  const notificationsListItems = screen.getAllByRole('listitem');
  const colorStyleArr = [];
  for (let i = 0; i <= notificationsListItems.length - 1; i++) {
    const styleProp = Object.keys(notificationsListItems[i]).find(key => /^__reactProps/.test(key));
    if (styleProp) {
      colorStyleArr.push(notificationsListItems[i].style._values.color);
    }
  }
  expect(colorStyleArr).toEqual(['blue', 'red', 'red']);
});

test('Should render the 3 given notifications text, whenever the "displayDrawer" set to true', () => {
  renderWithProvider(<Notifications />, preloadedState)
  expect(screen.getByText('New course available')).toBeInTheDocument();
  expect(screen.getByText('New resume available')).toBeInTheDocument();
  expect(screen.getByText(/complete by EOD/)).toBeInTheDocument();
})

test('Should not display a title, button and a 3 list items, whenever the "displayDrawer" set to false', () => {
  const hideDrawerState = {
    ...preloadedState,
    notifications: {
      notifications: [
        { id: 1, type: 'default', value: 'New course available' },
        { id: 2, type: 'urgent', value: 'New resume available' },
        { id: 3, type: 'urgent', html: { __html: getLatestNotification() } }
      ],
      displayDrawer: false
    }
  }
  renderWithProvider(<Notifications />, hideDrawerState);
  const notificationsTitle = screen.queryByText('Here is the list of notifications');
  const notificationsButton = screen.queryByRole('button');
  const notificationsListItems = screen.queryAllByRole('listitem');
  expect(notificationsTitle).toBeNull();
  expect(notificationsButton).toBeNull();
  expect(notificationsListItems).toHaveLength(0);
});

test('Should display a paragraph of "No new notification for now" whenever the listNotification prop is empty', () => {
  const emptyNotificationsState = {
    ...preloadedState,
    notifications: {
      notifications: [],
      displayDrawer: true,
    }
  }
  renderWithProvider(<Notifications />, emptyNotificationsState);
  const notificationsTitle = screen.getByText(/no new notifications for now/i);
  expect(notificationsTitle).toBeInTheDocument();
});

test('Should return true if the Notifications component is a functional component', () => {
  expect(typeof Notifications.type).toBe('function');
  expect(Notifications.$$typeof.toString()).toBe('Symbol(react.memo)');
  expect(Notifications.type.prototype?.isReactComponent).toBeUndefined();
})

test('Should call the "handleDisplayDrawer" props whenever the "Your notifications" is clicked', () => {
  const { store } = renderWithProvider(<Notifications/>, preloadedState);

  fireEvent.click(screen.getByText(/your notifications/i));

  const state = store.getState();
  expect(state.notifications.displayDrawer).toBe(true);
})

test('Should call the "handleDHideDrawer" props whenever the close button is clicked', () => {
  const { store } = renderWithProvider(<Notifications/>, preloadedState)
  fireEvent.click(screen.getByText(/your notifications/i));
  const closeButton = screen.getByLabelText('Close');
  fireEvent.click(closeButton);
  const state = store.getState();
  expect(state.notifications.displayDrawer).toBe(false);
})

test('Should show the list of notifications whenever the "handleDisplayDrawer" is called', () => {
  const { store } = renderWithProvider(<Notifications/>, preloadedState);
  fireEvent.click(screen.getByText(/your notifications/i));
  const state = store.getState();
  expect(state.notifications.displayDrawer).toBe(true);
  expect(screen.getByText('Here is the list of notifications')).toBeInTheDocument();
});

test('Should hide the list of notifications whenever the "handleHideDrawer" is called', () => {
  const { store } = renderWithProvider(<Notifications/>, preloadedState);
  fireEvent.click(screen.getByText(/your notifications/i));
  const state = store.getState();
  expect(state.notifications.displayDrawer).toBe(true);
  expect(screen.getByText('Here is the list of notifications')).toBeInTheDocument();
  const closeButton = screen.getByLabelText('Close');
  fireEvent.click(closeButton);
  expect(screen.queryByText('Here is the list of notifications')).not.toBeInTheDocument();
});

test.skip('Should rerender when prop values change', () => {
  const markAsReadMock = jest.fn();
  const initialProps = {
    displayDrawer: true,
    notifications: [
      { id: 1, type: 'default', value: 'New notification' },
      { id: 2, type: 'urgent', value: 'Urgent notification' }
    ],
    markNotificationAsRead: markAsReadMock,
  };
  const { rerender } = render(<Notifications {...initialProps} />);
  const listItems = screen.getAllByRole('listitem');
  expect(listItems).toHaveLength(2);
  fireEvent.click(screen.getByText('New notification'));
  expect(markAsReadMock).toHaveBeenCalledWith(1);
  const updatedProps = {
    ...initialProps,
    notifications: [
      { id: 2, type: 'urgent', value: 'Urgent notification' }
    ]
  };
  rerender(<Notifications {...updatedProps} />);
  expect(screen.getAllByRole('listitem')).toHaveLength(1);
});
