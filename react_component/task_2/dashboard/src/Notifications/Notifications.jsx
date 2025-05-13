import './Notifications.css'
import closebtn from '../assets/close-button.png'
import NotificationItem from './NotificationItem';
import React, { Component } from 'react';

class Notifications extends Component {
    static defaultProps = {
        notifications: [],
        displayDrawer: false,
    };

    markAsRead = (id) => {
        console.log(`Notification ${id} has been marked as read`);
    };

    render() {
        const { notifications, displayDrawer } = this.props;

    return (
        <>
            <div className='notifications-title'>
                <p>Your notifications</p>
            </div>
            {displayDrawer && (
                <div className="notifications">
                    {notifications.length > 0 ? (
                        <>
                        <div className="notifications-topContent">
                            <p>Here is the list of notifications</p>
                            <button
                                onClick={() => console.log('Close button has been clicked')} aria-label="Close">
                                <img src={closebtn} alt='Close' />
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
                                        markAsRead={this.markAsRead} />
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
}};

export default Notifications;