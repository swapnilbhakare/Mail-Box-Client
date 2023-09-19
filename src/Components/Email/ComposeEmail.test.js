import React from 'react';

import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { Provider } from "react-redux";
import store from '../../Store/store';
import ComposeEmail from './ComposeEmail';

 

describe('ComposeEmail Component', () => {

  it('renders without errors', () => {

    render(
        <Provider store={store}>
    <ComposeEmail show={true} setShow={() => {}} />
    </Provider>)
    

    // You can add more specific assertions if needed.

  });

 

  it('allows entering email addresses in "To", "CC", and "BCC" fields', async () => {

    render(   <Provider store={store}>
        <ComposeEmail show={true} setShow={() => {}} />
        </Provider>);

    const toInput = screen.getByPlaceholderText('Recipients');

    const ccInput = screen.getByPlaceholderText('Recipients');

    const bccInput = screen.getByPlaceholderText('Recipients');

 

    fireEvent.change(toInput, { target: { value: 'receiver@example.com' } });

    fireEvent.change(ccInput, { target: { value: 'cc@example.com' } });

    fireEvent.change(bccInput, { target: { value: 'bcc@example.com' } });

 

    expect(toInput.value).toBe('receiver@example.com');

    expect(ccInput.value).toBe('cc@example.com');

    expect(bccInput.value).toBe('bcc@example.com');

  });

 

  it('allows entering a subject', async () => {

    render(   <Provider store={store}>
        <ComposeEmail show={true} setShow={() => {}} />
        </Provider>);

    const subjectInput = screen.getByPlaceholderText('Subject');

 

    fireEvent.change(subjectInput, { target: { value: 'Test Subject' } });

 

    expect(subjectInput.value).toBe('Test Subject');

  });

 

  it('allows typing in the message editor', async () => {

    render(   <Provider store={store}>
        <ComposeEmail show={true} setShow={() => {}} />
        </Provider>);

    const editor = screen.getByRole('textbox', { name: 'editor' });

 

    fireEvent.change(editor, { target: { value: 'Test Message' } });

 

    expect(editor.value).toBe('Test Message');

  });

 

  it('displays success toast message on successful email send', async () => {

    render(   <Provider store={store}>
        <ComposeEmail show={true} setShow={() => {}} />
        </Provider>);

    const sendButton = screen.getByText('Send');

 

fireEvent.click(sendButton);

 

    await waitFor(() => {

      expect(screen.getByText("Email sent successfully")).toBeInTheDocument();

    });

  });

});