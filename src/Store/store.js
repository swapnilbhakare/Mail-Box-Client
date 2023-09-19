import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from './auth-slice'
import composeReducer from "./compose-slice"
import emailReducer from './emails-slice'
const store = configureStore({
    reducer:{
        authentication:AuthReducer,
        compose:composeReducer,
        emails:emailReducer


    }
})
export default store