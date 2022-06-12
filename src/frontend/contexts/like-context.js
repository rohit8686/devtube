import axios from "axios";
import { createContext, useContext, useReducer, useEffect } from "react";
import { useVideos } from "./videos-context";
import { useAuth } from "./auth-context";
import { toastContainer } from "../components/Toast/Toast";
import {
  initialState,
  likeReducerFunction,
} from "../reducerFunctions/likeReducerFunction";

const LikeContext = createContext();
const useLike = () => useContext(LikeContext);

const LikeProvider = ({ children }) => {
  const userData = JSON.parse(localStorage.getItem("userData"));

  const { videos } = useVideos();
  const {
    authState: { encodedToken },
  } = useAuth();

  useEffect(() => {
    if (!encodedToken) {
      likeDispatch({ type: "LIKE", payload: [] });
    }
  }, [encodedToken]);

  const getLikedVideos = async () => {
    try {
      const res = await axios.get("/api/user/likes", {
        headers: { authorization: encodedToken },
      });
      localStorage.setItem(
        "userData",
        JSON.stringify({
          ...userData,
          likes: res.data.likes,
        })
      );
    } catch (err) {
      console.error(err);
    }
  };

  const addToLikedVideos = async (_id) => {
    const likedVideo = videos.find((video) => video._id === _id);
    if (encodedToken) {
      try {
        const res = await axios.post(
          "/api/user/likes",
          { video: likedVideo },
          {
            headers: { authorization: encodedToken },
          }
        );
        likeDispatch({ type: "LIKE", payload: res.data.likes });
        localStorage.setItem(
          "userData",
          JSON.stringify({
            ...userData,
            likes: res.data.likes,
          })
        );
        toastContainer("Added to Liked Videos", "success");
      } catch (err) {
        console.error(err);
      }
    } else {
      toastContainer("Please login !", "error");
    }
  };

  const removeFromLikedVideos = async (_id) => {
    try {
      const res = await axios.delete(`/api/user/likes/${_id}`, {
        headers: { authorization: encodedToken },
      });
      console.log(res);
      likeDispatch({ type: "LIKE", payload: res.data.likes });
      localStorage.setItem(
        "userData",
        JSON.stringify({
          ...userData,
          likes: res.data.likes,
        })
      );
      toastContainer("Removed from Liked Videos", "error");
    } catch (err) {
      console.error(err);
    }
  };

  const [likeState, likeDispatch] = useReducer(
    likeReducerFunction,
    initialState
  );

  return (
    <LikeContext.Provider
      value={{
        likeState,
        likeDispatch,
        addToLikedVideos,
        removeFromLikedVideos,
        getLikedVideos,
      }}
    >
      {children}
    </LikeContext.Provider>
  );
};

export { LikeProvider, useLike };
