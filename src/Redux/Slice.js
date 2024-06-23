import { createSlice } from "@reduxjs/toolkit";
export const slice = createSlice({
  name: "sample",
  initialState: {
    arr: [],
    editIndex: null,
  },
  reducers: {
    updateReduxState: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});
export const { updateReduxState } = slice.actions;
export default slice.reducer;
