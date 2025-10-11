import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
import clipsReducer from "./clipSlice";
import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    clips: clipsReducer,
    counter: counterReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;