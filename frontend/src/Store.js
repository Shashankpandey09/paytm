// store.js
import { configureStore } from "@reduxjs/toolkit";
import signUpReducer from "./Slices/SignUp"; // Import the reducer
import TransferReducer from './Slices/Transfer';

export const store = configureStore({
  reducer: {
    signup: signUpReducer,
    transfer:TransferReducer // Add the reducer to the store
  },
});


