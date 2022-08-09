import { createSlice } from "@reduxjs/toolkit";

const openSlice = createSlice({
  name: "open",
  initialState: {
    isDialogOpen: true,
  },
  reducers: {
    open: (state: { isDialogOpen: boolean }, action: { payload: true }) => {
      state.isDialogOpen = action.payload;
    },
  },
});

export const { open } = openSlice.actions;
export default openSlice.reducer;
