import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import closebtn from '../assets/close-button.png';
import NotificationItem from './NotificationItem';

class Notifications extends Component {
    static defaultProps = {
        notifications: [],
        displayDrawer: false,
    };

    markAsRead = (id) => {
        console.log(`Notification ${id} has been marked as read`);
    };

    shouldComponentUpdate(nextProps) {
        if (nextProps.notifications.length !== this.props.notifications.length)
            return true;
        return false;
    }

    render() {
        const { notifications = [], displayDrawer = false } = this.props;

        return (
            <>
                    <div className={css(styles.notificationsTitle)}>
                        <p>Your notifications</p>
                    </div>
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
                                    <ul className={css(styles.ul)}>
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

const bounce = {
    '0%': { transform: 'translateY(0px)' },
    '25%': { transform: 'translateY(-5px)' },
    '50%': { transform: 'translateY(5px)' },
    '75%': { transform: 'translateY(-2px)' },
    '100%': { transform: 'translateY(0px)' },
}

const fadeIn = {
    '0%': { opacity: 0.5 },
    '100%': { opacity: 1 },
}

const styles = StyleSheet.create({
    fadeInEffect: {
        animationName: {
            '0%': { opacity: 0.5 },
            '100%': { opacity: 1 },
        },
        animationDuration: '1s',
        animationTimingFunction: 'ease-in-out',
    },
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
            top: '0',
            left: '0',
            bottom: '0',
            minWidth: '100svw',
            height: '100vh',
            margin: '0',
            boxSizing: 'border-box',
            zIndex: 3000,
            overflowY: 'auto',
            fontSize: '20px',
            backgroundColor: 'white',
        },
    },
    notificationsTitle: {
        textAlign: 'end',
        marginRight: '10px',
        position: 'fixed',
        top: '0px',
        right: '10px',
        zIndex: 1000,
        animationName: [bounce, fadeIn],
        animationDuration: '1s',
        animationIterationCount: 'infinite',
        animationTimingFunction: 'ease-in-out',
    },
    notificationsTopContent: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
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
    ul: {
        '@media (max-width: 900px)': {
            listStyleType: 'none',
            margin: '0',
            padding: '0',
        }
    }
});

export default Notifications;
