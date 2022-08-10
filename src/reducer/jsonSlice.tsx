import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface JsonSliceState {
  data: string;
}

const initialState: JsonSliceState = {
  data: "",
};

const jsonSlice = createSlice({
  name: "json",
  initialState,

  reducers: {
    setJsonData: (state: JsonSliceState, action: PayloadAction<string>) => {
      state.data = action.payload;
    },
  },
});

export const { setJsonData } = jsonSlice.actions;
export default jsonSlice.reducer;
