import notificationsReducer,
{ showDrawer,
  hideDrawer,
  markNotificationAsRead,
  fetchNotifications,
} from '../notifications/notificationsSlice';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { configureStore } from '@reduxjs/toolkit';

const ENDPOINTS = {
  notifications: 'http://localhost:5173/notifications.json',
};

const mockData = [
    { id: 1, value: 'New course available', type: 'default' },
    { id: 3, value: 'Old value', type: 'urgent' },
  ];

jest.mock('../../utils/utils', () => ({
  getLatestNotification: jest.fn(() => '<strong>Urgent requirement</strong> - complete by EOD'),
}));

let mock;

beforeEach(() => {
  mock = new MockAdapter(axios);
})

afterEach(() => {
  mock.restore();
})

describe('notificationsSlice', () => {
  const initialState = {
    notifications: [],
    displayDrawer: true,
  }

  it('should return the initial state by default', () => {
    expect(notificationsReducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it('should not modify notifications when showDrawer is called', () => {
    const previousState = {
      notifications: [{ id: 1, value: 'notif 1' }],
      displayDrawer: false,
    };
    const newState = notificationsReducer(previousState, showDrawer());
    expect(newState.notifications).toEqual(previousState.notifications);
  });

  it('should not modify notifications when hideDrawer is called', () => {
    const previousState = {
      notifications: [{ id: 1, value: 'notif 1' }],
      displayDrawer: true,
    };
    const newState = notificationsReducer(previousState, hideDrawer());
    expect(newState.notifications).toEqual(previousState.notifications);
  });

  it('should not remove any notification if ID does not exist', () => {
    const previousState = {
      notifications: [
        { id: 1, value: 'notif 1' },
        { id: 2, value: 'notif 2' },
      ],
      displayDrawer: true,
    };
    const newState = notificationsReducer(
      previousState,
      markNotificationAsRead(999)
    );
    expect(newState.notifications).toHaveLength(2);
  });

  it('should set notifications to an empty array if API returns no data', async () => {
    mock.onGet(ENDPOINTS.notifications).reply(200, []);

    const store = configureStore({ reducer: { notifications: notificationsReducer } });
    await store.dispatch(fetchNotifications());

    const state = store.getState().notifications;
    expect(state.notifications).toEqual([]);
  });

  it('should handle showDrawer action', () => {
    const state = notificationsReducer(
      { ...initialState, displayDrawer: false },
      showDrawer(),
    );
    expect(state.displayDrawer).toBe(true);
  });

  it('should not crash if fetchNotifications fails (rejected)', async () => {
    mock.onGet(ENDPOINTS.notifications).reply(500);

    const store = configureStore({ reducer: { notifications: notificationsReducer } });
    await store.dispatch(fetchNotifications());

    const state = store.getState().notifications;
    expect(state.notifications).toEqual([]);
  });

  it('should handle hideDrawer action', () => {
    const state = notificationsReducer(
      { ...initialState, displayDrawer: true },
      hideDrawer(),
    );
    expect(state.displayDrawer).toBe(false);
  });

  it('should return a new state object (not mutate previous state)', () => {
    const prevState = {
      notifications: [{ id: 1, value: 'notif 1' }],
      displayDrawer: false,
    };
    const newState = notificationsReducer(prevState, showDrawer());
    expect(newState).not.toBe(prevState);
  });

  it('should log markNotificationsAsRead in the console', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    notificationsReducer(initialState, markNotificationAsRead({ id: 1 }));
    expect(consoleSpy).toHaveBeenCalledWith('Notification 1 has been marked as read');
    consoleSpy.mockRestore();
  });
})

describe('notificationsSlice with axios-mock-adapter', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        notifications: notificationsReducer,
      },
    });
  });

  afterEach(() => {
    mock.reset();
  });

  it('should fetch notifications and update the state correctly', async () => {
    mock.onGet('http://localhost:5173/notifications.json').reply(200, mockData);

    await store.dispatch(fetchNotifications());

    const state = store.getState().notifications;

    expect(state.notifications.length).toBe(2);
    expect(state.notifications.find(n => n.id === 3).value).toBe('<strong>Urgent requirement</strong> - complete by EOD');
  });
});
