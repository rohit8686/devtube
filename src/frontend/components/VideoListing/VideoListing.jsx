import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useVideos } from "../../contexts/videos-context";
import { Categories } from "../Categories/Categories";
import { VideoOptions } from "../VideoOptions/VideoOptions";
import "./videolisting.css";

export const VideoListing = () => {
  const [showVideoOptions, setShowVideoOptions] = useState(false);
  const [videoOptionId, setVideoOptionId] = useState("");
  const { categoryWiseData } = useVideos();

  return (
    <>
      <Categories />
      <div className="flex pt-1 pb-4">
        {categoryWiseData.map(({ _id, video, creator, title }) => {
          return (
            <div className="card card-width m-0" key={_id}>
              <Link to={`/video/${_id}`} className="link">
                <img
                  className="img img-border img-dimensions"
                  src={`https://i.ytimg.com/vi/${video}/hqdefault.jpg`}
                  alt="video-thumbnail"
                />
              </Link>
              <div className="relative">
                <div className="p-1">
                  <div className="flex space-between no-wrap">
                    <h3>{title}</h3>
                    <span
                      className="material-icons-outlined align-self-start"
                      onClick={() => {
                        videoOptionId === _id
                          ? setShowVideoOptions(!showVideoOptions)
                          : setShowVideoOptions(true);
                        setVideoOptionId(_id);
                      }}
                    >
                      more_vert
                    </span>
                  </div>
                  <h5 className="pt-1">{creator}</h5>
                </div>
                <div className="absolute">
                  {showVideoOptions && videoOptionId === _id ? (
                    <VideoOptions />
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
