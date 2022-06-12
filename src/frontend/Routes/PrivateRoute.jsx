import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { BottomNav } from "../components/BottomNav/BottomNav";
import { Sidebar } from "../components/Sidebar/Sidebar";
import { useAuth } from "../contexts/auth-context";

export const PrivateRoute = () => {
  const location = useLocation();
  const {
    authState: { encodedToken },
  } = useAuth();

  return (
    <>
      {encodedToken !== "" ? (
        <div className="flex no-wrap space-between">
          <Sidebar />
          <BottomNav />
          <div className="width align-self-start">
            <Outlet />
          </div>
        </div>
      ) : (
        <Navigate to="/login" state={{ from: location }} replace={true} />
      )}
    </>
  );
};
