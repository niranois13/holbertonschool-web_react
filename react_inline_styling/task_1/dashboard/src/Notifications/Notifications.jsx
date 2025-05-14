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
                                <ul>
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
        border: '2px dashed #e1484c',
        padding: '5px',
        margin: '10px',
        width: '400px',
        fontFamily: 'sans-serif',
    },
    notificationsTitle: {
        textAlign: 'end',
        marginRight: '10px',
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
    'notifications li[data-priority="default"]': {
        color: 'blue',
    },
    'notifications li[data-priority="urgent"]': {
        color: 'red',
    },
});

export default Notifications;
