import coursesReducer from '../features/courses/coursesSlice';
import authReducer from '../features/auth/authSlice';
import notificationsReducer from '../features/notifications/notificationsSlice';
import { combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers(
  {
    courses: coursesReducer,
    auth: authReducer,
    notifications: notificationsReducer
  }
)

export default rootReducer;
