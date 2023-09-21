import React from "react";

import { render, screen } from "@testing-library/react";

import userEvent from "@testing-library/user-event";

import { Provider } from "react-redux";

import configureStore from "redux-mock-store";

import Inbox from "./Inbox";

import { fetchEmails } from "../../../Store/emails-slice";

// Mock Redux store

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

    // Mock the fetchEmails action

    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <Inbox />
      </Provider>
    );
  });

  it("renders the Inbox component", () => {
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
    const sender = screen.getByText("John Doe");

    const subject = screen.getByText("Hello");

    const date = screen.getByText("2023-09-06");

    expect(sender).toBeInTheDocument();

    expect(subject).toBeInTheDocument();

    expect(date).toBeInTheDocument();
  });

  it("calls fetchEmails action on component mount", () => {

    // Assert that the fetchEmails action is called with the expected argument
  
    expect(store.dispatch).toHaveBeenCalled(fetchEmails("user@example.com"));
  
  });

  it("performs an action when an email is clicked", () => {
    const emailItem = screen.getByText("John Doe");

    userEvent.click(emailItem);

    // Add your assertion for the action here
  });
});
