import {
  emailsLoaded,
  emailsLoading,
  markEmailAsRead,
  newUpdatedEmails,
  deleteInboxEmail,
  emailsLoadError,
  deleteSentEmail,
} from "./emails-slice";
import {
  collection,
  query,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase"; // Assuming you have set up your Firebase correctly

export const fetchEmails = (recipientEmail) => {
  return async (dispatch) => {
    try {
      dispatch(emailsLoading());
      const inboxCollectionPath = `emails/${recipientEmail}/inbox`;

      const inboxCollection = collection(db, inboxCollectionPath);
      const q = query(inboxCollection);

      const querySnapshot = await getDocs(q);
      const emailData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
      console.log(emailData);
      dispatch(emailsLoaded(emailData));
    } catch (error) {
      dispatch(emailsLoadError(error.message));
    }
  };
};

export const markEmailAsReadAction = (emailId) => {
  return async (dispatch, getState) => {
    try {
      if (!emailId) {
        throw new Error("Email ID is undefined or empty.");
      }

      const state = getState();
      const userEmail = state.authentication.userId;

      // Construct the email document path
      const emailDocument = doc(db, "emails", userEmail, "inbox", emailId);

      // Check if the document exists
      const docSnapshot = await getDoc(emailDocument);

      if (docSnapshot.exists()) {
        // The document exists, so it can be updated
        // Attempt to mark the email as read in Firestore
        await updateDoc(emailDocument, {
          read: true,
        });

        console.log("Email marked as read successfully in Firestore.");
        console.log(emailDocument);
        // Dispatch your action here to update the state
        dispatch(markEmailAsRead(emailId));
      } else {
        console.log("Document does not exist in Firestore.");
        // Handle the case where the document does not exist
        // You can choose to log an error or perform other actions as needed.
      }
    } catch (error) {
      console.error("Error marking email as read:", error);
    }
  };
};

export const deleteInboxEmailAction = (emailId) => {
  return async (dispatch, getState) => {
    try {
      const state = getState();
      const userEmail = state.authentication.userId;
      const emailDocument = doc(db, "emails", userEmail, "inbox", emailId);
      console.log("Attempting to delete:", emailDocument);
      // Attempt to delete the email

      await deleteDoc(emailDocument);
      dispatch(deleteInboxEmail(emailId));

      if (userEmail === emailId) {
        // Check if the logged-in user is the sender and delete from the sender's "sent" box
        const senderRef = doc(db, "emails", userEmail, "sent", emailId);

        try {
          await deleteDoc(senderRef);

          // Successfully deleted from the sender's "sent" box, update the UI if needed.
        } catch (error) {
          console.error(
            `Failed to delete the email from the sender's "sent" box: ${error}`
          );
        }
      }
    } catch (error) {
      console.error("Error deleting email: ", error);
    }
  };
};

// ...

export const fetchNewEmails = (email) => {
  return async (dispatch) => {
    try {
      if (!email) {
        throw new Error("Email is undefined or empty.");
      }

      const emailCollection = collection(db, "emails", email, "inbox");

      const querySnapshot = await getDocs(emailCollection);
      const newEmails = [];

      querySnapshot.forEach((doc) => {
        newEmails.push({
          id: doc.id,
          data: doc.data(),
        });
      });

      dispatch(newUpdatedEmails(newEmails));
    } catch (error) {
      console.error("Error fetching new emails: ", error);
    }
  };
};
export const fetchSentNewEmails = (email) => {
  return async (dispatch) => {
    try {
      if (!email) {
        throw new Error("Email is undefined or empty.");
      }

      const emailCollection = collection(db, "emails", email, "sent");

      const querySnapshot = await getDocs(emailCollection);
      const newEmails = [];

      querySnapshot.forEach((doc) => {
        newEmails.push({
          id: doc.id,
          data: doc.data(),
        });
      });

      dispatch(newUpdatedEmails(newEmails));
    } catch (error) {
      console.error("Error fetching new emails: ", error);
    }
  };
};
// fetch sent emails

export const fetchSentEmails = (email) => {
  return async (dispatch) => {
    try {
      if (!email) {
        throw new Error("Email is undefined or empty.");
      }
      const sentCollectionPath = `emails/${email}/sent`;
      const sentCollection = collection(db, sentCollectionPath);
      const q = query(sentCollection);

      const querySnapshot = await getDocs(q);
      const emailData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));

      dispatch(emailsLoaded(emailData));
    } catch (error) {
      console.error("Error fetching sent emails:", error);
    }
  };
};
export const deleteSentEmailAction = (emailId) => {
  return async (dispatch, getState) => {
    try {
      const state = getState();
      const userEmail = state.authentication.userId;
      const emailDocument = doc(db, "emails", userEmail, "sent", emailId);

      // Attempt to delete the sent email
      // Check if the document exists before attempting to delete it
      const docSnapshot = await getDoc(emailDocument);

      if (docSnapshot.exists()) {
        // Attempt to delete the sent email
        await deleteDoc(emailDocument);
        dispatch(deleteSentEmail(emailId));
      } else {
        console.error("Document does not exist in Firestore.");
      }
    } catch (error) {
      console.error("Error deleting sent email: ", error);
    }
  };
};
