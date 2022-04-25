import React from "react";
import { NavLink } from "react-router-dom";
import "./bottomNav.css";

export const BottomNav = () => {
  return (
    <div className="bottom-nav flex space-between no-wrap fixed-bottom">
      <NavLink
        to="/videos"
        className={({ isActive }) =>
          `flex flex-start no-wrap sidebar-link link px-1 ${
            isActive ? "bottom-nav-active" : ""
          }`
        }
      >
        <span className="material-icons-outlined">videocam</span>
        <p className="bottom-nav-text">Videos</p>
      </NavLink>
      <NavLink
        to="/liked"
        className={({ isActive }) =>
          `flex flex-start no-wrap sidebar-link link px-1 ${
            isActive ? "bottom-nav-active" : ""
          }`
        }
      >
        <span className="material-icons-outlined">thumb_up</span>
        <p className="bottom-nav-text">Liked</p>
      </NavLink>
      <NavLink
        to="/history"
        className={({ isActive }) =>
          `flex flex-start no-wrap sidebar-link link px-1 ${
            isActive ? "bottom-nav-active" : ""
          }`
        }
      >
        <span className="material-icons-outlined">history</span>
        <p className="bottom-nav-text">History</p>
      </NavLink>
      <NavLink
        to="/playlist"
        className={({ isActive }) =>
          `flex flex-start no-wrap sidebar-link link px-1 ${
            isActive ? "bottom-nav-active" : ""
          }`
        }
      >
        <span className="material-icons-outlined">playlist_add</span>
        <p className="bottom-nav-text">Playlist</p>
      </NavLink>
      <NavLink
        to="/watchlater"
        className={({ isActive }) =>
          `flex flex-start no-wrap sidebar-link link px-1 ${
            isActive ? "bottom-nav-active" : ""
          }`
        }
      >
        <span className="material-icons-outlined">watch_later</span>
        <p className="bottom-nav-text">Watch later</p>
      </NavLink>
    </div>
  );
};
