import axios from "axios";
import { createContext, useContext, useReducer, useEffect } from "react";
import { useVideos, useAuth } from "./hook-export";
import {
  initialState,
  playlistReducerFunction,
} from "../reducerFunctions/playlistReducerFunction";
import { toastContainer } from "../components/Toast/Toast";

const PlaylistContext = createContext();
const usePlaylist = () => useContext(PlaylistContext);

const PlaylistProvider = ({ children }) => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const { videos } = useVideos();
  const {
    authState: { encodedToken },
  } = useAuth();

  useEffect(() => {
    if (!encodedToken) {
      playlistDispatch({ type: "PLAYLIST_DATA", payload: [] });
    }
  }, [encodedToken]);

  const getPlaylistVideos = async () => {
    try {
      const res = await axios.get("/api/user/playlist", {
        headers: { authorization: encodedToken },
      });
      localStorage.setItem(
        "userData",
        JSON.stringify({
          ...userData,
          playlist: res.data.playlist,
        })
      );
    } catch (err) {
      console.error(err);
    }
  };

  const createPlaylist = async () => {
    try {
      if (encodedToken) {
        if (playlistState.playlistName) {
          const res = await axios.post(
            "/api/user/playlists",
            {
              playlist: {
                title: playlistState.playlistName,
              },
            },
            {
              headers: { authorization: encodedToken },
            }
          );
          addVideoToPlaylist();
          playlistDispatch({
            type: "PLAYLIST_DATA",
            payload: res.data.playlists,
          });
          localStorage.setItem(
            "userData",
            JSON.stringify({
              ...userData,
              playlists: res.data.playlists,
            })
          );
          toastContainer("Playlist added", "success");
        } else {
          toastContainer("Enter valid playlist name", "warning");
        }
      } else {
        toastContainer("Please login !", "error");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const addVideoToPlaylist = async (_id, videoId) => {
    const video = videos.find((video) => video._id === videoId);
    try {
      const res = await axios.post(
        `/api/user/playlists/${_id}`,
        { video },
        {
          headers: { authorization: encodedToken },
        }
      );
      const playlistId = res.data.playlist._id;
      const modifiedPlaylistData = playlistState.playlistData.map((playlist) =>
        playlist._id === playlistId ? res.data.playlist : playlist
      );
      playlistDispatch({
        type: "PLAYLIST_DATA",
        payload: modifiedPlaylistData,
      });
      localStorage.setItem(
        "userData",
        JSON.stringify({
          ...userData,
          playlists: [...playlistState.playlistData, res.data.playlist],
        })
      );
      toastContainer("Video added to playlist", "success");
    } catch (err) {
      console.error(err);
    }
  };

  const removeVideoFromPlaylist = async (_id, videoId) => {
    try {
      const res = await axios.delete(`/api/user/playlists/${_id}/${videoId}`, {
        headers: { authorization: encodedToken },
      });
      const playlistId = res.data.playlist._id;
      const modifiedPlaylistData = playlistState.playlistData.map((playlist) =>
        playlist._id === playlistId ? res.data.playlist : playlist
      );
      playlistDispatch({
        type: "PLAYLIST_DATA",
        payload: modifiedPlaylistData,
      });
      localStorage.setItem(
        "userData",
        JSON.stringify({
          ...userData,
          playlists: [...playlistState.playlistData, res.data.playlist],
        })
      );
      toastContainer("Video removed from playlist", "error");
    } catch (err) {
      console.error(err);
    }
  };

  const deletePlaylist = async (_id) => {
    try {
      const res = await axios.delete(`/api/user/playlists/${_id}`, {
        headers: { authorization: encodedToken },
      });
      playlistDispatch({ type: "PLAYLIST_DATA", payload: res.data.playlists });
      localStorage.setItem(
        "userData",
        JSON.stringify({
          ...userData,
          playlists: res.data.playlists,
        })
      );
      toastContainer("Playlist Deleted", "error");
    } catch (err) {
      console.error(err);
    }
  };

  const [playlistState, playlistDispatch] = useReducer(
    playlistReducerFunction,
    initialState
  );

  return (
    <PlaylistContext.Provider
      value={{
        playlistState,
        playlistDispatch,
        createPlaylist,
        getPlaylistVideos,
        deletePlaylist,
        addVideoToPlaylist,
        removeVideoFromPlaylist,
      }}
    >
      {children}
    </PlaylistContext.Provider>
  );
};

export { PlaylistProvider, usePlaylist };
