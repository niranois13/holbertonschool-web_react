import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Notifications from "./Notifications";
import * as notificationsSlice from "../../features/notifications/notificationsSlice";
import * as selectors from "../../features/selectors/notificationSelector";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

const mockStore = configureStore([]);

describe("Notifications Component", () => {
  let store;

  const sampleNotifications = [
    { id: 1, type: "default", value: "Default notif", isRead: "false" },
    { id: 2, type: "urgent", value: "Urgent notif", isRead: "false" },
  ];

  beforeEach(() => {
    store = mockStore({
      notifications: {
        notifications: sampleNotifications,
        loading: false,
      },
    });

    // Mock the selector to just filter the notifications based on the filter argument
    jest.spyOn(selectors, "getFilteredNotifications").mockImplementation(
      (state, filter) => {
        if (filter === "all") return sampleNotifications;
        return sampleNotifications.filter((n) => n.type === filter);
      }
    );

    // Mock fetchNotifications thunk action creator to a dummy action
    jest.spyOn(notificationsSlice, "fetchNotifications").mockReturnValue({
      type: "notifications/fetchNotifications",
    });

    // Mock markNotificationAsRead action creator
    jest.spyOn(notificationsSlice, "markNotificationAsRead").mockImplementation(
      (id) => ({
        type: "notifications/markNotificationAsRead",
        payload: id,
      })
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("dispatches fetchNotifications on mount and renders all notifications by default", () => {
    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    );

    expect(store.dispatch).toHaveBeenCalledWith(
      notificationsSlice.fetchNotifications()
    );

    expect(screen.getByText(/your notifications/i)).toBeInTheDocument();

    // Notifications drawer is visible by default with buttons and notifications list
    expect(screen.getByText("‼️ Urgent")).toBeInTheDocument();
    expect(screen.getByText("📄 Default")).toBeInTheDocument();

    expect(screen.getByText(/here is the list of notifications/i)).toBeInTheDocument();

    // Both notifications should be rendered
    expect(screen.getByText("Default notif")).toBeInTheDocument();
    expect(screen.getByText("Urgent notif")).toBeInTheDocument();
  });

  it("shows loading state when loading is true", () => {
    store = mockStore({
      notifications: {
        notifications: [],
        loading: true,
      },
    });

    jest.spyOn(selectors, "getFilteredNotifications").mockReturnValue([]);

    render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("filters notifications when clicking filter buttons", async () => {
    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    );

    expect(screen.getByText("Default notif")).toBeInTheDocument();
    expect(screen.getByText("Urgent notif")).toBeInTheDocument();

    // Click urgent filter button
    fireEvent.click(screen.getByText("‼️ Urgent"));
    await waitFor(() => {
      expect(screen.queryByText("Default notif")).not.toBeInTheDocument();
      expect(screen.getByText("Urgent notif")).toBeInTheDocument();
    });

    // Click default filter button
    fireEvent.click(screen.getByText("📄 Default"));
    await waitFor(() => {
      expect(screen.getByText("Default notif")).toBeInTheDocument();
      expect(screen.queryByText("Urgent notif")).not.toBeInTheDocument();
    });

    // Click default again to show all
    fireEvent.click(screen.getByText("📄 Default"));
    await waitFor(() => {
      expect(screen.getByText("Default notif")).toBeInTheDocument();
      expect(screen.getByText("Urgent notif")).toBeInTheDocument();
    });

    // Click urgent again to filter
    fireEvent.click(screen.getByText("‼️ Urgent"));
    await waitFor(() => {
      expect(screen.queryByText("Default notif")).not.toBeInTheDocument();
      expect(screen.getByText("Urgent notif")).toBeInTheDocument();
    });

    // Click urgent again to show all
    fireEvent.click(screen.getByText("‼️ Urgent"));
    await waitFor(() => {
      expect(screen.getByText("Default notif")).toBeInTheDocument();
      expect(screen.getByText("Urgent notif")).toBeInTheDocument();
    });
  });


  it("dispatches markNotificationAsRead when clicking a notification item", () => {
    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    );

    // Click the first notification item
    const notif = screen.getByText("Default notif");
    fireEvent.click(notif);

    expect(store.dispatch).toHaveBeenCalledWith(
      notificationsSlice.markNotificationAsRead(1)
    );
  });

  it("toggles the drawer visibility on clicking the 'Your notifications' header and close button", () => {
    const { container } = render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    );

    const drawer = container.querySelector(".Notifications");
    const toggleHeader = screen.getByText(/your notifications/i);
    const closeButton = screen.getByRole("button", { name: /close/i });

    // Drawer should initially have "visible" class
    console.log('Drawer className:', drawer.className);
    expect(drawer.classList.contains("visible")).toBe(true);

    // Click header to toggle drawer
    fireEvent.click(toggleHeader);
    expect(drawer.classList.contains("visible")).toBe(false);

    // Click header again to toggle drawer back visible
    fireEvent.click(toggleHeader);
    expect(drawer.classList.contains("visible")).toBe(true);

    // Click close button to toggle drawer off
    fireEvent.click(closeButton);
    expect(drawer.classList.contains("visible")).toBe(false);
  });
});
