// import { Clip } from "@/types/clips";
// import { createSlice } from "@reduxjs/toolkit";

// interface ClipState {
//   clips: Clip[];
// }

// const initialState: ClipState = {
//   clips: [],
// };

// const clipsSlice = createSlice({
//     name: "clips",
//     initialState,
//     reducers: {
//         addClip: (state, action) => {
//           state.clips.push(action.payload);
//         },
//         setAllClips: (state, action) => {
//           const clips: Clip[] = action.payload.map((clip: any) => ({
//             id: clip._id,
//             name: clip.name,
//             description: clip.description,
//             video: clip.video,
//             genres: JSON.parse(clip.genres),
//           }));
//           console.log(clips);
//           state.clips = clips;
//         }
//     }
// });

// export const { addClip, setAllClips } = clipsSlice.actions;
// export default clipsSlice.reducer;