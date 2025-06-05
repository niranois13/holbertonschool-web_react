import notificationsReducer,
{ showDrawer,
  hideDrawer,
  markNotificationAsRead,
  fetchNotifications
} from '../notifications/notificationsSlice';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { configureStore } from '@reduxjs/toolkit';


jest.mock('../../utils/utils', () => ({
  getLatestNotification: jest.fn(() => '<strong>Urgent requirement</strong> - complete by EOD'),
}));

describe('notificationsSlice', () => {
  const initialState = {
    notifications: [],
    displayDrawer: true,
  }

  it('should return the initial state by default', () => {
    expect(notificationsReducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it('should handle showDrawer action', () => {
    const state = notificationsReducer(
      { ...initialState, displayDrawer: false },
      showDrawer(),
    );
    expect(state.displayDrawer).toBe(true);
  });

  it('should handle hideDrawer action', () => {
    const state = notificationsReducer(
      { ...initialState, displayDrawer: true },
      hideDrawer(),
    );
    expect(state.displayDrawer).toBe(false);
  });

  it('should log markNotificationsAsRead in the console', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    notificationsReducer(initialState, markNotificationAsRead({ id: 1 }));
    expect(consoleSpy).toHaveBeenCalledWith('Notification 1 has been marked as read');
    consoleSpy.mockRestore();
  });
})

describe('notificationsSlice with axios-mock-adapter', () => {
  const mockData = [
      { id: 1, value: 'New course available', type: 'default' },
      { id: 3, value: 'Old value', type: 'urgent' },
    ];

  const mock = new MockAdapter(axios);

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
