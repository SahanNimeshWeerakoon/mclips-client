"use client"
import { Video } from "./Video";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export const Videos = () => {
  const videos = useSelector((state: RootState) => state.video.videos);
  return (
    <div className="flex flex-wrap justify-start items-center gap-5">
      {
        videos.length ?
        videos.map(clip => (
          <span key={clip._id+clip.name}>
            <Video
              title={clip.name}
              videoKey={clip.key}
              thumbnail="/light-background.png"
            />
          </span>
        )) :
        <div className="text-center text-red">No clips found</div>}
    </div>
  );
};
