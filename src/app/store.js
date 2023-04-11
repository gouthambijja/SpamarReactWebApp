import { configureStore } from "@reduxjs/toolkit";
import SpamarReducer from "../features/reducerSlices/SpamarsSlice";
import userReducer from "../features/reducerSlices/userSlice";
import addSpamarDisplay from "../features/reducerSlices/addSpamarSlice";
import categoryReducer from "../features/reducerSlices/categorySlice";
let store = configureStore({
  reducer: {
    Spamar: SpamarReducer,
    user: userReducer,
    addSpamarDisplay: addSpamarDisplay,
    category: categoryReducer,
  },
});

export default store;
