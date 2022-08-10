import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface DialogState {
  open: boolean;
}

const initialState: DialogState = {
  open: false,
};

const dialogSlice = createSlice({
  name: "open",
  initialState,

  reducers: {
    openDialog: (state: DialogState) => {
      state.open = true;
    },
    closeDialog: (state: DialogState) => {
      state.open = false;
    },
  },
});

export const { openDialog, closeDialog } = dialogSlice.actions;
export const isOpen = (state: RootState) => state.dialog.open;

export default dialogSlice.reducer;
