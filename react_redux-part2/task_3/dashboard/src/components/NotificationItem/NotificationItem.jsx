import { memo } from 'react';
import { useDispatch } from 'react-redux';
import { markNotificationAsRead } from '../../features/notifications/notificationsSlice';

const NotificationItem = memo(function NotificationItem({ id, type, value }) {
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(markNotificationAsRead(id));
    };

    const textColor = type === 'urgent' ? 'red' : 'blue';

    return (
        <li
            style={{ color: textColor }}
            data-notification-type={type}
            onClick={handleClick}
        >
            {value}
        </li>
    );
});

export default NotificationItem;
