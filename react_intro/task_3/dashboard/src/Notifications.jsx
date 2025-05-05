import React from 'react';
import closeIcon from './assets/close-icon.png';
import { getLatestNotification } from './utils'; 

export default function Notifications() {
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
                <img
                    src={closeIcon}
                    alt="close icon"
                    style={{ width: '10px', height: '10px' }}
                />

            </button>

            <p>Here is the list of notifications</p>

            <ul>
                <li data-priority="default">New course available</li>
                <li data-priority="urgent">New resume available</li>
                <li
                    data-priority="urgent"
                    dangerouslySetInnerHTML={
                        { __html: getLatestNotification() }
                    }
                ></li>
            </ul>
        </div>
    );
}
