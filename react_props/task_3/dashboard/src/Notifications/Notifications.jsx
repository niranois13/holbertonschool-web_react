import './Notifications.css'
import closebtn from '../assets/close-button.png'
import NotificationItem from './NotificationItem';

export default function Notifications({ notifications }) {
    return (
        <>
            <div className="notifications">
                <p>
                    Here is the list of notifications
                </p>
                <button
                    style={{
                        position: "absolute",
                        display: "flex",
                        background: "none",
                        borderStyle: "none",
                        right: "1rem",
                        top: "0.8rem",
                        width: "0.5rem",
                        height: "0.5rem",
                    }}
                    onClick={() => console.log('Close button has been clicked')} aria-label="Close">
                    <img
                        style={{
                            width: "0.5rem",
                            height: "0.5rem",
                        }}
                        src={closebtn} alt='CLose' />
                </button>
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
        </>
    );
}