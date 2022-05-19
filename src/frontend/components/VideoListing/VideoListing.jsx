import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useVideos } from "../../contexts/hook-export";
import { Categories } from "../Categories/Categories";
import { VideoOptions } from "../VideoOptions/VideoOptions";
import img from "../../images/image.ico";
import "./videolisting.css";

export const VideoListing = () => {
  const [showVideoOptions, setShowVideoOptions] = useState(false);
  const [videoOptionId, setVideoOptionId] = useState("");
  const { categoryWiseData } = useVideos();
  const [sortedVideos, setSortedVideos] = useState();
  const sortVideos = () => {
    const sortedVideos = [...categoryWiseData].sort(
      (a, b) => new Date(b.uploadDate) - new Date(a.uploadDate)
    );
    setSortedVideos(sortedVideos);
  };

  useEffect(() => {
    setSortedVideos();
  }, [categoryWiseData]);

  return (
    <>
      <Categories />
      <div className="flex">
        <button className="btn btn-default mt-1" onClick={sortVideos}>
          Sort by Latest
        </button>
      </div>

      <div className="flex pt-1 pb-4">
        {(sortedVideos || categoryWiseData).map(
          ({ _id, video, creator, title }) => {
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
                          videoOptionId === _id
                            ? setShowVideoOptions(!showVideoOptions)
                            : setShowVideoOptions(true);
                          setVideoOptionId(_id);
                        }}
                      >
                        more_vert
                      </span>
                    </div>
                    <div className="flex flex-start pt-1">
                      <img src={img} alt="avatar" className="avatar sm" />
                      <h5>{creator}</h5>
                    </div>
                  </div>
                  <div className="absolute video-options-position">
                    {showVideoOptions && videoOptionId === _id ? (
                      <VideoOptions videoId={_id} />
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            );
          }
        )}
      </div>
      <ToastContainer />
    </>
  );
};
