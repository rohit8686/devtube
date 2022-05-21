import React from "react";
import { useVideos } from "../../contexts/hook-export";
import "./categories.css";

export const Categories = () => {
  const { categories, videoState, videoDispatch } = useVideos();
  return (
    <div className="flex pt-1">
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
