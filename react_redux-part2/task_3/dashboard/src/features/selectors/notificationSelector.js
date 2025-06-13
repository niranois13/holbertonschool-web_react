import { createSelector } from '@reduxjs/toolkit';

const selectNotifications = (state) => state.notifications.notifications;

export const getFilteredNotifications = createSelector(
  [selectNotifications, (_, filter) => filter],
  (notifications, filter) => {
    const unreadNotifications = notifications.filter(n => !n.isRead);
    if (filter === "all") return unreadNotifications;
    return unreadNotifications.filter(n => n.type === filter);
  }
);