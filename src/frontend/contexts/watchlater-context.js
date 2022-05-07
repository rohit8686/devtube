import axios from "axios";
import { createContext, useContext, useReducer } from "react";
import { useVideos } from "./videos-context";
import { useAuth } from "./auth-context";
import { toastContainer } from "../components/Toast/Toast";

const WatchLaterContext = createContext();
const useWatchLater = () => useContext(WatchLaterContext);

const WatchLaterProvider = ({ children }) => {
  const userData = JSON.parse(localStorage.getItem("userData"));

  const { videos } = useVideos();
  const {
    authState: { encodedToken },
  } = useAuth();

  const initialState = {
    watchLaterVideos: [],
  };

  const watchLaterReducerFunction = (watchLaterState, action) => {
    switch (action.type) {
      case "WATCH_LATER":
        return {
          ...watchLaterState,
          watchLaterVideos: action.payload,
        };
      default:
        return { ...initialState };
    }
  };

  const addToWatchLaterVideos = async (_id) => {
    const watchLaterVideo = videos.find((video) => video._id === _id);
    try {
      const res = await axios.post(
        "/api/user/watchlater",
        { video: watchLaterVideo },
        {
          headers: { authorization: encodedToken },
        }
      );
      watchLaterDispatch({ type: "WATCH_LATER", payload: res.data.watchlater });
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
