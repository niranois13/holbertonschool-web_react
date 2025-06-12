import { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { markNotificationAsRead } from '../../features/notifications/notificationsSlice';

const NotificationItem = memo(function NotificationItem({ id }) {
    const dispatch = useDispatch();
    const notification = useSelector((state) =>
        state.notifications.notifications.find((notif) => notif.id === id)
    );
    if(!notification)
        return null;

    const { type, value, html } = notification;

    const handleClick = () => {
        dispatch(markNotificationAsRead(id));
    };

    console.log(
        `Rendering NotificationItem with id: ${id}, type: ${type}, value: ${value}`
    );
    if (type === 'default') {
        return (
            <li
                style={{ color: "blue" }}
                data-notification-type={type}
                onClick={handleClick}
            >
                {value}
            </li>
        );
    }

    if (type === 'urgent' && html !== undefined) {
        return (
            <li
                style={{ color: "red" }}
                data-notification-type={type}
                dangerouslySetInnerHTML={html}
                onClick={handleClick}
            />
        );
    }

    return (
        <li
            style={{ color: "red" }}
            data-notification-type={type}
            onClick={handleClick}
        >
            {value}
        </li>
    );
});

export default NotificationItem;
