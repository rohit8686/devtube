import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, useWatchLater } from "../../contexts/hook-export";
import { PlaylistModal } from "../PlaylistModal/PlaylistModal";
import "./videoOptions.css";

export const VideoOptions = ({ videoId }) => {
  const navigate = useNavigate();
  const {
    authState: { encodedToken },
  } = useAuth();
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const { addToWatchLaterVideos } = useWatchLater();

  return (
    <>
      <div className="video-options">
        <button
          className="video-options-btn"
          onClick={() => addToWatchLaterVideos(videoId)}
        >
          Add to Watch Later
        </button>
        <button
          className="video-options-btn"
          onClick={() =>
            encodedToken
              ? setShowPlaylistModal(!showPlaylistModal)
              : navigate("/login", { replace: true })
          }
        >
          Add to Playlist
        </button>
      </div>
      <PlaylistModal
        showPlaylistModal={showPlaylistModal}
        setShowPlaylistModal={setShowPlaylistModal}
        videoId={videoId}
      />
    </>
  );
};
