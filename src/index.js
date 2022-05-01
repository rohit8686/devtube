import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter } from "react-router-dom";
import { VideosProvider } from "./frontend/contexts/videos-context";
import { AuthProvider } from "./frontend/contexts/auth-context";
import { LikeProvider } from "./frontend/contexts/like-context";
import { HistoryProvider } from "./frontend/contexts/history-context";

// Call make Server
makeServer();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <AuthProvider>
      <VideosProvider>
        <LikeProvider>
          <HistoryProvider>
            <App />
          </HistoryProvider>
        </LikeProvider>
      </VideosProvider>
    </AuthProvider>
  </BrowserRouter>
);
