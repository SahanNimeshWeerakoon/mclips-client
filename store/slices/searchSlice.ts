import { siteConfig } from "@/config/site";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type SearchState = {
    page: number;
    keyword?: string;
    selectedGenres: string[];
    listedGenres: string[];
}

const initialState: SearchState = {
    page: 1,
    keyword: "",
    selectedGenres: [],
    listedGenres: siteConfig.genres
}

const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
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

export const { setKeyword, setGenre, removeGenre } = searchSlice.actions;
export default searchSlice.reducer;