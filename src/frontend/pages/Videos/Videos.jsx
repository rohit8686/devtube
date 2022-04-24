import React from "react";
import { BottomNav } from "../../components/BottomNav/BottomNav";
import { Categories } from "../../components/Categories/Categories";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { VideoListing } from "../../components/VideoListing/VideoListing";
import "./videos.css";

export const Videos = () => {
  return (
    <div className="flex no-wrap space-between">
      <Sidebar />
      <BottomNav />
      <div className="width">
        <Categories />
        <VideoListing />
      </div>
    </div>
  );
};
