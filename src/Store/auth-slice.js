import { createSlice } from "@reduxjs/toolkit";

const idToken = localStorage.getItem("token")
const userId = localStorage.getItem("email")
const isLoggedIn = !!idToken;
const initialState={
    isLoggedIn:isLoggedIn,
    idToken:idToken,
    userId:userId,
    
}
const authSlice = createSlice({
    name:"authentication",
    initialState,
    reducers:{
        login(state,action){
            state.idToken = action.payload.idToken;
            state.userId = action.payload.userId;
            state.emailVerified= action.payload.emailVerified
            state.isLoggedIn = true;
            localStorage.setItem("email", action.payload.userId);
            localStorage.setItem("token", action.payload.idToken);

        }
    }

})
export const {login}= authSlice.actions
export default authSlice.reducer