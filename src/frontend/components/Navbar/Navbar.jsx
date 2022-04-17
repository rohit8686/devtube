import React from "react";

export const Navbar = () => {
  return (
    <nav className="flex space-between p-1">
      <h1 className="gradient-text">DevTube</h1>
      <button className="btn btn-error">Login</button>
    </nav>
  );
};
