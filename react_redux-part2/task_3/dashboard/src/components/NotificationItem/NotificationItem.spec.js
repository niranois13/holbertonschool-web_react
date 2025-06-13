
import { render, screen, fireEvent } from '@testing-library/react';
import NotificationItem from './NotificationItem';
import * as notificationsSlice from '../../features/notifications/notificationsSlice';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { markNotificationAsRead } from '../../features/notifications/notificationsSlice';

const mockStore = configureStore([]);

describe('NotificationItem Component', () => {
  const store = mockStore([]);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with default type and value', () => {
    render(
      <Provider store={store}>
      <NotificationItem id={1} type="default" value="New course available" />
      </Provider>
    );

    const listItem = screen.getByText(/new course available/i);
    expect(listItem).toBeInTheDocument();
    expect(listItem).toHaveClass('default');
  });

  it('renders with urgent type and value', () => {
    render(
      <Provider store={store}>
      <NotificationItem id={2} type="urgent" value="Server is down" />
      </Provider>
    );

    const listItem = screen.getByText(/server is down/i);
    expect(listItem).toBeInTheDocument();
    expect(listItem).toHaveClass('urgent');
  });

  it('dispatches markNotificationAsRead on click', () => {
    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
      <NotificationItem id={3} type="default" value="Assignment due" />
      </Provider>
    );

    const item = screen.getByText(/assignment due/i);
    fireEvent.click(item);

    expect(store.dispatch).toHaveBeenCalledWith(
      notificationsSlice.markNotificationAsRead(3)
    );
  });

  it('does not crash with empty value', () => {
    render(
      <Provider store={store}>
      <NotificationItem id={4} type="default" value="" />
      </Provider>
    );
    const listItem = screen.getByRole('listitem');
    expect(listItem).toBeInTheDocument();
  });
});

describe('NotificationItem Integration Test', () => {
  it('dispatches correct action with redux store on click', () => {
    const store = mockStore({});

    render(
      <Provider store={store}>
        <NotificationItem id={10} type="urgent" value="Check the logs!" />
      </Provider>
    );

    const item = screen.getByText(/check the logs!/i);
    fireEvent.click(item);

    const actions = store.getActions();
    expect(actions).toContainEqual(markNotificationAsRead(10));
  });
});