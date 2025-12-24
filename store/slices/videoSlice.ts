import { Video, SearchParams } from "@/types/videos";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type VideoState = {
    page: number;
    searchResults: Video[];
    searchParams: SearchParams;
}

const initialState: VideoState = {
    page: 1,
    searchResults: [],
    searchParams: {}
}

const videoSlice = createSlice({
    name: "video",
    initialState,
    reducers: {
        setSearchResults(state, action: PayloadAction<Video[]>) {
            state.searchResults = action.payload;
            state.page = state.page + 1;
        },
        setSearchParams(state, action: PayloadAction<SearchParams>) {
            state.searchParams = action.payload;
        }
    }
});

export const { setSearchResults } = videoSlice.actions;
export default videoSlice.reducer;