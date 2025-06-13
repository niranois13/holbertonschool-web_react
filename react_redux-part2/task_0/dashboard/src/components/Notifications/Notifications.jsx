import { memo, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import closeIcon from "../../assets/close-icon.png";
import NotificationItem from "../NotificationItem/NotificationItem";
import {
  fetchNotifications,
  markNotificationAsRead,
} from "../../features/notifications/notificationsSlice";
import "./Notifications.css";

const Notifications = memo(function Notifications() {
  const dispatch = useDispatch();
  const notifications = useSelector(
    (state) => state.notifications.notifications
  );

  const drawerRef = useRef(null);

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  const handleToggleDrawer = () => {
    drawerRef.current.classList.toggle("visible");
  };

  const handleMarkAsRead = (id) => dispatch(markNotificationAsRead(id));

  console.log("Notifications render");

  return (
    <>
      <div onClick={handleToggleDrawer} style={{ cursor: "pointer" }}>
        Your notifications
      </div>
      <div className="Notifications visible" ref={drawerRef}>
        {notifications.length > 0 ? (
          <>
            <p>Here is the list of notifications</p>
            <button onClick={handleToggleDrawer} aria-label="Close">
              <img src={closeIcon} alt="close icon" />
            </button>
            <ul>
              {notifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  id={notification.id}
                  type={notification.type}
                  value={notification.value}
                  html={notification.html}
                  markAsRead={() => handleMarkAsRead(notification.id)}
                />
              ))}
            </ul>
          </>
        ) : (
          <p>No new notifications for now</p>
        )}
      </div>
    </>
  );
});

export default Notifications;