import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface SnackbarState {
  open: boolean;
}

const initialState: SnackbarState = {
  open: false,
};

const snackbarSlice = createSlice({
  name: "snackbar",
  initialState,

  reducers: {
    openSnackbar: (state: SnackbarState) => {
      state.open = true;
    },
    closeSnackbar: (state: SnackbarState) => {
      state.open = false;
    },
  },
});

export const { openSnackbar, closeSnackbar } = snackbarSlice.actions;
export const isOpen = (state: RootState) => state.dialog.open;

export default snackbarSlice.reducer;
