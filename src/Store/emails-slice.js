import { createSlice } from "@reduxjs/toolkit";


const emailsSlince = createSlice({
    name:"emails",
    initialState:[],
    reducers:(state,action)=>{
        return action.payload
    }
})

export const {setEmails}= emailsSlince.actions
export default emailsSlince.reducer