import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';

const NotificationItem = ({ type, value, html, markAsRead }) => {
    const liClass = type === 'urgent' ? styles.urgent : styles.default;

    return (
        <li
            className={css(liClass)}
            data-notification-type={type}
            dangerouslySetInnerHTML={type === 'urgent' && html !== undefined ? html : undefined}
            onClick={markAsRead}
        >
            {type === 'urgent' && html !== undefined ? null : value}
        </li>
    );
};

const MemoizedNotificationItem = React.memo(NotificationItem);

MemoizedNotificationItem.propTypes = {
    type: PropTypes.string.isRequired,
    value: PropTypes.string,
    html: PropTypes.shape({ __html: PropTypes.string }),
    markAsRead: PropTypes.func
};

MemoizedNotificationItem.defaultProps = {
    type: 'default',
    markAsRead: () => { }
};

const styles = StyleSheet.create({
    default: {
        color: 'blue',
        '@media (max-width: 900px)': {
            width: '100%',
            borderBottom: '2px solid black',
            padding: '10px 8px',
        },
    },
    urgent: {
        color: 'red',
        '@media (max-width: 900px)': {
            width: '100%',
            borderBottom: '2px solid black',
            padding: '10px 8px',
        },
    },
});

export default MemoizedNotificationItem;
