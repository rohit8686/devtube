import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { LikeOptions } from "../../components/LikeOptions/LikeOptions";
import { PlaylistModal } from "../../components/PlaylistModal/PlaylistModal";
import { useLike } from "../../contexts/hook-export";
import img from "../../images/image.ico";

export const Liked = () => {
  const [showLikeOptions, setShowLikeOptions] = useState(false);
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const [likeOptionId, setLikeOptionId] = useState("");
  const {
    likeState: { likedVideos },
    getLikedVideos,
  } = useLike();

  useEffect(() => {
    getLikedVideos();
  }, [getLikedVideos]);

  return (
    <>
      <h2 className="text-center pt-1">Liked Videos</h2>
      <div className="underline"></div>
      {likedVideos.length === 0 ? (
        <>
          <h3 className="text-center pt-1">There are no liked videos !</h3>
          <Link to="/videos" className="link flex pt-1">
            <button className="btn btn-primary">Go to videos</button>
          </Link>
        </>
      ) : (
        <div className="flex pt-1 pb-4">
          {likedVideos.map(({ _id, video, creator, title }) => {
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
                          likeOptionId === _id
                            ? setShowLikeOptions(!showLikeOptions)
                            : setShowLikeOptions(true);
                          setLikeOptionId(_id);
                        }}
                      >
                        more_vert
                      </span>
                    </div>
                    <div className="flex flex-start pt-1">
                      <img src={img} alt="avatar" className="avatar sm" />
                      <h4>{creator}</h4>
                    </div>
                  </div>
                  <div className="absolute video-options-position">
                    {showLikeOptions && likeOptionId === _id ? (
                      <LikeOptions
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
