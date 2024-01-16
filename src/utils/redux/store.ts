import { configureStore } from "@reduxjs/toolkit";
import commonSlice from "./slice/commonSlicer";
import arrowGameSlice from "./slice/arrowGameSlice";

const store = configureStore({
  reducer: {
    commonSlice: commonSlice.reducer,
    arrowGameSlice: arrowGameSlice.reducer,
  },
});

export default store;
