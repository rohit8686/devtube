import React from "react";
import { useAuth } from "../../contexts/hook-export";

export const UserProfile = () => {
  const { logout } = useAuth();
  const {
    authState: {
      userData: { firstName, lastName, email },
    },
  } = useAuth();
  return (
    <div className="card card-width p-1">
      <p>
        <strong>Name : </strong>
        {firstName} {lastName}
      </p>
      <p>
        <strong>Email : </strong>
        {email}
      </p>
      <div className="pt-1">
        <button className="btn btn-error" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
};
