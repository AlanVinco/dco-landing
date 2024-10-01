import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
  name: "modal",
  initialState: {
    content: null
  },
  reducers: {
    setModalContent: (state, action) => {
      state.content = action.payload;
    }
  }
});

export const { setModalContent } = modalSlice.actions;
export default modalSlice.reducer;
