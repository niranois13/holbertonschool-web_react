import './Notifications.css'
import closebtn from '../assets/close-button.png'
import NotificationItem from './NotificationItem';
import React from 'react';

export default function Notifications({ notifications = [], displayDrawer = false }) {
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
                                        type={notification.type}
                                        value={notification.value}
                                        html={notification.html} />
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