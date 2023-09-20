import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchEmails = createAsyncThunk(
  "emails/fetchEmails",
  async (email) => {

    const userEmail = email
    const emailId = userEmail || "";
    const recipientEmail = emailId.replace(/[^a-zA-Z0-9]/g, "");
    try {
      const apiURL = `https://mail-box-client-f5058-default-rtdb.firebaseio.com/emails/${recipientEmail}.json`;
      const response = await fetch(apiURL);
      
      if (!response.ok) {
        throw new Error("Failed to fetch emails.");
      }

      const data = await response.json();

      // If data is structured differently, adjust the mapping accordingly

      const emailsWithIds = Object.keys(data).map((emailId) => ({
        id: emailId,

        data: data[emailId],
      }));

      return emailsWithIds;
    } catch (error) {
      throw error;
    }
  }
);

const emailsSlice = createSlice({
  name: "emails",

  initialState: {
    emails: [],

    loading: false,

    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(fetchEmails.pending, (state) => {
        state.loading = true;

        state.error = null;
      })

      .addCase(fetchEmails.fulfilled, (state, action) => {
        state.loading = false;

        state.emails = action.payload;
      })

      .addCase(fetchEmails.rejected, (state, action) => {
        state.loading = false;

        state.error = action.error.message;
      });
  },
});

export default emailsSlice.reducer;
