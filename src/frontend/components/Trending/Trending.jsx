import React from "react";
import { useVideos } from "../../contexts/videos-context";
import "./trending.css";

export const Trending = () => {
  const { videos } = useVideos();
  return (
    <>
      <h1 className="flex pt-1">Trending Videos</h1>
      <div className="underline"></div>
      <div className="flex pt-1">
        {videos.map(({ title, video, _id, views, creator, description }) => {
          if (views > 500000) {
            return (
              <div className="card card-width m-0" key={_id}>
                <img
                  className="img img-border img-dimensions"
                  src={`https://i.ytimg.com/vi/${video}/hqdefault.jpg`}
                  alt="video-thumbnail"
                />
                <div className="p-1">
                  <h2>{title}</h2>
                  <h4 className="pt-1">{creator}</h4>
                  <p>{description.slice(0, 100)}...</p>
                </div>
              </div>
            );
          }
          return "";
        })}
      </div>
    </>
  );
};
