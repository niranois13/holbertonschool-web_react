import { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { markNotificationAsRead } from '../../features/notifications/notificationsSlice';
import { useRef, useEffect } from 'react';
import { createSelector } from 'reselect';


const selectNotificationByIdCache = {};

function getSelectNotificationById(id) {
    if (!selectNotificationByIdCache[id]) {
        selectNotificationByIdCache[id] = createSelector(
            (state) => state.notifications.notifications,
            (notifications) => notifications.find((notif) => notif.id === id)
        );
    }
    return selectNotificationByIdCache[id];
}

const NotificationItem = memo(function NotificationItem({ id }) {
    const dispatch = useDispatch();

    const renderCountRef = useRef(0);
    useEffect(() => {
        renderCountRef.current += 1;

        console.groupCollapsed(`🔄 NotificationItem Render #${renderCountRef.current}`);
        console.log('Props - id:', id);
        console.log('Notification:', notification);
        console.groupEnd();
    });

    const selectNotification = getSelectNotificationById(id);
    const notification = useSelector(selectNotification);
    if (!notification)
        return null;

    const { type, value, html } = notification;

    const handleClick = () => {
        dispatch(markNotificationAsRead(id));
    };

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
