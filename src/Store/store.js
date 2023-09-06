import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from './auth-slice'

const store = configureStore({
    reducer:{
        authentication:AuthReducer

    }
})
export default store