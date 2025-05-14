import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import closebtn from '../assets/close-button.png';
import NotificationItem from './NotificationItem';
import { keyframes } from 'aphrodite';

const opacityChange = keyframes({
    '0%': { opacity: 0.5 },
    '100%': { opacity: 1 },
});

const bounce = keyframes({
    '0%': { transform: 'translateY(0px)' },
    '25%': { transform: 'translateY(-5px)' },
    '75%': { transform: 'translateY(5px)' },
    '100%': { transform: 'translateY(0px)' },
});


class Notifications extends Component {
    static defaultProps = {
        notifications: [],
        displayDrawer: false,
    };

    markAsRead = (id) => {
        console.log(`Notification ${id} has been marked as read`);
    };

    shouldComponentUpdate(nextProps) {
        return nextProps.notifications.length !== this.props.notifications.length;
    }

    render() {
        const { notifications = [], displayDrawer = false } = this.props;

        return (
            <>
                {!displayDrawer && (
                    <div className={css(styles.menuItem)}>
                        Your notifications
                    </div>
                )}
                {displayDrawer && (
                    <div className={css(styles.notifications)}>
                        {notifications.length > 0 ? (
                            <>
                                <div className={css(styles.notificationsTopContent)}>
                                    <p>Here is the list of notifications</p>
                                    <button
                                        onClick={() => console.log('Close button has been clicked')}
                                        aria-label="Close"
                                        className={css(styles.closeButton)}
                                    >
                                        <img src={closebtn} alt="Close" className={css(styles.closeButtonImage)} />
                                    </button>
                                </div>
                                <ul className={css(styles.notificationList)}>
                                    {notifications.map((notification) => (
                                        <NotificationItem
                                            key={notification.id}
                                            id={notification.id}
                                            type={notification.type}
                                            value={notification.value}
                                            html={notification.html}
                                            markAsRead={() => this.markAsRead(notification.id)}
                                        />
                                    ))}
                                </ul>
                            </>
                        ) : (
                            <p>No new notification for now</p>
                        )}
                    </div>
                )}
            </>
        );
    }
}

const styles = StyleSheet.create({
    notifications: {
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100vh',
        width: '100vw',
        backgroundColor: 'white',
        zIndex: 9999,
        border: 'none',
        fontFamily: 'sans-serif',
        fontSize: '20px',
        padding: '1rem',
    },
    notificationsTopContent: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    notificationsTitle: {
        textAlign: 'end',
        marginRight: '10px',
    },
    closeButton: {
        background: 'none',
        border: 'none',
        color: 'inherit',
        font: 'inherit',
        cursor: 'pointer',
        outline: 'inherit',
    },
    closeButtonImage: {
        width: '10px',
        height: '10px',
    },
    notificationList: {
        listStyleType: 'none',
        padding: 0,
        margin: 0,
    },
    menuItem: {
        float: 'right',
        backgroundColor: '#fff8f8',
        padding: '10px',
        cursor: 'pointer',
        animationName: [opacityChange, bounce],
        animationDuration: '1s, 0.5s',
        animationIterationCount: '3',
        animationTimingFunction: 'ease-in-out',
        ':hover': {
            animationName: [opacityChange, bounce],
            animationDuration: '1s, 0.5s',
            animationIterationCount: '3',
        },
    },
});

export default Notifications;