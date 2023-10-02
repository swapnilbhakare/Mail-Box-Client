import { createSlice } from "@reduxjs/toolkit";

const emailsSlice = createSlice({
  name: "emails",
  initialState: {
    emails: [],
    loading: false,
    error: null,
    selectedEmail: null,
    unreadEmailCount: 0,
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
      state.loading = false;
      state.emails = action.payload;
      // Recalculate the unread email count based on read status
      state.unreadEmailCount = state.emails.filter(
        (email) => !email.data.read
      ).length;
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
      }

      // Recalculate the unread email count
      state.unreadEmailCount = state.emails.filter(
        (email) => !email.data.read
      ).length;
    },
  },
});

export const {
  setSelectedEmail,
  emailsLoading,
  emailsLoaded,
  emailsLoadError,
  markEmailAsRead,
} = emailsSlice.actions;

export default emailsSlice.reducer;
