import { createSlice } from "@reduxjs/toolkit";

const mergeEmails = (existingEmails, newEmails) => {
  const mergedEmails = [...existingEmails];
  newEmails.forEach((newEmail) => {
    const existingEmailIndex = mergedEmails.findIndex(
      (email) => email.id === newEmail.id
    );
    if (existingEmailIndex !== -1) {
      mergedEmails[existingEmailIndex] = newEmail;
    } else {
      mergedEmails.push(newEmail);
    }
  });
  return mergedEmails;
};

// Helper function to calculate the unread email count
const calculateUnreadCount = (emails, recipientEmail, category) => {
  return emails.filter(
    (email) =>
      email.data.to === recipientEmail &&
      !email.data.read &&
      email.data.category === category
  ).length;
};
const emailsSlice = createSlice({
  name: "emails",
  initialState: {
    emails: [],
    loading: false,
    error: null,
    selectedEmail: null,
    unreadEmailCount: 0,
    inbox: [],
    sent: [],
  },

  reducers: {
    setSelectedEmail: (state, action) => {
      state.selectedEmail = action.payload;
    },
    emailsLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    emailsLoaded: (state, action) => {
      const [category, emailData] = action.payload;
      if (category === "inbox") {
        state.inbox = emailData;
      } else if (category === "sent") {
        state.sent = emailData;
      }
      state.loading = false;
      state.emails = action.payload;
      // Recalculate the unread email count based on read status and recipientEmail
      state.unreadEmailCount = calculateUnreadCount(
        state.emails,
        state.recipientEmail
      );
    },

    emailsLoadError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    markEmailAsRead: (state, action) => {
      const emailIdToMarkAsRead = action.payload;

      // Find the email to mark as read by its ID
      const emailToMarkAsRead = state.emails.find(
        (email) => email.id === emailIdToMarkAsRead
      );

      if (emailToMarkAsRead) {
        // Update the read status of the email to true
        emailToMarkAsRead.data.read = true;
        const recipientEmail = state.recipientEmail;
        state.unreadEmailCount = calculateUnreadCount(
          state.emails,
          recipientEmail,
          "inbox"
        );
      }
    },

    newUpdatedEmails: (state, action) => {
      const newEmails = action.payload;
      state.emails = mergeEmails(state.emails, newEmails);
      state.unreadEmailCount = calculateUnreadCount(state.emails);
    },

    deleteInboxEmail: (state, action) => {
      const emailIdToDelete = action.payload;
      state.emails = state.emails.filter(
        (email) => email.id !== emailIdToDelete
      );
      state.unreadEmailCount = calculateUnreadCount(
        state.emails,
        state.recipientEmail,
        "inbox"
      );
    },
    deleteSentEmail: (state, action) => {
      const emailId = action.payload;
      state.emails = state.emails.filter((email) => email.id !== emailId);
    },
  },
});

export const {
  setSelectedEmail,
  emailsLoading,
  emailsLoaded,
  emailsLoadError,
  markEmailAsRead,
  deleteInboxEmail,
  newUpdatedEmails,
  deleteSentEmail,
} = emailsSlice.actions;

export default emailsSlice.reducer;
