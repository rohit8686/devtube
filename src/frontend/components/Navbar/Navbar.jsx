import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="flex space-between p-1">
      <Link to="/" className="link">
        <h1 className="gradient-text">DevTube</h1>
      </Link>
      <button className="btn btn-error">Login</button>
    </nav>
  );
};
