import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import store from "../../../Store/store"; // Import your Redux store
import Sent from "./Sent"; // Your Sent component

test("Test Case 1: Renders the component and displays loading message", () => {
  render(
    <Provider store={store}>
      <Sent />
    </Provider>
  );

  // Ensure the loading message is displayed
  const loadingMessage = screen.getByText("Loading emails...");
  expect(loadingMessage).toBeInTheDocument();
});

test("Test Case 2: Renders the component with sent emails", () => {
  const mockSentEmails = [
    {
      id: "1",
      data: {
        sender: "your-email@example.com",
        to: "recipient@example.com",
        subject: "Test Email 1",
        date: "2023-10-05T10:30:00Z",
      },
    },
    {
      id: "2",
      data: {
        sender: "your-email@example.com",
        to: "another-recipient@example.com",
        subject: "Test Email 2",
        date: "2023-10-06T14:45:00Z",
      },
    },
  ];

  render(
    <Provider store={store}>
      <Sent />
    </Provider>
  );

  // Check if sent emails are displayed
  const email1 = screen.getByText("Test Email 1");
  const email2 = screen.getByText("Test Email 2");
  expect(email1).toBeInTheDocument();
  expect(email2).toBeInTheDocument();
});

test("Test Case 3: Clicking on a sent email navigates to the email detail page", () => {
  const mockSentEmail = {
    id: "1",
    data: {
      sender: "your-email@example.com",
      to: "recipient@example.com",
      subject: "Test Email 1",
      date: "2023-10-05T10:30:00Z",
    },
  };

  render(
    <Provider store={store}>
      <Sent />
    </Provider>
  );

  // Click on a sent email
  const emailLink = screen.getByText("Test Email 1");
  fireEvent.click(emailLink);

  // Ensure that it navigates to the email detail page (you might need to modify this based on your routing)
  const emailDetailHeader = screen.getByText("Email Detail");
  expect(emailDetailHeader).toBeInTheDocument();
});
