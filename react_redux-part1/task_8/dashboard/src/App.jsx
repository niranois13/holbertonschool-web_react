import { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from './features/auth/authSlice';
import { fetchCourses } from './features/courses/coursesSlice';
import Notifications from './components/Notifications/Notifications';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Login from './pages/Login/Login';
import CourseList from './pages/CourseList/CourseList';
import BodySectionWithMarginBottom from './components/BodySectionWithMarginBottom/BodySectionWithMarginBottom';
import BodySection from './components/BodySection/BodySection';
import {
    fetchNotifications,
    markNotificationAsRead,
    hideDrawer,
    showDrawer,
} from './features/notifications/notificationsSlice';

export default function App() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const courses = useSelector((state) => state.courses.courses);
    const notifications = useSelector((state) => state.notifications.notifications);
    const displayDrawer = useSelector((state) => state.notifications.displayDrawer);

    useEffect(() => {
        dispatch(fetchNotifications());
    }, [dispatch]);

    useEffect(() => {
        if (isLoggedIn) {
            dispatch(fetchCourses());
        }
    }, [isLoggedIn, dispatch]);

    const handleDisplayDrawer = useCallback(() => {
        dispatch(showDrawer());
    }, [dispatch]);

    const handleHideDrawer = useCallback(() => {
        dispatch(hideDrawer());
    }, [dispatch]);

    const logIn = (email, password) => {
        dispatch(login({ email, password }));
    };

    const logOut = () => {
        dispatch(logout());
    };

    return (
        <>
            <Notifications
                notifications={notifications}
                handleHideDrawer={handleHideDrawer}
                handleDisplayDrawer={handleDisplayDrawer}
                displayDrawer={displayDrawer}
                markNotificationAsRead={
                    (id) => dispatch(markNotificationAsRead(id))
                }
            />
            <>
                <Header user={user} logOut={logOut} />
                {!isLoggedIn ? (
                    <BodySectionWithMarginBottom title='Log in to continue'>
                        <Login login={logIn} />
                    </BodySectionWithMarginBottom>
                ) : (
                    <BodySectionWithMarginBottom title='Course list'>
                        <CourseList courses={courses} />
                    </BodySectionWithMarginBottom>
                )}
                <BodySection title="News from the School">
                    <p>Holberton School news goes here</p>
                </BodySection>
            </>
            <Footer user={user} />
        </>
    );
}
