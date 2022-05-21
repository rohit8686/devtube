import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { PlaylistOptions } from "../../components/PlaylistOptions/PlaylistOptions";
import { usePlaylist } from "../../contexts/hook-export";
import "./playlist.css";

export const Playlist = () => {
  const [showVideoOptions, setShowVideoOptions] = useState(false);
  const [videoOptionId, setVideoOptionId] = useState("");
  const {
    playlistState: { playlistData },
  } = usePlaylist();

  return (
    <>
      <h2 className="text-center pt-1">Playlists</h2>
      <div className="underline"></div>
      {playlistData.length === 0 ? (
        <>
          <h3 className="text-center pt-1">No Playlists are created</h3>
          <Link to="/videos" className="link">
            <div className="flex pt-1">
              <button className="btn btn-primary">Go to Videos</button>
            </div>
          </Link>
        </>
      ) : (
        <>
          <div className="flex pt-1 pb-4">
            {playlistData.map(({ _id, videos, creator, title }) => {
              const { video } = videos.length !== 0 && videos[0];
              return (
                <div className="card card-width m-0" key={_id}>
                  <Link to={`/playlist/${_id}`} className="link">
                    <div className="relative">
                      <img
                        className="img img-border img-dimensions"
                        src={`https://i.ytimg.com/vi/${video}/hqdefault.jpg`}
                        alt="video-thumbnail"
                      />
                      <div className="absolute playlist-count-bg flex flex-column"></div>
                      <div className="absolute playlist-count flex flex-column">
                        <p>{videos.length}</p>
                        <span className="material-icons-outlined">
                          playlist_play
                        </span>
                      </div>
                    </div>
                  </Link>
                  <div className="relative">
                    <div className="p-1">
                      <div className="flex space-between no-wrap">
                        <h3>{title}</h3>
                        <span
                          className="material-icons-outlined align-self-start"
                          onClick={() => {
                            videoOptionId === _id
                              ? setShowVideoOptions(!showVideoOptions)
                              : setShowVideoOptions(true);
                            setVideoOptionId(_id);
                          }}
                        >
                          more_vert
                        </span>
                      </div>
                      <h5 className="pt-1">{creator}</h5>
                    </div>
                    <div className="absolute video-options-position">
                      {showVideoOptions && videoOptionId === _id ? (
                        <PlaylistOptions playlistId={_id} />
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
      <ToastContainer />
    </>
  );
};
