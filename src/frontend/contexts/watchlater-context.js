import axios from "axios";
import { createContext, useContext, useReducer, useEffect } from "react";
import { useVideos, useAuth } from "./hook-export";
import {
  initialState,
  watchLaterReducerFunction,
} from "../reducerFunctions/watchLaterReducerFunction";
import { toastContainer } from "../components/Toast/Toast";

const WatchLaterContext = createContext();
const useWatchLater = () => useContext(WatchLaterContext);

const WatchLaterProvider = ({ children }) => {
  const userData = JSON.parse(localStorage.getItem("userData"));

  const { videos } = useVideos();
  const {
    authState: { encodedToken },
  } = useAuth();

  useEffect(() => {
    if (!encodedToken) {
      watchLaterDispatch({ type: "WATCH_LATER", payload: [] });
    }
  }, [encodedToken]);

  const addToWatchLaterVideos = async (_id) => {
    const watchLaterVideo = videos.find((video) => video._id === _id);
    if (encodedToken) {
      try {
        const res = await axios.post(
          "/api/user/watchlater",
          { video: watchLaterVideo },
          {
            headers: { authorization: encodedToken },
          }
        );
        watchLaterDispatch({
          type: "WATCH_LATER",
          payload: res.data.watchlater,
        });
        localStorage.setItem(
          "userData",
          JSON.stringify({
            ...userData,
            watchlater: res.data.watchlater,
          })
        );
        toastContainer("Added to watch later", "success");
      } catch (err) {
        if ((err.response.status = 409)) {
          toastContainer("Video already in watch later", "info");
        }
        console.error(err);
      }
    } else {
      toastContainer("Please login !", "error");
    }
  };

  const removeFromWatchLaterVideos = async (_id) => {
    try {
      const res = await axios.delete(`/api/user/watchlater/${_id}`, {
        headers: { authorization: encodedToken },
      });
      watchLaterDispatch({ type: "WATCH_LATER", payload: res.data.watchlater });
      localStorage.setItem(
        "userData",
        JSON.stringify({
          ...userData,
          watchlater: res.data.watchlater,
        })
      );
      toastContainer("Removed from watch later", "error");
    } catch (err) {
      console.error(err);
    }
  };

  const [watchLaterState, watchLaterDispatch] = useReducer(
    watchLaterReducerFunction,
    initialState
  );

  return (
    <WatchLaterContext.Provider
      value={{
        watchLaterState,
        watchLaterDispatch,
        addToWatchLaterVideos,
        removeFromWatchLaterVideos,
      }}
    >
      {children}
    </WatchLaterContext.Provider>
  );
};

export { WatchLaterProvider, useWatchLater };
