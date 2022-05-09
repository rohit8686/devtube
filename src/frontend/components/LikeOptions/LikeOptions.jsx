import React from "react";
import { useLike } from "../../contexts/like-context";
import { useWatchLater } from "../../contexts/watchlater-context";
import "../VideoOptions/videoOptions.css";

export const LikeOptions = ({
  videoId,
  setShowPlaylistModal,
  showPlaylistModal,
}) => {
  const { removeFromLikedVideos } = useLike();
  const { addToWatchLaterVideos } = useWatchLater();

  return (
    <div className="video-options">
      <button
        className="video-options-btn"
        onClick={() => addToWatchLaterVideos(videoId)}
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
        onClick={() => removeFromLikedVideos(videoId)}
      >
        Remove from liked videos
      </button>
    </div>
  );
};
