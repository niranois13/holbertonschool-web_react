import './Notifications.css'
import closebtn from '../assets/close-button.png'
import NotificationItem from './NotificationItem';
import React from 'react';

export default function Notifications({ notifications = [], displayDrawer = false }) {
    return (
        <React.Fragment>
            <div className='notifications-title'>
                <p>Your notifications</p>
            </div>
            {displayDrawer && (
                <div className="notifications">
                    {notifications.length > 0 ? (
                        <React.Fragment>
                            <p>Here is the list of notifications</p>
                            <button
                                onClick={() => console.log('Close button has been clicked')} aria-label="Close">
                                <img src={closebtn} alt='Close' />
                            </button>
                            <ul>
                                {notifications.map((notification) => (
                                    <NotificationItem
                                        key={notification.id}
                                        type={notification.type}
                                        value={notification.value}
                                        html={notification.html} />
                                ))}
                            </ul>
                        </React.Fragment>
                    ) : (
                        <p>No new notification for now</p>
                    )}
                </div>
            )}
        </React.Fragment>
    );
}