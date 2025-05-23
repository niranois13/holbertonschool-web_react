import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import closebtn from '../assets/close-button.png';
import NotificationItem from './NotificationItem';

class Notifications extends Component {
  constructor(props) {
    super(props);
    this.markAsRead = this.markAsRead.bind(this);
  }
  
  shouldComponentUpdate(nextProps) {
    const { notifications, displayDrawer } = this.props;
    return (
      nextProps.notifications.length !== notifications.length ||
      nextProps.displayDrawer !== displayDrawer
    );
  }

  markAsRead = (id) => {
    console.log(`Notification ${id} has been marked as read`);
  };

  render() {
    const {
      notifications,
      displayDrawer,
      handleDisplayDrawer,
      handleHideDrawer,
    } = this.props;

    return (
      <>
        {!displayDrawer && (
          <div className={css(styles.menuItem)} onClick={handleDisplayDrawer}>
            <p className={css(styles.menuText)}>Your notifications</p>
          </div>
        )}

        {displayDrawer && (
          <div className={css(styles.panel)}>
            <button
              className={css(styles.closeBtn)}
              onClick={handleHideDrawer}
              aria-label="Close"
            >
              <img
                src={closebtn}
                alt="Close"
                className={css(styles.closeIcon)}
              />
            </button>

            {notifications.length > 0 ? (
              <>
                <p className={css(styles.panelText)}>Here is the list of notifications</p>
                <ul className={css(styles.ul)}>
                  {notifications.map((notification) => (
                    <NotificationItem
                      key={notification.id}
                      id={notification.id}
                      type={notification.type}
                      value={notification.value}
                      html={notification.html}
                      markAsRead={this.handleMarkAsRead(notification.id)}
                    />
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
}

const bounce = {
  '0%': { transform: 'translateY(0px)' },
  '25%': { transform: 'translateY(-5px)' },
  '50%': { transform: 'translateY(5px)' },
  '75%': { transform: 'translateY(-2px)' },
  '100%': { transform: 'translateY(0px)' },
};

const fadeIn = {
  '0%': { opacity: 0.5 },
  '100%': { opacity: 1 },
};

const styles = StyleSheet.create({
  notifications: {
    border: '2px dashed #e1484c',
    padding: '5px',
    margin: '10px',
    width: '400px',
    fontFamily: 'sans-serif',
    position: 'fixed',
    top: '25px',
    right: '5px',
    zIndex: 1000,
    '@media (max-width: 900px)': {
      border: 'none',
      position: 'fixed',
      top: 0,
      left: 0,
      bottom: 0,
      minWidth: '100svw',
      height: '100vh',
      margin: 0,
      boxSizing: 'border-box',
      zIndex: 3000,
      overflowY: 'auto',
      fontSize: '20px',
      backgroundColor: 'white',
    },
  },
  menuItem: {
    textAlign: 'end',
    marginRight: '10px',
    position: 'fixed',
    top: 0,
    right: '10px',
    zIndex: 1000,
    animationName: [bounce, fadeIn],
    animationDuration: '1s',
    animationIterationCount: 'infinite',
    animationTimingFunction: 'ease-in-out',
    cursor: 'pointer',
  },
  notificationsTopContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  closeButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
  },
  closeButtonImage: {
    width: '10px',
    height: '10px',
  },
  ul: {
    '@media (max-width: 900px)': {
      listStyleType: 'none',
      margin: 0,
      padding: 0,
    },
  },
});

export default Notifications;
