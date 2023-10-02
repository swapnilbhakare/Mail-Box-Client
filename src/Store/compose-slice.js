import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  to: "",
  cc: "",
  bcc: "",
  subject: "",
  message: "",
  date: "",
};

const composeSlice = createSlice({
  name: "compose",
  initialState,
  reducers: {
    setTo: (state, action) => {
      state.to = action.payload;
    },
    setCC: (state, action) => {
      state.cc = action.payload;
    },

    setBCC: (state, action) => {
      state.bcc = action.payload;
    },

    setSubject: (state, action) => {
      state.subject = action.payload;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    resetCompose: (state) => {
      return initialState;
    },
  },
});
export const {
  setTo,

  setCC,

  setBCC,

  setSubject,

  setMessage,

  resetCompose,
} = composeSlice.actions;

export default composeSlice.reducer;
