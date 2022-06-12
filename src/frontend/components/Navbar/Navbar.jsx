import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/hook-export";
import "./navbar.css";

export const Navbar = () => {
  const {
    authState: { encodedToken },
  } = useAuth();

  return (
    <nav className="navbar flex space-between p-1">
      <Link to="/" className="link">
        <h1 className="gradient-text">DevTube</h1>
      </Link>
      <div className="flex">
        <Link to="/videos" className="link">
          <h3>Videos</h3>
        </Link>
        {encodedToken ? (
          <Link to="/profile" className="link">
            <span className="material-icons-outlined">account_circle</span>
          </Link>
        ) : (
          <Link to="/login" className="link">
            <button className="btn btn-error">Login</button>
          </Link>
        )}
      </div>
    </nav>
  );
};
