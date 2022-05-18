import React from "react";
import { usePlaylist } from "../../contexts/hook-export";
import "../VideoOptions/videoOptions.css";

export const PlaylistOptions = ({ playlistId }) => {
  const { deletePlaylist } = usePlaylist();

  return (
    <>
      <div className="video-options">
        <button
          className="video-options-btn"
          onClick={() => deletePlaylist(playlistId)}
        >
          Delete Playlist
        </button>
      </div>
    </>
  );
};
