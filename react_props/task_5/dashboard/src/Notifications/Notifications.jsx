import './Notifications.css'
import closebtn from '../assets/close-button.png'
import NotificationItem from './NotificationItem';

export default function Notifications({ notifications, displayDrawer = false }) {
    return (
        <>
            <div className='notifications-title'>
                <p>Your notifications</p>
            </div>
            {displayDrawer && (
                <div className="notifications">
                    {notifications.length > 0 ? (
                        <>
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
                        </>
                    ) : (
                        <p>No new notification for now</p>
                    )}
                </div>
            )}
        </>
    );
}