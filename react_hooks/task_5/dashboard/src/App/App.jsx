import React, { useState, useCallback, useEffect } from 'react';
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
import newContext from '../Context/context';

const LoginWithLogging = WithLogging(Login);
const CourseListWithLogging = WithLogging(CourseList);
const ContextProvider = newContext.Provider;

const App = () => {
    const [user, setUser] = useState({
        email: '',
        password: '',
        isLoggedIn: false,
    });

    const [notifications, setNotifications] = useState([]);
    const [courses, setCourses] = useState([]);
    const [displayDrawer, setDisplayDrawer] = useState(false);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const { data } = await axios.get('/notifications.json');
                const updated = data.map((notif, idx) =>
                    idx === data.length - 1 && notif.html
                        ? { ...notif, html: { __html: getLatestNotification() } }
                        : notif
                );

                setNotifications(updated);
            } catch (err) {
                console.error('Failed to load notifications:', err);
            }
        };

        fetchNotifications();
    }, []);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const { data } = await axios.get('/courses.json');
                setCourses(data);
            } catch (err) {
                console.error('Failed to load courses:', err);
            }
        };

        fetchCourses();
    }, [user]);

    const logIn = useCallback((email, password) => {
        setUser({ email, password, isLoggedIn: true });
    }, []);

    const logOut = useCallback(() => {
        setUser({ email: '', password: '', isLoggedIn: false });
    }, []);

    const markNotificationAsRead = useCallback((id) => {
        console.log(`Notification ${id} has been marked as read`);
        setNotifications((prev) => prev.filter((notif) => notif.id !== id));
    }, []);

    const handleDisplayDrawer = useCallback(() => setDisplayDrawer(true), []);
    const handleHideDrawer = useCallback(() => setDisplayDrawer(false), []);

    const contextValue = {
        user,
        logOut,
        logIn,
        markNotificationAsRead,
    };

    return (
        <ContextProvider value={contextValue}>
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

                <Header />

                <div className={css(styles.appBody)}>
                    {user.isLoggedIn ? (
                        <BodySectionWithMarginBottom title="Course list">
                            <CourseListWithLogging courses={courses} />
                        </BodySectionWithMarginBottom>
                    ) : (
                        <BodySectionWithMarginBottom title="Log in to continue">
                            <LoginWithLogging
                                logIn={logIn}
                                email={user.email}
                                password={user.password}
                            />
                        </BodySectionWithMarginBottom>
                    )}

                    <BodySection title="News from the School">
                        <p>Holberton School News goes here</p>
                    </BodySection>
                </div>

                <Footer />
            </div>
        </ContextProvider>
    );
};

const hbtnRed = '#e1003c';

const styles = StyleSheet.create({
    body: {
        margin: 0,
        padding: 0,
    },
    footer: {
        margin: 0,
        padding: 0,
    },
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
    appFooter: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderTop: `3px solid ${hbtnRed}`,
        height: '2dvh',
        fontStyle: 'italic',
        fontSize: '0.9rem',
    },
});

export default App;
