import { configureStore } from "@reduxjs/toolkit";
import openSlice from "./openSlice";

export default configureStore({
  reducer: {
    open: openSlice,
  },
});
