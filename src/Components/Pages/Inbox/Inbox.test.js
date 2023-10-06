import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Inbox from "./Inbox";
import { fetchEmails, deleteEmail } from "../../../Store/emails-slice";
import axios from "axios";

const mockStore = configureStore([]);

describe("Inbox Component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      emails: {
        emails: [
          {
            id: "1",
            data: {
              sender: "John Doe",
              subject: "Hello",
              date: "2023-09-06",
              read: true,
            },
          },
          // Add more mock emails as needed
        ],
        loading: false,
        error: null,
      },
      authentication: {
        userId: "user@example.com",
      },
    });

    // Mock the axios.get function
    axios.get = jest.fn(() =>
      Promise.resolve({
        status: 200,
        data: {},
      })
    );
  });

  it("renders the Inbox component", () => {
    render(
      <Provider store={store}>
        <Inbox />
      </Provider>
    );

    const heading = screen.getByText("Inbox");
    expect(heading).toBeInTheDocument();
  });

  it("displays loading message when loading emails", () => {
    store = mockStore({
      emails: {
        emails: [],
        loading: true,
        error: null,
      },
      authentication: {
        userId: "user@example.com",
      },
    });

    render(
      <Provider store={store}>
        <Inbox />
      </Provider>
    );

    const loadingMessage = screen.getByText("Loading emails");
    expect(loadingMessage).toBeInTheDocument();
  });

  it("displays email details", () => {
    render(
      <Provider store={store}>
        <Inbox />
      </Provider>
    );

    const sender = screen.getByText("John Doe");
    const subject = screen.getByText("Hello");
    const date = screen.getByText("2023-09-06");

    expect(sender).toBeInTheDocument();
    expect(subject).toBeInTheDocument();
    expect(date).toBeInTheDocument();
  });

  it("calls fetchEmails action on component mount", () => {
    render(
      <Provider store={store}>
        <Inbox />
      </Provider>
    );

    expect(axios.get).toHaveBeenCalledWith(
      "https://mail-box-client-f5058-default-rtdb.firebaseio.com/emails/user@example.com.json"
    );
  });

  it("performs an action when an email is clicked", () => {
    render(
      <Provider store={store}>
        <Inbox />
      </Provider>
    );

    const emailItem = screen.getByText("John Doe");
    fireEvent.click(emailItem);
  });

  it("Redux state is updated after email deletion", () => {
    store = mockStore({
      emails: {
        emails: [
          {
            id: 1,
            data: {
              sender: "sender1",
              subject: "Subject 1",
              date: "2023-10-01",
              read: false,
            },
          },
          {
            id: 2,
            data: {
              sender: "sender2",
              subject: "Subject 2",
              date: "2023-10-02",
              read: false,
            },
          },
        ],
        loading: false,
        error: null,
        selectedEmail: null,
        unreadEmailCount: 2,
      },
      authentication: {
        userId: "user123",
      },
    });

    render(
      <Provider store={store}>
        <Inbox />
      </Provider>
    );

    const deleteButton = screen.getByText("Delete");
    fireEvent.click(deleteButton);

    const actions = store.getActions();
    expect(actions).toContainEqual(
      deleteEmail(1, store.getState().emails.emails)
    );
  });
});
