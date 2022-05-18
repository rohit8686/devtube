import React from "react";
import { useHistory, useWatchLater } from "../../contexts/hook-export";
import "../VideoOptions/videoOptions.css";

export const HistoryOptions = ({
  historyId,
  setShowPlaylistModal,
  showPlaylistModal,
}) => {
  const { removeFromHistoryVideos } = useHistory();
  const { addToWatchLaterVideos } = useWatchLater();

  return (
    <div className="video-options">
      <button
        className="video-options-btn"
        onClick={() => addToWatchLaterVideos(historyId)}
      >
        Add to Watch Later
      </button>
      <button
        className="video-options-btn"
        onClick={() => setShowPlaylistModal(!showPlaylistModal)}
      >
        Add to Playlist
      </button>
      <button
        className="video-options-btn"
        onClick={() => removeFromHistoryVideos(historyId)}
      >
        Remove from history
      </button>
    </div>
  );
};
