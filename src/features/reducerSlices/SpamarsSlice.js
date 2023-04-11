import { createSlice } from "@reduxjs/toolkit";
import { getSpamarIndexById, getAllCheckedindex } from "../../SpamarApp";
const initialState = {
  Spamars: [],
};

const reducerSlice = createSlice({
  name: "Spamars",
  initialState: initialState,
  reducers: {
    initializeStoreAction(state, action) {
      state.Spamars = action.payload;
    },
    addSpamar(state, action) {
      state.Spamars.push(action.payload);
    },
    clearSpamar(state, action) {
      const index = getSpamarIndexById(state.Spamars, action.payload.id);
      state.Spamars.splice(index, 1);
    },
    toggleSpamar(state, action) {
      const index = getSpamarIndexById(state.Spamars, action.payload.id);
      state.Spamars[index].check = !state.Spamars[index].check;
    },
    checkAllSpamar(state, action) {
      for (let i = 0; i < state.Spamars.length; i++) {
        state.Spamars[i].check = true;
      }
    },
    unCheckAllSpamar(state, action) {
      for (let i = 0; i < state.Spamars.length; i++)
        state.Spamars[i].check = false;
    },
    clearAllCheckedSpamar(state, action) {
      const CheckedIndexArr = getAllCheckedindex(state.Spamars);
      for (let i = 0; i < CheckedIndexArr.length; i++)
        state.Spamars.splice(CheckedIndexArr[i], 1);
    },
    clearAllSpamar(state, action) {
      state.Spamars = [];
    },
    editSpamar(state, action) {
      state.Spamars[action.payload.id] = action.payload.editedContent;
    },
  },
});

const { actions, reducer } = reducerSlice;
const {
  editSpamar,
  initializeStoreAction,
  toggleSpamar,
  unCheckAllSpamar,
  addSpamar,
  checkAllSpamar,
  clearAllCheckedSpamar,
  clearAllSpamar,
  clearSpamar,
} = actions;
export {
  editSpamar,
  initializeStoreAction,
  toggleSpamar,
  unCheckAllSpamar,
  addSpamar,
  checkAllSpamar,
  clearAllCheckedSpamar,
  clearAllSpamar,
  clearSpamar,
};
export default reducer;
