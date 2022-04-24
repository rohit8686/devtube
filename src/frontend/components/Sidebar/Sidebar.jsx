import React from "react";
import { NavLink } from "react-router-dom";
import "./sidebar.css";

export const Sidebar = () => {
  return (
    <div className="align-self-start sticky sidebar">
      <NavLink
        to="/videos"
        className={({ isActive }) =>
          `flex flex-start no-wrap sidebar-link link px-1 ${
            isActive ? "active-link" : ""
          }`
        }
      >
        <span className="material-icons-outlined">videocam</span>
        <p>Videos</p>
      </NavLink>
      <NavLink
        to="/liked"
        className={({ isActive }) =>
          `flex flex-start no-wrap sidebar-link link mt-1 px-1 ${
            isActive ? "active-link" : ""
          }`
        }
      >
        <span className="material-icons-outlined">thumb_up</span>
        <p>Liked</p>
      </NavLink>
      <NavLink
        to="/history"
        className={({ isActive }) =>
          `flex flex-start no-wrap sidebar-link link mt-1 px-1 ${
            isActive ? "active-link" : ""
          }`
        }
      >
        <span className="material-icons-outlined">history</span>
        <p>History</p>
      </NavLink>
      <NavLink
        to="/playlist"
        className={({ isActive }) =>
          `flex flex-start no-wrap sidebar-link link mt-1 px-1 ${
            isActive ? "active-link" : ""
          }`
        }
      >
        <span className="material-icons-outlined">playlist_add</span>
        <p>Playlist</p>
      </NavLink>
      <NavLink
        to="/watchlater"
        className={({ isActive }) =>
          `flex flex-start no-wrap sidebar-link link mt-1 px-1 ${
            isActive ? "active-link" : ""
          }`
        }
      >
        <span className="material-icons-outlined">watch_later</span>
        <p>Watch later</p>
      </NavLink>
    </div>
  );
};
