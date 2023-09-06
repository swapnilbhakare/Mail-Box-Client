import React from 'react';

import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import Authentication from './Authentication';

 

test('renders the Authentication component with initial state', () => {

  render(<Authentication />);

  

  // Check if the component renders without errors

  const emailInput = screen.getByPlaceholderText('Enter Email');

  const passwordInput = screen.getByPlaceholderText('Enter password');

  const confirmPasswordInput = screen.getByPlaceholderText('Confirm password');

  const signUpButton = screen.getByText('Sign Up');

 

  expect(emailInput).toBeInTheDocument();

  expect(passwordInput).toBeInTheDocument();

  expect(confirmPasswordInput).toBeInTheDocument();

  expect(signUpButton).toBeInTheDocument();

});

 

test('displays an error message when passwords do not match', async () => {

  render(<Authentication />);

  

  const emailInput = screen.getByPlaceholderText('Enter Email');

  const passwordInput = screen.getByPlaceholderText('Enter password');

  const confirmPasswordInput = screen.getByPlaceholderText('Confirm password');

  const signUpButton = screen.getByText('Sign Up');

 

  // Fill in the form

  userEvent.type(emailInput, 'test@example.com');

  userEvent.type(passwordInput, 'password');

  userEvent.type(confirmPasswordInput, 'differentpassword');

fireEvent.click(signUpButton);

 

  // Check for the error message

  await waitFor(() => {

    const errorMessage = screen.getByText('Please check Password');

    expect(errorMessage).toBeInTheDocument();

  });

});

 

test('displays an error message when form is submitted with missing details', async () => {

  render(<Authentication />);

  

  const signUpButton = screen.getByText('Sign Up');

 

  // Submit the form without filling in any details

fireEvent.click(signUpButton);

 

  // Check for the error message

  await waitFor(() => {

    const errorMessage = screen.getByText('Please enter valid details');

    expect(errorMessage).toBeInTheDocument();

  });

});

 

test('submits the form with valid details and logs the user data', async () => {

  render(<Authentication />);

  

  const emailInput = screen.getByPlaceholderText('Enter Email');

  const passwordInput = screen.getByPlaceholderText('Enter password');

  const confirmPasswordInput = screen.getByPlaceholderText('Confirm password');

  const signUpButton = screen.getByText('Sign Up');

 

  // Fill in the form with valid details

  userEvent.type(emailInput, 'test@example.com');

  userEvent.type(passwordInput, 'password');

  userEvent.type(confirmPasswordInput, 'password');

  

  // Mock the fetch call to return a success response

  jest.spyOn(global, 'fetch').mockResolvedValue({

    ok: true,

    json: () => Promise.resolve({ userId: 'user123' }),

  });

 

fireEvent.click(signUpButton);

 

  // Check if the success message is logged

  await waitFor(() => {

    const successMessage = screen.getByText('User has successfully signed up.');

    expect(successMessage).toBeInTheDocument();

  });

});

 

test('displays an error message when the server returns an error', async () => {

  render(<Authentication />);

  

  const emailInput = screen.getByPlaceholderText('Enter Email');

  const passwordInput = screen.getByPlaceholderText('Enter password');

  const confirmPasswordInput = screen.getByPlaceholderText('Confirm password');

  const signUpButton = screen.getByText('Sign Up');

 

  // Fill in the form with valid details

  userEvent.type(emailInput, 'test@example.com');

  userEvent.type(passwordInput, 'password');

  userEvent.type(confirmPasswordInput, 'password');

  

  // Mock the fetch call to return an error response

  jest.spyOn(global, 'fetch').mockResolvedValue({

    ok: false,

    json: () => Promise.resolve({ message: 'Authentication Failed !' }),

  });

 

fireEvent.click(signUpButton);

 

  // Check for the error message

  await waitFor(() => {

    const errorMessage = screen.getByText('Authentication Failed !');

    expect(errorMessage).toBeInTheDocument();

  });

});