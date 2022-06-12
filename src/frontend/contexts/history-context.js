import axios from "axios";
import { createContext, useContext, useReducer, useEffect } from "react";
import { useVideos } from "./videos-context";
import { useAuth } from "./auth-context";
import { toastContainer } from "../components/Toast/Toast";
import {
  historyReducerFunction,
  initialState,
} from "../reducerFunctions/historyReducerFunction";

const HistoryContext = createContext();
const useHistory = () => useContext(HistoryContext);

const HistoryProvider = ({ children }) => {
  const userData = JSON.parse(localStorage.getItem("userData"));

  const { videos } = useVideos();
  const {
    authState: { encodedToken },
  } = useAuth();

  useEffect(() => {
    if (!encodedToken) {
      historyDispatch({ type: "HISTORY", payload: [] });
    }
  }, [encodedToken]);

  const getHistoryVideos = async () => {
    try {
      const res = await axios.get("/api/user/history", {
        headers: { authorization: encodedToken },
      });
      localStorage.setItem(
        "userData",
        JSON.stringify({
          ...userData,
          history: res.data.history,
        })
      );
    } catch (err) {
      console.error(err);
    }
  };

  const addToHistoryVideos = async (_id) => {
    const historyVideo = videos.find((video) => video._id === _id);
    try {
      const res = await axios.post(
        "/api/user/history",
        { video: historyVideo },
        {
          headers: { authorization: encodedToken },
        }
      );
      historyDispatch({ type: "HISTORY", payload: res.data.history });
      localStorage.setItem(
        "userData",
        JSON.stringify({
          ...userData,
          history: res.data.history,
        })
      );
    } catch (err) {
      console.error(err);
    }
  };

  const removeFromHistoryVideos = async (_id) => {
    try {
      const res = await axios.delete(`/api/user/history/${_id}`, {
        headers: { authorization: encodedToken },
      });
      historyDispatch({ type: "HISTORY", payload: res.data.history });
      localStorage.setItem(
        "userData",
        JSON.stringify({
          ...userData,
          history: res.data.history,
        })
      );
      toastContainer("Video removed from History", "error");
    } catch (err) {
      console.error(err);
    }
  };

  const clearHistory = async () => {
    try {
      const res = await axios.delete(`/api/user/history/all`, {
        headers: { authorization: encodedToken },
      });
      historyDispatch({ type: "HISTORY", payload: res.data.history });
      localStorage.setItem(
        "userData",
        JSON.stringify({
          ...userData,
          history: res.data.history,
        })
      );
      toastContainer("History Cleared", "error");
    } catch (err) {
      console.error(err);
    }
  };

  const [historyState, historyDispatch] = useReducer(
    historyReducerFunction,
    initialState
  );

  return (
    <HistoryContext.Provider
      value={{
        historyState,
        historyDispatch,
        addToHistoryVideos,
        removeFromHistoryVideos,
        getHistoryVideos,
        clearHistory,
      }}
    >
      {children}
    </HistoryContext.Provider>
  );
};

export { HistoryProvider, useHistory };
