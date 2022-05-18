import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter } from "react-router-dom";
import {
  VideosProvider,
  AuthProvider,
  LikeProvider,
  HistoryProvider,
  PlaylistProvider,
  WatchLaterProvider,
} from "./frontend/contexts/provider-export";

// Call make Server
makeServer();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <AuthProvider>
      <VideosProvider>
        <LikeProvider>
          <HistoryProvider>
            <PlaylistProvider>
              <WatchLaterProvider>
                <App />
              </WatchLaterProvider>
            </PlaylistProvider>
          </HistoryProvider>
        </LikeProvider>
      </VideosProvider>
    </AuthProvider>
  </BrowserRouter>
);
