"use client"
import { useEffect, useState } from "react";

import { Video } from "./Video";
import axiosInstance from "@/lib/axios";
// import { useAppDispatch, useAppSelector } from "@/store/store";
// import { setAllClips } from "@/store/clipSlice";

export const Videos = () => {
  const [clips, setClips] = useState<{id: string; video: string; name: string;}[]>([]);
  // const dispatch = useAppDispatch();
  // const clips = useAppSelector(state => state.clips.clips);
  useEffect(() => {
    try {
      const fetchClips = async () => {
        const response = await axiosInstance.get('/clips/search');
        // dispatch(setAllClips(response.data));
        setClips(response.data);
      }
      fetchClips();
    } catch(err) {
      console.log(err);
    }
  }, []);

  return (
    <div className="flex flex-wrap justify-start items-center gap-5">
      {
        clips.length ?
        clips.map(clip => <Video key={clip.id} src={clip.video} thumbnail="/light-background.png" title={clip.name} />) :
        <div className="text-center text-red">No clips found</div>}
    </div>
  );
};
