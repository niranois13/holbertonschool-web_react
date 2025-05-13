import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class NotificationItem extends PureComponent {
    handleClick = () => {
        const { id, markAsRead } = this.props;
        if (markAsRead && typeof markAsRead === 'function') {
            markAsRead(id);
        }
    };

    render() {
        const { type, value, html } = this.props;
        const style = { color: type === 'urgent' ? 'red' : 'blue' };

        if (html) {
            return (
                <li
                    data-notification-type={type}
                    style={style}
                    dangerouslySetInnerHTML={html}
                    onClick={this.handleClick}
                ></li>
            );
        }

        return (
            <li
                data-notification-type={type}
                style={style}
                onClick={this.handleClick}
            >
                {value}
            </li>
        );
    }
}

NotificationItem.propTypes = {
    id: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    value: PropTypes.string,
    html: PropTypes.shape({
        __html: PropTypes.string,
    }),
    markAsRead: PropTypes.func,
};

NotificationItem.defaultProps = {
    type: 'default',
    markAsRead: () => { },
};

export default NotificationItem;