import React from "react";
import { Link } from "react-router-dom";
import { useVideos } from "../../contexts/hook-export";
import img from "../../images/image.ico";
import "./trending.css";

export const Trending = () => {
  const { videos } = useVideos();
  return (
    <>
      <h1 className="flex pt-1">Trending Videos</h1>
      <div className="underline"></div>
      <div className="flex pt-1 mb-1">
        {videos.map(({ title, video, _id, views, creator, description }) => {
          if (views > 500000) {
            return (
              <div className="card card-width m-0" key={_id}>
                <Link to={`/video/${_id}`} className="link">
                  <img
                    className="img img-border img-dimensions"
                    src={`https://i.ytimg.com/vi/${video}/hqdefault.jpg`}
                    alt="video-thumbnail"
                  />
                </Link>
                <Link to={`/video/${_id}`} className="link">
                  <div className="p-1">
                    <h2>{title}</h2>
                    <div className="flex flex-start pt-1 small-gap">
                      <img src={img} alt="avatar" className="avatar sm" />
                      <h5>{creator}</h5>
                    </div>
                    <p className="pt-1">{description.slice(0, 100)}...</p>
                  </div>
                </Link>
              </div>
            );
          }
          return "";
        })}
      </div>
    </>
  );
};
