import React from "react";
import { useVideos } from "../../contexts/videos-context";
import "./categories.css";

export const Categories = () => {
  const { categories, videoState, videoDispatch } = useVideos();
  return (
    <div className="flex">
      {categories.map((category, index) => {
        return (
          <button
            className={`category-btn ${
              videoState.category === category ? "active-category" : ""
            }`}
            key={index}
            onClick={() =>
              videoDispatch({ type: "CATEGORY", payload: category })
            }
          >
            {category}
          </button>
        );
      })}
    </div>
  );
};