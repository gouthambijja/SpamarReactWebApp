import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  display: false,
};
const displayReducer = createSlice({
  name: "addSpamarDisplay",
  initialState: initialState,
  reducers: {
    toggleDisplay(state, action) {
      state.display = !state.display;
    },
  },
});
const { actions, reducer } = displayReducer;
const { toggleDisplay } = actions;
export { toggleDisplay };
export default reducer;
