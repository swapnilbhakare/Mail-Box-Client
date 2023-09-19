import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  emails: [],
  loading: false,
  error: null,
};

export const fetchEmails = createAsyncThunk(
  "emails/fetchEmails",
  async (senderId) => {
    const fetchUrl = `https://mail-box-client-f5058-default-rtdb.firebaseio.com/emails/${senderId}.json`;
    const response = await fetch(fetchUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch emails.");
    }
    const data = await response.json();
    const emailsWithIds = Object.keys(data).map((emailId) => ({
      id: emailId,
      data: data[emailId],
    }));
   
    return emailsWithIds;
  }
);

const emailsSlice = createSlice({

    name: 'emails',
  
    initialState,
  
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