import axios from "axios";
import {
  emailsLoaded,
  emailsLoadError,
  markEmailAsRead as markEmailAsReadAction,
} from "./emails-slice"; // Import the markEmailAsRead action

// Function to fetch emails
export const fetchEmails = (email) => {
  return async (dispatch) => {
    try {
      // Prepare the API URL
      if (!email) {
        throw new Error("Email is undefined or empty.");
      }

      const recipientEmail = email.replace(/[^a-zA-Z0-9]/g, ""); // Sanitize email
      const apiURL = `https://mail-box-client-f5058-default-rtdb.firebaseio.com/emails/${recipientEmail}.json`;

      // Make a GET request to fetch emails
      const response = await axios.get(apiURL);

      if (response.status !== 200) {
        throw new Error("Failed to fetch emails.");
      }

      const data = response.data;

      // Map the emails to include the read status
      const emailsWithIds = Object.keys(data).map((emailId) => ({
        id: emailId,
        data: { ...data[emailId], read: false }, // Initialize read status as false
      }));

      // Dispatch the success action with the fetched emails
      dispatch(emailsLoaded(emailsWithIds));

      return emailsWithIds;
    } catch (error) {
      // Dispatch the error action
      dispatch(emailsLoadError(error.message));
      throw error;
    }
  };
};

// Function to mark an email as read
export const markEmailAsRead = (emailId) => {
  return async (dispatch, getState) => {
    const state = getState();
    const userEmail = state.authentication.userId;

    // Debugging: Log important information
    console.log("userEmail:", userEmail);
    console.log("emailId:", emailId);

    try {
      const apiURL = `https://mail-box-client-f5058-default-rtdb.firebaseio.com/emails/${userEmail}/${emailId}.json`;

      // Debugging: Log the constructed URL
      console.log("apiURL:", apiURL);

      await axios.put(apiURL, { userEmail, emailId, read: true });
      console.log("Email marked as read successfully.");
      dispatch(markEmailAsReadAction(emailId));
    } catch (error) {
      throw error;
    }
  };
};
