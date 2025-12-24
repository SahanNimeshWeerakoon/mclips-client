import { configureStore } from '@reduxjs/toolkit';

import videoReducer from './slices/videoSlice'
import searchReducer from './slices/searchSlice'
import cropReducer from './slices/cropSlice'

export const store = configureStore({
    reducer: {
        crop: cropReducer,
        video: videoReducer,
        search: searchReducer
    }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;