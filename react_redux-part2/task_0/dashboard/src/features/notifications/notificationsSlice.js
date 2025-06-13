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
  async () => {
    try {
      const response = await axios.get(ENDPOINTS.notifications);
      const currentNotifications = response.data.notifications;

      const latestNotif = {
        id: 3,
        type: "urgent",
        html: { __html: getLatestNotification() },
      };

      const indexToReplace = currentNotifications.findIndex(
        (notification) => notification.id === 3
      );

      const updatedNotifications = [...currentNotifications];

      if (indexToReplace !== -1) {
        updatedNotifications[indexToReplace] = latestNotif;
      } else {
        updatedNotifications.push(latestNotif);
      }

      return updatedNotifications;
    } catch (error) {
      console.error("Error fetching notifications:", error);
      throw error;
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
