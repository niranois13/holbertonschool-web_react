import coursesReducer from '../features/courses/coursesSlice';
import authReducer from '../features/auth/authSlice';
import notificationsReducer from '../features/notifications/notificationsSlice';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    auth: authReducer,
    notifications: notificationsReducer,
    courses: coursesReducer,
  })

export default rootReducer;
