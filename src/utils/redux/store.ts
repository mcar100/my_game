import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import commonSlice from "./slice/commonSlicer";
import arrowGameSlice from "./slice/arrowGameSlice";

const rootReducer = combineReducers({
  common: commonSlice.reducer,
  arrowGame: arrowGameSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
  // redux_devtools 활성화
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
