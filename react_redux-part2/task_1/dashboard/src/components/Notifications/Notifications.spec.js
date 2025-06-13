import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store"; 
import Notifications from "./Notifications";
import axios from "axios";

jest.mock("axios");

const mockStore = configureMockStore([]);

describe("Notifications component", () => {
  let store;

  beforeEach(() => {
    axios.get.mockResolvedValue({
      data: {
        notifications: [
          { id: 1, type: "default", value: "New course available" },
          { id: 2, type: "urgent", value: "New resume available" }
        ]
      }
    });

    store = mockStore({
      notifications: {
        notifications: [],
      },
    });

    store.dispatch = jest.fn();
  });

  test('renders "Your notifications" text', () => {
    render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    );
    expect(screen.getByText("Your notifications")).toBeInTheDocument();
  });

  test("clicking on 'Your notifications' toggles drawer open", async () => {
    render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    );

    const trigger = screen.getByText("Your notifications");
    fireEvent.click(trigger);

    const drawer = document.querySelector(".Notifications");
    expect(drawer.classList.contains("visible")).toBe(false);
  });
});