import axios from "axios";
import { emailsLoaded, emailsLoadError, markEmailAsRead } from "./emails-slice";
// Function to fetch emails
export const fetchEmails = (email) => {
  return async (dispatch) => {
    try {
      // Prepare the API URL
      if (!email) {
        throw new Error("Email is undefined or empty.");
      }

      const recipientEmail = email.replace(/[^a-zA-Z0-9]/g, ""); // Sanitize email
      const apiEndpoint = `https://mail-box-client-f5058-default-rtdb.firebaseio.com/emails/${recipientEmail}.json`;

      // Make a GET request to fetch emails
      const response = await axios.get(apiEndpoint);

      if (response.status !== 200) {
        throw new Error("Failed to fetch emails.");
      }

      const data = response.data;

      // Check if data is defined
      if (data) {
        // Map the emails to include the read status
        const emailsWithIds = Object.keys(data).map((emailId) => ({
          id: emailId,
          data: { ...data[emailId] },
        }));

        // Dispatch the success action with the fetched emails
        dispatch(emailsLoaded(emailsWithIds));

        return emailsWithIds;
      } else {
        // Handle the case where data is null or undefined
        console.error("No emails found.");
        return [];
      }
    } catch (error) {
      // Dispatch the error action
      dispatch(emailsLoadError(error.message));
      throw error;
    }
  };
};

// Function to mark an email as read
export const markEmailAsReadAction = (emailId) => {
  return async (dispatch, getState) => {
    try {
      if (!emailId) {
        throw new Error("Email is undefined or empty.");
      }
      const state = getState();
      const userEmail = state.authentication.userId;
      const recipientEmail = emailId.replace(/[^a-zA-Z0-9]/g, ""); // Sanitize email

      console.log(userEmail);
      const apiEndpoint = `https://mail-box-client-f5058-default-rtdb.firebaseio.com/emails/${recipientEmail}/${emailId}.json`;

      // Attempt to mark the email as read
      const response = await axios.put(apiEndpoint, {
        userEmail,
        emailId,
        read: true,
      });

      if (response.status === 200) {
        console.log("Email marked as read successfully.");
        dispatch(markEmailAsRead(emailId));
      } else {
        console.error("Failed to mark the email as read.");
      }
    } catch (error) {
      console.error("Error marking the email as read:", error);
      throw error;
    }
  };
};
export const deleteEmailAction = (emailId, emails) => {
  return async (dispatch, getState) => {
    try {
      const state = getState();
      const userEmail = state.authentication.userId;
      const recipientEmail = userEmail.replace(/[^a-zA-Z0-9]/g, ""); // Sanitize email

      const apiEndpoint = `https://mail-box-client-f5058-default-rtdb.firebaseio.com/emails/${recipientEmail}/${emailId}.json`;
      const response = await axios.delete(apiEndpoint);
      if (response.status === 200) {
        const updatedEmails = emails.filter((email) => email.id !== emailId);
        dispatch({ type: "DELETE_EMAIL", payload: updatedEmails });
      } else {
        throw new Error(`Failed to delete the email. Status: ${response}`);
      }
    } catch (error) {
      dispatch(emailsLoadError(error.message));
      throw error;
    }
  };
};
