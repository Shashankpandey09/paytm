import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  result: null,
  error: null,
  loading: false,
};

// Async Thunk for Transfer API call
export const Transfer = createAsyncThunk(
  "transferSlice/transfer", // Name convention updated
  async (data, { rejectWithValue }) => {
    try {
      const resp = await axios.post(
        "http://localhost:3000/api/v1/account/transfer",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("payToken")}`,
          },
        }
      );
      return resp.data;
    } catch (error) {
      const message = error.response?.data?.message || "Transfer failed.";
      // Returning a more controlled error message using rejectWithValue
    
      return rejectWithValue(message);
    }
  }
);

// Transfer Slice
export const TransferSlice = createSlice({
  name: "transfer money",
  initialState,
  reducers: {
    removePrev:(state)=>{
        state.result=null;
        state.loading=false;
        state.error=null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(Transfer.pending, (state) => {
        state.loading = true;
        state.error = null; // Clear previous errors on new request
      })
      .addCase(Transfer.fulfilled, (state, action) => {
        state.result = action.payload;
        state.loading = false;
        
      })
      .addCase(Transfer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Set controlled error message
       
      });
  },
});
export const {removePrev} = TransferSlice.actions
export default TransferSlice.reducer;
