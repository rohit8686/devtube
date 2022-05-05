import axios from "axios";
import { createContext, useContext, useReducer } from "react";
import { useVideos } from "./videos-context";
import { useAuth } from "./auth-context";
import { toastContainer } from "../components/Toast/Toast";

const PlaylistContext = createContext();
const usePlaylist = () => useContext(PlaylistContext);

const PlaylistProvider = ({ children }) => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const { videos } = useVideos();
  const {
    authState: { encodedToken },
  } = useAuth();

  const initialState = {
    playlistName: "",
    playlistData: [],
  };

  const playlistReducerFunction = (playlistState, action) => {
    switch (action.type) {
      case "PLAYLIST_DATA":
        return {
          ...playlistState,
          playlistData: action.payload,
        };
      case "PLAYLIST_NAME":
        return {
          ...playlistState,
          playlistName: action.payload,
        };
      case "CLEAR_PLAYLIST":
        return { ...playlistState, selectedPlaylists: [] };
      default:
        return { ...initialState };
    }
  };

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
