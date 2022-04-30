import React from "react";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { SuggestedVideos } from "../../components/SuggestedVideos/SuggestedVideos";
import { useVideos } from "../../contexts/videos-context";
import img from "../../images/image.ico";
import "./video.css";

export const Video = () => {
  const { videoId } = useParams();
  const { videos } = useVideos();
  const singleVideo = videos.find((video) => video._id === videoId);
  const { _id, views, video, title, creator, description } = singleVideo;

  return (
    <div className="flex align-start no-wrap wrap-suggested-videos" key={_id}>
      <div className="p-1 video">
        <div className="player-wrapper">
          <ReactPlayer
            className="react-player"
            controls
            url={`https://www.youtube.com/watch?v=${video}`}
            width="100%"
          />
        </div>
        <div className="pt-1">
          <h3>{title}</h3>
          <div className="flex space-between no-wrap pt-1">
            <p className="grey-text">{views} views</p>
            <div className="flex no-wrap">
              <button className="video-btn flex no-wrap small-gap">
                <span className="material-icons-outlined video-icon">
                  thumb_up
                </span>
                <p className="single-video-options">Like</p>
              </button>
              <button className="video-btn flex no-wrap small-gap">
                <span className="material-icons-outlined video-icon">
                  playlist_add
                </span>
                <p className="single-video-options">Playlist</p>
              </button>
              <button className="video-btn flex no-wrap small-gap">
                <span className="material-icons-outlined video-icon">
                  watch_later
                </span>
                <p className="single-video-options">Watch later</p>
              </button>
              <button className="video-btn flex no-wrap small-gap">
                <span className="material-icons-outlined video-icon">
                  share
                </span>
                <p className="single-video-options">Copy</p>
              </button>
            </div>
          </div>
          <div className="flex flex-start pt-1">
            <img src={img} alt="avatar" className="avatar sm" />
            <h5>{creator}</h5>
          </div>
          <p className="pt-1">{description}</p>
        </div>
        <ToastContainer />
      </div>
      <SuggestedVideos />
    </div>
  );
};
