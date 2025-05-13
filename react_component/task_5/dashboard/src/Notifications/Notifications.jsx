import React, { Component } from 'react';
import closeIcon from '../assets/close-icon.png';
import NotificationItem from './NotificationItem';
import './Notifications.css';

class Notifications extends Component {

  shouldComponentUpdate(nextProps) {

    if (nextProps.notifications.length !== this.props.notifications.length) return true;
    return false;
  }

  markAsRead = (id) => {
    console.log(`Notification ${id} has been marked as read`);
  };

  render() {
    const { notifications = [], displayDrawer = true } = this.props;

    return (
      <>
        <div className="notification-title">Your notifications</div>
        {
          displayDrawer ? (
            <div className='Notifications'>
              {notifications.length > 0 ? (
                <>
                  <p>Here is the list of notifications</p>
                  <button
                    onClick={() => console.log('Close button has been clicked')}
                    aria-label='Close'
                  >
                    <img src={closeIcon} alt='close icon' />
                  </button>
                  <ul>
                    {notifications.map((notification) => (
                      <NotificationItem
                        key={notification.id}
                        type={notification.type}
                        value={notification.value}
                        html={notification.html}
                        markAsRead={() => this.markAsRead(notification.id)}
                      />
                    ))}
                  </ul>
                </>
              ) : (
                <p>No new notification for now</p>
              )}
            </div>
          ) : null
        }
      </>
    );
  }
}

export default Notifications;