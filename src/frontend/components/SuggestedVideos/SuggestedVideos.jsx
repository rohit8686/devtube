import React from "react";
import { Link, useParams } from "react-router-dom";
import { useVideos } from "../../contexts/hook-export";
import img from "../../images/image.ico";
import "./suggestedvideos.css";

export const SuggestedVideos = () => {
  const { videos } = useVideos();
  const { videoId } = useParams();
  const suggestedVideos = videos
    .filter((video) => video._id !== Number(videoId))
    .slice(1, 5);

  return (
    <>
      <div className="flex flex-column no-gap p-1 pb-4">
        <div>
          <h3>Suggested Videos</h3>
          <div className="underline"></div>
        </div>
        <div className="suggested-videos">
          {suggestedVideos.map(({ _id, video, creator, title }) => {
            return (
              <div className="card suggested-video mt-1" key={_id}>
                <Link to={`/video/${_id}`} className="link">
                  <img
                    className="img img-border img-dimensions"
                    src={`https://i.ytimg.com/vi/${video}/hqdefault.jpg`}
                    alt="video-thumbnail"
                  />
                  <div className="relative">
                    <div className="p-1">
                      <div className="flex space-between no-wrap">
                        <h3>{title}</h3>
                      </div>
                      <div className="flex flex-start pt-1 small-gap">
                        <img src={img} alt="avatar" className="avatar sm" />
                        <h5>{creator}</h5>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
