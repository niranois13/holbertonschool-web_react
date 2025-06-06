import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getLatestNotification } from '../../utils/utils';
import axios from 'axios';


const initialState = {
  notifications: [],
  displayDrawer: true,
};

const API_BASE_URL = 'http://localhost:5173';
const ENDPOINTS = {
    notifications: `${API_BASE_URL}/notifications.json`,
};

export const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async(_, thunkAPI) => {
    try {
      const response = await axios.get(ENDPOINTS.notifications);
      const data = response.data;

      const updatedNotifications = [];
      const latestValue = getLatestNotification();
      let foundLatest = false;

      for (const notif of data) {
        if (notif.id === 3) {
          foundLatest = true;
          if (notif.value !== latestValue) {
            updatedNotifications.push({ ...notif, value: latestValue });
            continue;
          }
        }
        updatedNotifications.push(notif);
      }

      if (!foundLatest) {
        updatedNotifications.push({
          id: 3,
          type: 'default',
          value: latestValue,
        });
      }

      return updatedNotifications;
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to fetch notifications');
    }
  }
)

export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    markNotificationAsRead: (state, action) => {
      const id = action.payload || null;

      if (typeof id !== 'number')
        return;

      state.notifications = state.notifications.filter(
        (notification) => notification.id !== id
      );

      console.log(`Notification ${id} has been marked as read`);
    },
    hideDrawer: (state) => {
      state.displayDrawer = false;
    },
    showDrawer: (state) => {
      state.displayDrawer = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchNotifications.fulfilled, (state, action) =>{
      state.notifications = action.payload;
    });
  }
});

export const {
  markNotificationAsRead,
  hideDrawer,
  showDrawer,
} = notificationsSlice.actions;

export default notificationsSlice.reducer;
