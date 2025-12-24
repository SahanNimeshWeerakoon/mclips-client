"use client"
import { useEffect, useState } from "react";

import { Video } from "./Video";
import axiosInstance from "@/lib/axios";
// import { useAppDispatch, useAppSelector } from "@/store/store";
// import { setAllClips } from "@/store/clipSlice";

export const Videos = () => {
  const [videos, setVideos] = useState<{_id: string; video: string; name: string;}[]>([]);
  // const dispatch = useAppDispatch();
  // const videos = useAppSelector(state => state.videos.videos);
  useEffect(() => {
    try {
      const fetchVideos = async () => {
        const response = await axiosInstance.get('/api/video/search');
        // dispatch(setAllClips(response.data));
        setVideos(response.data.data);
      }
      fetchVideos();
    } catch(err) {
    }
  }, []);

  return (
    <div className="flex flex-wrap justify-start items-center gap-5">
      {
        videos.length ?
        videos.map(clip => <span key={clip._id+clip.name}><Video src={clip.video} thumbnail="/light-background.png" title={clip.name} /></span>) :
        <div className="text-center text-red">No clips found</div>}
    </div>
  );
};
