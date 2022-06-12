import React from "react";
import "./hero.css";
import img from "../../images/img.png";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <div className="relative">
      <img src={img} className="hero-img" alt="hero" />
      <div className="hero-text flex flex-column align-start">
        <h1>Access and manage web dev videos in a single place</h1>
        <Link to="/videos" className="link">
          <button className="btn btn-primary">Explore</button>
        </Link>
      </div>
    </div>
  );
};
