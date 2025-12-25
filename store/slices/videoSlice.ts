import { siteConfig } from "@/config/site";
import { Video } from "@/types/videos";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type VideoState = {
    videos: Video[];
    loading: boolean;
    selectedVideoSrc: string;
}

const initialState: VideoState = {
    videos: [],
    loading: false,
    selectedVideoSrc: ""
}

export const fetchVideos = createAsyncThunk(
    "videos/fetch",
    async (_, { getState }) => {
        const { keyword, selectedGenres } = (getState() as RootState).search;

        const params = new URLSearchParams({
            keyword: keyword || "",
            genres: selectedGenres.join(",") || ""
        });

        const res = await fetch(`/api/video/search?${params}`);
        return await res.json();
    }
);

const videoSlice = createSlice({
    name: "video",
    initialState,
    reducers: {
        setVideos(state, action: PayloadAction<Video[]>) {
            state.videos = action.payload;
        },
        appendVideos(state, action: PayloadAction<Video[]>) {
            state.videos = [...state.videos, ...action.payload];
        },
        setSelectedVideoSrc(state, action: PayloadAction<string>) {
            state.selectedVideoSrc = action.payload;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchVideos.pending, state => {
                state.loading = true;
            })
            .addCase(fetchVideos.fulfilled, (state, action) => {
                state.videos = action.payload.data;
                state.loading = false;
            })
            .addCase(fetchVideos.rejected, state => {
                state.loading = false;
            });
    }
});

export const { setVideos, appendVideos, setSelectedVideoSrc } = videoSlice.actions;
export default videoSlice.reducer;