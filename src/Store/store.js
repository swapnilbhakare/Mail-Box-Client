import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from './auth-slice'
import composeReducer from "./compose-slice"
const store = configureStore({
    reducer:{
        authentication:AuthReducer,
        compose:composeReducer


    }
})
export default store