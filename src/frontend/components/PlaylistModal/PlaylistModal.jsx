import React from "react";
import { usePlaylist } from "../../contexts/hook-export";
import "./playlistModal.css";

export const PlaylistModal = ({
  showPlaylistModal,
  setShowPlaylistModal,
  videoId,
}) => {
  const {
    playlistState: { playlistName, playlistData },
    playlistDispatch,
    createPlaylist,
    addVideoToPlaylist,
    removeVideoFromPlaylist,
  } = usePlaylist();

  return (
    <div className={`modal-bg flex ${showPlaylistModal ? "" : "modal-hidden"}`}>
      <div className="modal">
        <div className="flex space-between">
          <h3>Playlist name</h3>
          <span
            className="material-icons-outlined modal-close"
            onClick={() => {
              setShowPlaylistModal(!showPlaylistModal);
            }}
          >
            close
          </span>
        </div>
        <input
          className="input mt-1"
          type="text"
          name="playlist"
          id="playlist"
          autoComplete="off"
          value={playlistName}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              createPlaylist();
              playlistDispatch({
                type: "PLAYLIST_NAME",
                payload: "",
              });
            }
          }}
          onChange={(e) => {
            playlistDispatch({
              type: "PLAYLIST_NAME",
              payload: e.target.value,
            });
          }}
        />
        {playlistData.map(({ _id, title, videos }) => {
          return (
            <div className="flex flex-start small-gap pt-1" key={_id}>
              <input
                type="checkbox"
                name={title}
                id={title}
                onChange={(e) => {
                  if (e.target.checked) {
                    addVideoToPlaylist(_id, videoId);
                  } else {
                    removeVideoFromPlaylist(_id, videoId);
                  }
                }}
                checked={
                  videos.some((video) => video._id === videoId) ? true : false
                }
              />
              <label htmlFor={title}>{title}</label>
            </div>
          );
        })}
      </div>
    </div>
  );
};
