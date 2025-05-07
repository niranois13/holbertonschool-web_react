import React from 'react';
import './Notifications.css';
import closeIcon from '../assets/close-button.png';
import NotificationItem from './NotificationItem';

export default function Notifications({ notifications }) {
    const handleClick = () => {
        console.log('Close button has been clicked');
    };

    return (
        <div className="notifications">
            <button
                aria-label="Close"
                onClick={handleClick}
                style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer'
                }}
            >
                <img src={closeIcon} alt="close icon" style={{ width: '10px', height: '10px' }} />
            </button>

            <p>Here is the list of notifications</p>

            <ul>
                {notifications.map((notification) => (
                    <NotificationItem
                        key={notification.id}
                        type={notification.type}
                        value={notification.value}
                        html={notification.html}
                    />
                ))}
            </ul>
        </div>
    );
}
