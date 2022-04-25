import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/auth-context";

export const Navbar = () => {
  const {
    authState: { encodedToken },
    logout,
  } = useAuth();
  return (
    <nav className="flex space-between p-1">
      <Link to="/" className="link">
        <h1 className="gradient-text">DevTube</h1>
      </Link>
      {encodedToken ? (
        <button className="btn btn-error" onClick={logout}>
          Logout
        </button>
      ) : (
        <Link to="/login" className="link">
          <button className="btn btn-error">Login</button>
        </Link>
      )}
    </nav>
  );
};
