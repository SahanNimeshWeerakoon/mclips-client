import { configureStore } from '@reduxjs/toolkit';
import cropReducer from './cropSlice'
import videoReducer from './slices/videoSlice'

export const store = configureStore({
    reducer: {
        crop: cropReducer,
        video: videoReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;