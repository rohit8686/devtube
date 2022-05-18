import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, useWatchLater } from "../../contexts/hook-export";
import { PlaylistModal } from "../PlaylistModal/PlaylistModal";
import "../VideoOptions/videoOptions.css";

export const WatchLaterOptions = ({ videoId }) => {
  const navigate = useNavigate();
  const {
    authState: { encodedToken },
  } = useAuth();
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const { removeFromWatchLaterVideos } = useWatchLater();

  return (
    <>
      <div className="video-options">
        <button
          className="video-options-btn"
          onClick={() => removeFromWatchLaterVideos(videoId)}
        >
          Remove from Watch Later
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
