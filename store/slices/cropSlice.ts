import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type CropState = {
    ratio: [number, number];
}

const initialState: CropState = {
    ratio: [1, 3]
}

const cropSlice = createSlice({
    name: "crop",
    initialState,
    reducers: {
        setCropRatio(state, action: PayloadAction<[number, number]>) {
            state.ratio = action.payload;
        }
    }
});

export const { setCropRatio } = cropSlice.actions;
export default cropSlice.reducer