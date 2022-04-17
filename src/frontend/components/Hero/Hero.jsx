import React from "react";
import "./hero.css";
import img from "../../images/img.png";

export const Hero = () => {
  return (
    <div className="relative">
      <img src={img} className="hero-img" alt="hero" />
      <div className="hero-text flex flex-column align-start">
        <h1>Access and manage Dev resources in a single place</h1>
        <button className="btn btn-primary">Explore</button>
      </div>
    </div>
  );
};
