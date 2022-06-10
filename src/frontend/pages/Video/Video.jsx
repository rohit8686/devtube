import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { PlaylistModal } from "../../components/PlaylistModal/PlaylistModal";
import { SuggestedVideos } from "../../components/SuggestedVideos/SuggestedVideos";
import { toastContainer } from "../../components/Toast/Toast";
import { useHistory, useLike, useWatchLater } from "../../contexts/hook-export";
import { videoViews } from "../../utils/utils";
import img from "../../images/image.ico";
import "./video.css";
import axios from "axios";
import Loader from "react-js-loader";

export const Video = () => {
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  let { videoId } = useParams();
  videoId = Number(videoId);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const {
    likeState: { likedVideos },
    addToLikedVideos,
    removeFromLikedVideos,
  } = useLike();
  const {
    watchLaterState: { watchLaterVideos },
    addToWatchLaterVideos,
    removeFromWatchLaterVideos,
  } = useWatchLater();
  const { addToHistoryVideos } = useHistory();
  const singleVideo = videos?.find((video) => video._id === videoId);
  const { _id, views, video, title, creator, description, uploadDate } =
    singleVideo || {};
  const date = new Date(uploadDate).toLocaleDateString();

  useEffect(() => {
    window.scrollTo(0, 0);
    (async () => {
      try {
        setLoading(true);
        const res = await axios.get("/api/videos");
        setVideos(res.data.videos);
        setLoading(false);
      } catch (e) {
        console.log(e.message);
      }
    })();
  }, [videoId]);

  return (
    <>
      {loading ? (
        <Loader type="spinner-default" bgColor={"red"} size={100} />
      ) : (
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
                <div className="flex space-between">
                  <h3>{title}</h3>
                  <p>Uploaded : {date}</p>
                </div>
                <div className="flex space-between no-wrap pt-1">
                  <p className="grey-text">{videoViews(views)} views</p>
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
                    <button
                      className={`video-btn flex no-wrap small-gap ${
                        watchLaterVideos.some((video) => video._id === videoId)
                          ? "watch-later"
                          : ""
                      }`}
                      onClick={() =>
                        watchLaterVideos.some((video) => video._id === videoId)
                          ? removeFromWatchLaterVideos(_id)
                          : addToWatchLaterVideos(_id)
                      }
                    >
                      <span className="material-icons-outlined video-icon">
                        watch_later
                      </span>
                      <p className="single-video-options">Watch later</p>
                    </button>
                    <button
                      className="video-btn flex no-wrap small-gap"
                      onClick={() => {
                        navigator.clipboard.writeText(
                          `https://www.youtube.com/watch?v=${video}`
                        );
                        toastContainer("Copied Link", "success");
                      }}
                    >
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
      )}
    </>
  );
};
