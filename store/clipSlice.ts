import { createSlice } from "@reduxjs/toolkit";

interface ClipState {
  clips: string[];
}

const initialState: ClipState = {
  clips: [],
};

const clipsSlice = createSlice({
    name: "clips",
    initialState,
    reducers: {
        addClip: (state, action) => {
            state.clips.push(action.payload);
        }
    }
});

export const { addClip } = clipsSlice.actions;
export default clipsSlice.reducer;