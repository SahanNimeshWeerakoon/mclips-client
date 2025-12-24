import { siteConfig } from "@/config/site";
import { Video, SearchParams } from "@/types/videos";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type VideoState = {
    page: number;
    searchResults: Video[];
    keyword?: string;
    selectedGenres: string[];
    listedGenres: string[];
}

const initialState: VideoState = {
    page: 1,
    searchResults: [],
    keyword: "",
    selectedGenres: [],
    listedGenres: siteConfig.genres
}

const videoSlice = createSlice({
    name: "video",
    initialState,
    reducers: {
        setSearchResults(state, action: PayloadAction<Video[]>) {
            state.searchResults = action.payload;
            state.page = state.page + 1;
        },
        setKeyword(state, action: PayloadAction<string>) {
            state.keyword = action.payload;
        },
        setGenre(state, action: PayloadAction<string>) {
            state.listedGenres = state.listedGenres?.filter(genre => genre !== action.payload);
            state.selectedGenres?.push(action.payload);
        },
        removeGenre(state, action: PayloadAction<string>) {
            state.selectedGenres = state.selectedGenres?.filter(genre => genre !== action.payload);
            state.listedGenres?.push(action.payload);
        }
    }
});

export const { setSearchResults, setKeyword, setGenre, removeGenre } = videoSlice.actions;
export default videoSlice.reducer;