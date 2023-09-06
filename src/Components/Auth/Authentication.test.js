import React from "react";

import { render, fireEvent, waitFor, screen } from "@testing-library/react";

import userEvent from "@testing-library/user-event";
import store from "../../Store/store";
import { Provider } from "react-redux";
import Authentication from "./Authentication";

describe("Authentication Component", () => {
  it("renders login from by default", () => {
    render(
      <Provider store={store}>
        <Authentication />
      </Provider>
    );
    expect(screen.getByText("Log in")).toBeInTheDocument();
  });

it("switches to signup from when 'signup' is clicked",()=>{
  render(
    <Provider store={store}>
      <Authentication />
    </Provider>
  );
  userEvent.click(screen.getByText("Sign Up"))
  expect(screen.getByText("Sign Up")).toBeInTheDocument()
})


it("handles form submission for login with valid credentials", async () => {

  <Provider store={store}>
  <Authentication />
</Provider>

  userEvent.type(screen.getByPlaceholderText("Enter Email"), "test@example.com");

  userEvent.type(screen.getByPlaceholderText("Enter password"), "password123");

userEvent.click(screen.getByText("Log In"));

  await waitFor(() => {

    expect(screen.getByText("User has successfully signed in")).toBeInTheDocument();

  });

});
it("handles form submission for login with invalid password", async () => {
  render(
    <Provider store={store}>
      <Authentication />
    </Provider>
  );

  userEvent.type(screen.getByPlaceholderText("Enter Email"), "test@example.com");

  userEvent.type(screen.getByPlaceholderText("Enter password"), "invalidpassword");

userEvent.click(screen.getByText("Log In"));

  await waitFor(() => {

    expect(screen.getByText("Invalid password.")).toBeInTheDocument();

  });

});
it("handles form submission for login with user not found", async () => {

  render(
    <Provider store={store}>
      <Authentication />
    </Provider>
  );

  userEvent.type(screen.getByPlaceholderText("Enter Email"), "nonexistent@example.com");

  userEvent.type(screen.getByPlaceholderText("Enter password"), "password123");

userEvent.click(screen.getByText("Log In"));

  await waitFor(() => {

    expect(screen.getByText("User not found.")).toBeInTheDocument();

  });

});

it("handles form submission for signup with valid credentials", async () => {

  render(
    <Provider store={store}>
      <Authentication />
    </Provider>
  );

userEvent.click(screen.getByText("Sign Up"));

  userEvent.type(screen.getByPlaceholderText("Enter Email"), "newuser@example.com");

  userEvent.type(screen.getByPlaceholderText("Enter password"), "newpassword123");

  userEvent.type(screen.getByPlaceholderText("Confirm password"), "newpassword123");

userEvent.click(screen.getByText("Sign Up"));

  await waitFor(() => {

    expect(screen.getByText("User has successfully signed up")).toBeInTheDocument();

  });

});
it("handles form submission for signup with mismatched passwords", async () => {

  render(
    <Provider store={store}>
      <Authentication />
    </Provider>
  );

userEvent.click(screen.getByText("Sign Up"));

  userEvent.type(screen.getByPlaceholderText("Enter Email"), "mismatch@example.com");

  userEvent.type(screen.getByPlaceholderText("Enter password"), "password123");

  userEvent.type(screen.getByPlaceholderText("Confirm password"), "differentpassword");

userEvent.click(screen.getByText("Sign Up"));

  await waitFor(() => {

    expect(screen.getByText("Passwords did not match")).toBeInTheDocument();

  });

});

it("handles form submission for signup with an existing user", async () => {

  render(
    <Provider store={store}>
      <Authentication />
    </Provider>
  );

userEvent.click(screen.getByText("Sign Up"));

  userEvent.type(screen.getByPlaceholderText("Enter Email"), "test@example.com");

  userEvent.type(screen.getByPlaceholderText("Enter password"), "password123");

  userEvent.type(screen.getByPlaceholderText("Confirm password"), "password123");

userEvent.click(screen.getByText("Sign Up"));

  await waitFor(() => {

    expect(screen.getByText("User already exists.")).toBeInTheDocument();

  });

});
it("handles form submission with blank email or password", async () => {

  render(
    <Provider store={store}>
      <Authentication />
    </Provider>
  );
  userEvent.type(screen.getByPlaceholderText("Enter Email"), "");

  userEvent.type(screen.getByPlaceholderText("Enter password"), "password123");

userEvent.click(screen.getByText("Log In"));

  await waitFor(() => {

    expect(screen.getByText("Email and password are required.")).toBeInTheDocument();

  });

});


it("navigates to the 'forget' page when 'Forget Password?' is clicked", () => {

  render(
    <Provider store={store}>
      <Authentication />
    </Provider>
  );

userEvent.click(screen.getByText("Forget Password?"));

  // Add expectations for navigating to the 'forget' page here.

});


});
