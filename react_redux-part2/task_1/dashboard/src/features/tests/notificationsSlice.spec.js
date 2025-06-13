import notificationsReducer,
{
  markNotificationAsRead,
  fetchNotifications,
} from '../notifications/notificationsSlice';

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { configureStore } from '@reduxjs/toolkit';


jest.mock('../../utils/utils', () => ({
  getLatestNotification: jest.fn(() => '<strong>Urgent requirement</strong> - complete by EOD'),
}));

const ENDPOINTS = {
  notifications: 'http://localhost:5173/notifications.json',
};

const mockData = [
  { id: 1, value: 'New course available', type: 'default' },
  { id: 3, value: 'Old value', type: 'urgent' },
];

let mock;

beforeEach(() => {
  mock = new MockAdapter(axios);
  jest.spyOn(console, 'error').mockImplementation(() => {});
})

afterEach(() => {
  mock.restore();
  console.error.mockRestore();
})

describe('notificationsSlice', () => {
  const initialState = {
    notifications: [],
    loading: false,
  }

  it('should return the initial state by default', () => {
    expect(notificationsReducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it('should not remove any notification if ID does not exist', () => {
    const previousState = {
      notifications: mockData,
    };
    const newState = notificationsReducer(
      previousState,
      markNotificationAsRead(999)
    );
    expect(newState.notifications).toEqual(previousState.notifications);
  });

  it('should log markNotificationsAsRead in the console', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => { });
    notificationsReducer(initialState, markNotificationAsRead(1));
    expect(consoleSpy).toHaveBeenCalledWith('Notification 1 has been marked as read');
    consoleSpy.mockRestore();
  });
})

describe('notificationsSlice with axios-mock-adapter', () => {
  it('should not crash if fetchNotifications fails (rejected)', async () => {
    mock.onGet(ENDPOINTS.notifications).reply(500);

    const store = configureStore({ reducer: { notifications: notificationsReducer } });
    await store.dispatch(fetchNotifications());

    const state = store.getState().notifications;
    expect(state.notifications).toEqual([]);
  });

  it('should remove the notification with given id when markNotificationAsRead is dispatched', () => {
    const previousState = {
      notifications: [
        { id: 1, value: 'notif 1' },
        { id: 2, value: 'notif 2' },
        { id: 3, value: 'notif 3' },
      ],
    };

    const newState = notificationsReducer(previousState, markNotificationAsRead(2));
    expect(newState.notifications).toHaveLength(2);
    expect(newState.notifications.find((n) => n.id === 2)).toBeUndefined();
  });
});
