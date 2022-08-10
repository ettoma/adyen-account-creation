import { configureStore } from "@reduxjs/toolkit";
import dialogSlice from "./dialogSlice";
import snackbarSlice from "./snackbarSlice";
import jsonSlice from "./jsonSlice";

const store = configureStore({
  reducer: {
    dialog: dialogSlice,
    snackbar: snackbarSlice,
    json: jsonSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
