import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';

class NotificationItem extends PureComponent {
    render() {
        const { type, value, html, markAsRead } = this.props;

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

const styles = StyleSheet.create({
    default: {
        color: 'blue',
    },
    urgent: {
        color: 'red',
    },
});

export default NotificationItem;
