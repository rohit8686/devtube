import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useHistory } from "../../contexts/hook-export";
import { HistoryOptions } from "../../components/HistoryOptions/HistoryOptions";
import { PlaylistModal } from "../../components/PlaylistModal/PlaylistModal";

export const History = () => {
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const [showHistoryOptions, setShowHistoryOptions] = useState(false);
  const [historyOptionId, setHistoryOptionId] = useState("");
  const {
    historyState: { historyVideos },
    getHistoryVideos,
    clearHistory,
  } = useHistory();

  useEffect(() => {
    getHistoryVideos();
  }, [getHistoryVideos]);

  return (
    <>
      <h2 className="text-center pt-1">History</h2>
      <div className="underline"></div>
      {historyVideos.length === 0 ? (
        <>
          <h3 className="text-center pt-1">There are no videos watched !</h3>
          <Link to="/videos" className="link flex pt-1">
            <button className="btn btn-primary">Go to videos</button>
          </Link>
        </>
      ) : (
        <>
          <div className="flex pt-1">
            <button className="btn btn-primary" onClick={clearHistory}>
              Clear History
            </button>
          </div>
          <div className="flex pt-1 pb-4">
            {historyVideos.map(({ _id, video, creator, title }) => {
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
                            historyOptionId === _id
                              ? setShowHistoryOptions(!showHistoryOptions)
                              : setShowHistoryOptions(true);
                            setHistoryOptionId(_id);
                          }}
                        >
                          more_vert
                        </span>
                      </div>
                      <h5 className="pt-1">{creator}</h5>
                    </div>
                    <div className="absolute video-options-position">
                      {showHistoryOptions && historyOptionId === _id ? (
                        <HistoryOptions
                          historyId={_id}
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
        </>
      )}
      <ToastContainer />
    </>
  );
};
