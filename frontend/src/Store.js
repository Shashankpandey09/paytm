// store.js
import { configureStore } from "@reduxjs/toolkit";
import signUpReducer from "./Slices/SignUp"; // Import the reducer

export const store = configureStore({
  reducer: {
    signup: signUpReducer, // Add the reducer to the store
  },
});


