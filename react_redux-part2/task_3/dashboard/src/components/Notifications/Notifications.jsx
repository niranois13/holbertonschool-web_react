import { memo, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import closeIcon from "../../assets/close-icon.png";
import NotificationItem from "../NotificationItem/NotificationItem";
import {
  fetchNotifications,
  markNotificationAsRead,
} from "../../features/notifications/notificationsSlice";
import { getFilteredNotifications } from "../../features/selectors/notificationSelector";
import "./Notifications.css";

const Notifications = memo(function Notifications() {
  const dispatch = useDispatch();
  const drawerRef = useRef(null);

  const [currentFilter, setCurrentFilter] = useState("all");

  const filteredNotifications = useSelector((state) =>
    getFilteredNotifications(state, currentFilter)
  );

  const loading = useSelector((state) => state.notifications.loading);

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  const handleToggleDrawer = () => {
    drawerRef.current.classList.toggle("visible");
  };

  const handleMarkAsRead = (id) => dispatch(markNotificationAsRead(id));

  const handleSetFilterUrgent = () => setCurrentFilter("urgent");
  const handleSetFilterDefault = () => setCurrentFilter("default");
  const handleSetFilterAll = () => setCurrentFilter("all");

  console.log("Notifications render");

  return (
    <>
      <div onClick={handleToggleDrawer} style={{ cursor: "pointer" }}>
        Your notifications
      </div>
      <div className="Notifications visible" ref={drawerRef}>
        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "10px" }}>
          <button onClick={handleSetFilterAll}>📬 All</button>
          <button onClick={handleSetFilterUrgent}>‼️ Urgent</button>
          <button onClick={handleSetFilterDefault}>📄 Default</button>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : filteredNotifications.length > 0 ? (
          <>
            <p>Here is the list of notifications</p>
            <button onClick={handleToggleDrawer} aria-label="Close">
              <img src={closeIcon} alt="close icon" />
            </button>
            <ul>
              {filteredNotifications.map((notification) => (
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
