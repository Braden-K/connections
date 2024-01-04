import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./userSlice";
import puzzleReducer from "./puzzleSlice";

export const store = configureStore({
  reducer: {
    user: usersReducer,
    puzzle: puzzleReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
