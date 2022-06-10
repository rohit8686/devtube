import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { PlaylistVideoOptions } from "../../components/PlaylistVideoOptions/PlaylistVideoOptions";
import { usePlaylist } from "../../contexts/hook-export";
import img from "../../images/image.ico";

export const PlaylistItems = () => {
  const { playlistId } = useParams();
  const [showVideoOptions, setShowVideoOptions] = useState(false);
  const [videoOptionId, setVideoOptionId] = useState("");
  const {
    playlistState: { playlistData },
  } = usePlaylist();
  const playlistVideos = playlistData.find(
    (data) => data._id === playlistId
  ).videos;

  return (
    <>
      {playlistVideos.length === 0 ? (
        <>
          <h2 className="text-center pt-1">No Videos in this playlist</h2>
          <Link to="/playlist" className="link">
            <div className="flex pt-1">
              <button className="btn btn-primary">Back to playlists</button>
            </div>
          </Link>
        </>
      ) : (
        <div className="flex pt-1 pb-4">
          {playlistVideos.map(({ _id, video, creator, title }) => {
            return (
              <div className="card card-width m-0" key={_id}>
                <Link to={`/video/${_id}`} className="link">
                  <img
                    className="img img-border img-dimensions"
                    src={`https://i.ytimg.com/vi/${video}/hqdefault.jpg`}
                    alt="video-thumbnail"
                  />
                </Link>
                <div className="relative">
                  <div className="p-1">
                    <div className="flex space-between no-wrap">
                      <Link to={`/video/${_id}`} className="link">
                        <h3>{title}</h3>
                      </Link>
                      <span
                        className="material-icons-outlined align-self-start options-btn"
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
                    <Link to={`/video/${_id}`} className="link">
                      <div className="flex flex-start pt-1">
                        <img src={img} alt="avatar" className="avatar sm" />
                        <h5>{creator}</h5>
                      </div>
                    </Link>
                  </div>
                  <div className="absolute video-options-position">
                    {showVideoOptions && videoOptionId === _id ? (
                      <PlaylistVideoOptions
                        videoId={_id}
                        playlistId={playlistId}
                      />
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      <ToastContainer />
    </>
  );
};
