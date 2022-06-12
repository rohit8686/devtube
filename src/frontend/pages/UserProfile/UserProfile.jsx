import React from "react";
import { useAuth } from "../../contexts/hook-export";
import profile from "../../images/profile.jpg";

export const UserProfile = () => {
  const { logout } = useAuth();
  const {
    authState: {
      userData: { firstName, lastName, email },
    },
  } = useAuth();
  return (
    <div className="card card-width p-1 text-center">
      <img
        src={profile}
        alt="profile"
        className="img img-dimensions rounded-img"
      />
      <p className="pt-1">
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
