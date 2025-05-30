import React, { useCallback } from 'react';
import { StyleSheet, css } from 'aphrodite';
import closebtn from '../assets/close-button.png';
import NotificationItem from './NotificationItem';

const Notifications = React.memo(function Notifications({
    notifications = [],
    displayDrawer = false,
    handleDisplayDrawer = () => { },
    handleHideDrawer = () => { },
    markNotificationAsRead = () => { },
}) {
    const renderNotificationsList = useCallback(() => {
        if (notifications.length === 0) {
            return <p>No new notification for now</p>;
        }

        return (
            <>
                <div className={css(styles.notificationsTopContent)}>
                    <p>Here is the list of notifications</p>
                    <button
                        onClick={handleHideDrawer}
                        aria-label="Close"
                        id="close-btn"
                        className={css(styles.closeButton)}
                    >
                        <img
                            src={closebtn}
                            alt="Close"
                            className={css(styles.closeButtonImage)}
                        />
                    </button>
                </div>
                <ul className={css(styles.ul)}>
                    {notifications.map((notif) => (
                        <NotificationItem
                            key={notif.id}
                            {...notif}
                            markAsRead={() => markNotificationAsRead(notif.id)}
                        />
                    ))}
                </ul>
            </>
        );
    }, [notifications, handleHideDrawer, markNotificationAsRead]);

    return (
        <>
            <div className={css(styles.menuItem)} id="menuItem" onClick={handleDisplayDrawer}>
                <p>Your notifications</p>
            </div>
            {displayDrawer && (
                <div className={css(styles.notifications)}>
                    {renderNotificationsList()}
                </div>
            )}
        </>
    );
},
    (prevProps, nextProps) => {
        // Only re-render if props actually change
        return (
            prevProps.displayDrawer === nextProps.displayDrawer &&
            prevProps.notifications.length === nextProps.notifications.length &&
            prevProps.notifications.every((notif, index) =>
                notif.id === nextProps.notifications[index].id &&
                notif.type === nextProps.notifications[index].type &&
                notif.value === nextProps.notifications[index].value
            )
        );
    });

const bounce = {
    '0%': { transform: 'translateY(0px)' },
    '25%': { transform: 'translateY(-5px)' },
    '50%': { transform: 'translateY(5px)' },
    '75%': { transform: 'translateY(-2px)' },
    '100%': { transform: 'translateY(0px)' },
};

const fadeIn = {
    '0%': { opacity: 0.5 },
    '100%': { opacity: 1 },
};

const styles = StyleSheet.create({
    notifications: {
        border: '2px dashed #e1484c',
        padding: '5px',
        margin: '10px',
        width: '400px',
        fontFamily: 'sans-serif',
        position: 'fixed',
        top: '25px',
        right: '5px',
        zIndex: 1000,
        '@media (max-width: 900px)': {
            border: 'none',
            position: 'fixed',
            top: 0,
            left: 0,
            bottom: 0,
            minWidth: '100svw',
            height: '100vh',
            margin: 0,
            boxSizing: 'border-box',
            zIndex: 3000,
            overflowY: 'auto',
            fontSize: '20px',
            backgroundColor: 'white',
        },
    },
    menuItem: {
        textAlign: 'end',
        marginRight: '10px',
        position: 'fixed',
        top: 0,
        right: '10px',
        zIndex: 1000,
        cursor: 'pointer',
        ':hover': {
            animationName: [bounce, fadeIn],
            animationDuration: '1s',
            animationIterationCount: 'infinite',
            animationTimingFunction: 'ease-in-out',
        }
    },
    notificationsTopContent: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    closeButton: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
    },
    closeButtonImage: {
        width: '10px',
        height: '10px',
    },
    ul: {
        '@media (max-width: 900px)': {
            listStyleType: 'none',
            margin: 0,
            padding: 0,
        },
    },
});

export default Notifications;
