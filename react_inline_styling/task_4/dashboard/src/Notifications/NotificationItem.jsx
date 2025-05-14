import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';

class NotificationItem extends PureComponent {
    render() {
        const { type, value, html, markAsRead } = this.props;

        const liClass = type === 'urgent' ? styles.urgent : styles.default;

        return (
            <li
                className={css(styles.item, liClass)}
                data-notification-type={type}
                dangerouslySetInnerHTML={type === 'urgent' && html !== undefined ? html : undefined}
                onClick={markAsRead}
            >
                {type === 'urgent' && html !== undefined ? null : value}
            </li>
        );
    }
}

NotificationItem.propTypes = {
    type: PropTypes.string.isRequired,
    value: PropTypes.string,
    html: PropTypes.shape({ __html: PropTypes.string }),
    markAsRead: PropTypes.func
};

NotificationItem.defaultProps = {
    type: 'default',
    markAsRead: () => { }
};

const baseItemStyle = {
    width: '100%',
    fontSize: '20px',
    padding: '10px 8px',
    borderBottom: '1px solid black',
};

const styles = StyleSheet.create({
    item: {
        ...baseItemStyle,
    },
    default: {
        color: 'blue',
    },
    urgent: {
        color: 'red',
    },
});

export default NotificationItem;
