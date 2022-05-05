import React from "react";
import { usePlaylist } from "../../contexts/playlist-context";
import "../VideoOptions/videoOptions.css";

export const PlaylistVideoOptions = ({ videoId, playlistId }) => {
  const { removeVideoFromPlaylist } = usePlaylist();

  return (
    <>
      <div className="video-options">
        <button
          className="video-options-btn"
          onClick={() => removeVideoFromPlaylist(playlistId, videoId)}
        >
          Delete video from playlist
        </button>
      </div>
    </>
  );
};
