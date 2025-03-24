import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "requests",
  initialState: [],
  reducers: {
    addRequests: (state, action) => {
      return action.payload;
    },
    deleteRequest: (state, action) => {
      return state.filter((request) => request._id !== action.payload);
    },
  },
});

export const { addRequests, deleteRequest } = requestSlice.actions;
export default requestSlice.reducer;
