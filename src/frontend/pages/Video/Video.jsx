import React, { useState } from "react";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { PlaylistModal } from "../../components/PlaylistModal/PlaylistModal";
import { SuggestedVideos } from "../../components/SuggestedVideos/SuggestedVideos";
import { useHistory } from "../../contexts/history-context";
import { useLike } from "../../contexts/like-context";
import { useVideos } from "../../contexts/videos-context";
import img from "../../images/image.ico";
import "./video.css";

export const Video = () => {
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const { videoId } = useParams();
  const { videos } = useVideos();
  const {
    likeState: { likedVideos },
    addToLikedVideos,
    removeFromLikedVideos,
  } = useLike();
  const { addToHistoryVideos } = useHistory();
  const singleVideo = videos.find((video) => video._id === videoId);
  const { _id, views, video, title, creator, description } = singleVideo;

  return (
    <>
      <div className="flex align-start no-wrap wrap-suggested-videos">
        <div className="p-1 video">
          <div className="player-wrapper">
            <ReactPlayer
              className="react-player"
              controls
              url={`https://www.youtube.com/watch?v=${video}`}
              width="100%"
              onStart={() => addToHistoryVideos(_id)}
            />
          </div>
          <div className="pt-1">
            <h3>{title}</h3>
            <div className="flex space-between no-wrap pt-1">
              <p className="grey-text">{views} views</p>
              <div className="flex no-wrap">
                <button
                  className={`video-btn flex no-wrap small-gap ${
                    likedVideos.some((video) => video._id === videoId)
                      ? "liked"
                      : ""
                  }`}
                  onClick={() =>
                    likedVideos.some((video) => video._id === videoId)
                      ? removeFromLikedVideos(_id)
                      : addToLikedVideos(_id)
                  }
                >
                  <span className="material-icons-outlined video-icon">
                    thumb_up
                  </span>
                  <p className="single-video-options">
                    {likedVideos.some((video) => video._id === videoId)
                      ? "Liked"
                      : "Like"}
                  </p>
                </button>
                <button
                  className="video-btn flex no-wrap small-gap"
                  onClick={() => setShowPlaylistModal(!showPlaylistModal)}
                >
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
      <PlaylistModal
        showPlaylistModal={showPlaylistModal}
        setShowPlaylistModal={setShowPlaylistModal}
        videoId={videoId}
      />
    </>
  );
};
