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

      const updatedNotification = data.map((reqNotif) => {
        if (reqNotif.id === 3) {
          const latestValue = getLatestNotification();
          if (reqNotif.value !== latestValue) {
            return { ...reqNotif, value: latestValue };
          }
        }
        return reqNotif;
    });
      return updatedNotification;
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
      const { id } = action.payload || { };

      if (typeof id !== 'number')
        return;

      for (let i = 0; i < state.notifications.length; i++) {
        if (state.notifications[i].id === id) {
          state.notifications.splice(i, 1);
          break;
        }
      }

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
