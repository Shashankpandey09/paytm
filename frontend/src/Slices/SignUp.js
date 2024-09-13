import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
  data: {
    token:localStorage.getItem('payToken')||null
  },
  status: "succeeded", // Renamed from 'state' to 'status' for clarity
  error: null, // Added error field to store any errors
  user:localStorage.getItem('User')||null
};

export const SIGNUP = createAsyncThunk(
  "signup",
  async (userData, { rejectWithValue}) => {
    try {
      const resp = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/v1/user/${userData[1].type}`, userData[0]); 
      console.log(resp.data);
      // Directly pass userData as the body

      return resp.data;
    } catch (error) {
      // Return a rejected value with the error message
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

export const SignUpSlice = createSlice({
  name: 'signup',
  initialState,
  reducers: {
    removeToken:(state)=>{
      state.data.token=null;
      localStorage.removeItem("payToken");
      localStorage.removeItem("User");
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(SIGNUP.pending, (state) => {
        state.status = "loading";
        state.error = null; // Clear any previous errors
      })
      .addCase(SIGNUP.fulfilled, (state, action) => {
        state.data.token = action.payload.token;
        state.status = "succeeded";
        state.user=action.payload?.username
        localStorage.setItem("payToken", state.data.token);
        localStorage.setItem("User", action.payload.username); // Store the token in localStorage
      })
      .addCase(SIGNUP.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload; // Capture the error
      });
  },
});
export const {removeToken}=SignUpSlice.actions
export default SignUpSlice.reducer;
