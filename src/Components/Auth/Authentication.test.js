
import React from 'react';

import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import Authentication from './Authentication';

 

// Mocking the fetch function

global.fetch = jest.fn();

 

describe('Authentication Component', () => {

  afterEach(() => {

    jest.clearAllMocks();

  });

 

  it('should render the Authentication component', () => {

    render(<Authentication />);

    expect(screen.getByText('Sign Up')).toBeInTheDocument();

  });

 

  it('should display error message for non-matching passwords', () => {

    render(<Authentication />);

    const passwordInput = screen.getByPlaceholderText('Enter password');

    const confirmPasswordInput = screen.getByPlaceholderText('Confirm password');

    const signUpButton = screen.getByRole('button',{name:/Create an Account/i});

 

    userEvent.type(passwordInput, 'password123');

    userEvent.type(confirmPasswordInput, 'password456');

    userEvent.click(signUpButton);

 

    expect(screen.getByText(/Please check Password/i)).toBeInTheDocument();

  });

 

  it('should show error message for empty fields', () => {

    render(<Authentication />);

    const signUpButton = screen.getByRole('button',{name:/Create an Account/i});

 

    userEvent.click(signUpButton);

 

    expect(screen.getByText('Please enter valid details')).toBeInTheDocument();

  });

 

  it('should submit the form with valid data', async () => {

    const mockResponse = { ok: true };

    global.fetch.mockResolvedValue({

      json: async () => mockResponse,

    });

 

    render(<Authentication />);

    const emailInput = screen.getByPlaceholderText('Enter Email');

    const passwordInput = screen.getByPlaceholderText('Enter password');

    const confirmPasswordInput = screen.getByPlaceholderText('Confirm password');

    const signUpButton = screen.getByRole('button',{name:/Create an Account/i});

 

    userEvent.type(emailInput, 'test@example.com');

    userEvent.type(passwordInput, 'password123');

    userEvent.type(confirmPasswordInput, 'password123');

    userEvent.click(signUpButton);

 

    // Wait for the success message to appear (you can customize this part)

    await waitFor(() => {

      expect(screen.getByText('User has successfully signed up')).toBeInTheDocument();

    });

 

    // You can also check that the API request was made with the correct data if needed.

    expect(fetch).toHaveBeenCalledWith(

      expect.any(String),

      expect.objectContaining({

        method: 'POST',

        body: JSON.stringify({

          email: 'test@example.com',

          password: 'password123',

          confirmPassword: 'password123',

          returnSecureToken: true,

        }),

      })

    );

  });

 

  it('should show error message on failed API request', async () => {

    const mockResponse = { ok: false };

    global.fetch.mockResolvedValue({

      json: async () => mockResponse,

    });

 

    render(<Authentication />);

    const emailInput = screen.getByPlaceholderText('Enter Email');

    const passwordInput = screen.getByPlaceholderText('Enter password');

    const confirmPasswordInput = screen.getByPlaceholderText('Confirm password');

    const signUpButton = screen.getByRole('button',{name:/Create an Account/i});

 

    userEvent.type(emailInput, 'test@example.com');

    userEvent.type(passwordInput, 'password123');

    userEvent.type(confirmPasswordInput, 'password123');

    userEvent.click(signUpButton);

 

    // Wait for the error message to appear (you can customize this part)

    await waitFor(() => {

      expect(screen.getByText(/Authentication Failed !/i)).toBeInTheDocument();

    });

  });

});