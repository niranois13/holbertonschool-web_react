import React, { useReducer, useCallback, useEffect } from 'react';
import axios from 'axios';
import { StyleSheet, css } from 'aphrodite';
import Notifications from '../Notifications/Notifications';
import Header from '../Header/Header';
import Login from '../Login/Login';
import Footer from '../Footer/Footer';
import CourseList from '../CourseList/CourseList';
import { getLatestNotification } from '../utils/utils';
import BodySection from '../BodySection/BodySection';
import BodySectionWithMarginBottom from '../BodySection/BodySectionWithMarginBottom';
import WithLogging from '../HOC/WithLogging';
import { APP_ACTIONS, appReducer, initialState } from './appReducer';

const LoginWithLogging = WithLogging(Login);
const CourseListWithLogging = WithLogging(CourseList);

const App = () => {
    const [state, dispatch] = useReducer(appReducer, initialState);
    const { user, notifications, courses, displayDrawer } = state;

    useEffect(() => {
        async function fetchNotifications() {
            try {
                const { data } = await axios.get('/notifications.json');
                const updatedNotifications = data.map((notif, idx) =>
                    idx === data.length - 1 && notif.html
                        ? { ...notif, html: { __html: getLatestNotification() } }
                        : notif
                );

                dispatch({
                    type: APP_ACTIONS.SET_NOTIFICATIONS,
                    payload: { notifications: updatedNotifications },
                });
            } catch (err) {
                console.error('Failed to load notifications:', err);
            }
        }
        fetchNotifications();
    }, []);

    useEffect(() => {
        async function fetchCourses() {
            try {
                const { data } = await axios.get('/courses.json');
                dispatch({ type: APP_ACTIONS.SET_COURSES, payload: { courses: data } });
            } catch (err) {
                console.error('Failed to load courses:', err);
            }
        }
        fetchCourses();
    }, [user.isLoggedIn]); // refetch when login status changes

    const logIn = useCallback((email, password) => {
        dispatch({
            type: APP_ACTIONS.LOGIN,
            payload: { email, password },
        });
    }, []);

    const logOut = useCallback(() => {
        dispatch({ type: APP_ACTIONS.LOGOUT });
    }, []);

    const markNotificationAsRead = useCallback((id) => {
        console.log(`Notification ${id} has been marked as read`);
        dispatch({ type: APP_ACTIONS.MARK_NOTIFICATION_READ, payload: { id } });
    }, []);

    const handleDisplayDrawer = useCallback(() => {
        dispatch({ type: APP_ACTIONS.TOGGLE_DRAWER });
    }, []);

    const handleHideDrawer = useCallback(() => {
        dispatch({ type: APP_ACTIONS.TOGGLE_DRAWER });
    }, []);

    return (
        <div className={css(styles.app)}>
            <div className={css(styles.rootNotifications)}>
                <Notifications
                    notifications={notifications}
                    displayDrawer={displayDrawer}
                    handleDisplayDrawer={handleDisplayDrawer}
                    handleHideDrawer={handleHideDrawer}
                    markNotificationAsRead={markNotificationAsRead}
                />
            </div>

            <Header user={user} logOut={logOut} />

            <div className={css(styles.appBody)}>
                {user.isLoggedIn ? (
                    <BodySectionWithMarginBottom title="Course list">
                        <CourseListWithLogging courses={courses} />
                    </BodySectionWithMarginBottom>
                ) : (
                    <BodySectionWithMarginBottom title="Log in to continue">
                        <LoginWithLogging logIn={logIn} email={user.email} password={user.password} />
                    </BodySectionWithMarginBottom>
                )}

                <BodySection title="News from the School">
                    <p>Holberton School News goes here</p>
                </BodySection>
            </div>

            <Footer user={user} />
        </div>
    );
};

const styles = StyleSheet.create({
    app: {
        height: '100%',
        margin: 0,
        padding: 0,
        fontFamily: 'sans-serif',
    },
    rootNotifications: {
        position: 'fixed',
        top: '10px',
        right: '10px',
        zIndex: 1000,
        maxWidth: '500px',
    },
    appBody: {
        maxHeight: '75vh',
    },
});

export default App;
