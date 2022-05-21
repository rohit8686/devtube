import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { PlaylistModal } from "../../components/PlaylistModal/PlaylistModal";
import { WatchLaterOptions } from "../../components/WatchLaterOptions/WatchLaterOptions";
import { useWatchLater } from "../../contexts/hook-export";

export const WatchLater = () => {
  const [showLikeOptions, setShowLikeOptions] = useState(false);
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const [likeOptionId, setLikeOptionId] = useState("");
  const {
    watchLaterState: { watchLaterVideos },
  } = useWatchLater();

  return (
    <>
      <h2 className="text-center pt-1">Watch Later</h2>
      <div className="underline"></div>
      {watchLaterVideos.length === 0 ? (
        <>
          <h3 className="text-center pt-1">
            There are no watch later videos !
          </h3>
          <Link to="/videos" className="link flex pt-1">
            <button className="btn btn-primary">Go to videos</button>
          </Link>
        </>
      ) : (
        <div className="flex pt-1 pb-4">
          {watchLaterVideos.map(({ _id, video, creator, title }) => {
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
                      <h3>{title}</h3>
                      <span
                        className="material-icons-outlined align-self-start"
                        onClick={() => {
                          likeOptionId === _id
                            ? setShowLikeOptions(!showLikeOptions)
                            : setShowLikeOptions(true);
                          setLikeOptionId(_id);
                        }}
                      >
                        more_vert
                      </span>
                    </div>
                    <h5 className="pt-1">{creator}</h5>
                  </div>
                  <div className="absolute video-options-position">
                    {showLikeOptions && likeOptionId === _id ? (
                      <WatchLaterOptions
                        videoId={_id}
                        showPlaylistModal={showPlaylistModal}
                        setShowPlaylistModal={setShowPlaylistModal}
                      />
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <PlaylistModal
                  showPlaylistModal={showPlaylistModal}
                  setShowPlaylistModal={setShowPlaylistModal}
                  videoId={_id}
                />
              </div>
            );
          })}
        </div>
      )}
      <ToastContainer />
    </>
  );
};
