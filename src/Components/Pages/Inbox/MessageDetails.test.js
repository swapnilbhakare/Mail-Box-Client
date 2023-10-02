import React from "react";
import { render, screen } from "@testing-library/react";
import MessageDetail from "./MessageDetail";

// Test cases for MessageDetail Component
describe("MessageDetail Component", () => {
  test("Renders a read message", () => {
    // Create a sample read email
    const selectedEmail = {
      id: "1",
      data: {
        subject: "Test Subject",
        sender: "Test Sender",
        date: "2023-10-02",
        message: "This is a read email.",
      },
    };

    render(<MessageDetail selectedEmail={selectedEmail} />);

    // Ensure the subject, sender, and message content are displayed with normal text
    expect(screen.getByText("Test Subject")).toHaveStyle("font-weight: normal");
    expect(screen.getByText("Test Sender")).toHaveStyle("font-weight: normal");
    expect(screen.getByText("This is a read email.")).toHaveStyle(
      "font-weight: normal"
    );
  });

  test("Renders an unread message", () => {
    // Create a sample unread email
    const selectedEmail = {
      id: "2",
      data: {
        subject: "Test Subject",
        sender: "Test Sender",
        date: "2023-10-02",
        message: "This is an unread email.",
        read: false,
      },
    };

    render(<MessageDetail selectedEmail={selectedEmail} />);

    // Ensure the subject, sender, and message content are displayed with bolder text
    expect(screen.getByText("Test Subject")).toHaveStyle("font-weight: bolder");
    expect(screen.getByText("Test Sender")).toHaveStyle("font-weight: bolder");
    expect(screen.getByText("This is an unread email.")).toHaveStyle(
      "font-weight: bolder"
    );
  });

  test('Renders "Email not found"', () => {
    render(<MessageDetail selectedEmail={null} />);

    // Ensure the "Email not found" message is displayed
    expect(screen.getByText("Email not found.")).toBeInTheDocument();
  });
});
