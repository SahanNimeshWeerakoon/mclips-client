import { configureStore } from '@reduxjs/toolkit';
import cropReducer from './cropSlice'

export const store = configureStore({
    reducer: {
        crop: cropReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;