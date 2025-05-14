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
        return nextProps.notifications.length !== this.props.notifications.length;
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
    notificationsTitle: {
        textAlign: 'end',
        marginRight: '10px',
    },
    notificationsTopContent: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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
});

export default Notifications;
