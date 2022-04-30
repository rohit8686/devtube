import React from "react";
import { BottomNav } from "../../components/BottomNav/BottomNav";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { VideoListing } from "../../components/VideoListing/VideoListing";
import "./videos.css";

export const Videos = () => {
  return (
    <div className="flex no-wrap space-between">
      <Sidebar />
      <BottomNav />
      <div className="width">
        <VideoListing />
      </div>
    </div>
  );
};
