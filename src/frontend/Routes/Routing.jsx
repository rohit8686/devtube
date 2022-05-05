import React from "react";
import { Route, Routes } from "react-router-dom";
import { History } from "../pages/History/History";
import { Home } from "../pages/Home/Home";
import { Liked } from "../pages/Liked/Liked";
import { Login } from "../pages/Login/Login";
import { Playlist } from "../pages/Playlist/Playlist";
import { PlaylistItems } from "../pages/PlaylistItems/PlaylistItems";
import { Signup } from "../pages/Signup/Signup";
import { Video } from "../pages/Video/Video";
import { Videos } from "../pages/Videos/Videos";
import { WatchLater } from "../pages/WatchLater/WatchLater";
import { PrivateRoute } from "./PrivateRoute";

export const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/videos" element={<Videos />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<PrivateRoute />}>
        <Route path="/video/:videoId" element={<Video />} />
        <Route path="/liked" element={<Liked />} />
        <Route path="/history" element={<History />} />
        <Route path="/watchlater" element={<WatchLater />} />
        <Route path="/playlist" element={<Playlist />} />
        <Route path="/playlist/:playlistId" element={<PlaylistItems />} />
      </Route>
    </Routes>
  );
};
