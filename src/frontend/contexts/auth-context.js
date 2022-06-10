import { React, createContext, useContext, useReducer } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { toastContainer } from "../components/Toast/Toast";
import {
  initialState,
  authReducerFunction,
} from "../reducerFunctions/authReducerFunction";

const AuthContext = createContext();
const useAuth = () => useContext(AuthContext);

function AuthProvider({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [authState, authDispatch] = useReducer(
    authReducerFunction,
    initialState
  );

  const login = async () => {
    try {
      const { data, status } = await axios.post("/api/auth/login", {
        email: authState.email,
        password: authState.password,
      });
      const { foundUser, encodedToken } = data;
      if (status === 200 || status === 201) {
        localStorage.setItem("userToken", encodedToken);
        localStorage.setItem("userData", JSON.stringify(foundUser));
        authDispatch({
          type: "USER_DATA",
          payload: { foundUser, encodedToken },
        });
        authDispatch({ type: "RESET_FORM" });
        setTimeout(() => toastContainer("Login successfull", "success"), 400);
        navigate(location?.state?.from?.pathname || "/", { replace: true });
      } else if (status === 401) {
        authDispatch({ type: "ERROR", payload: "Incorrect password" });
        setTimeout(() => authDispatch({ type: "ERROR", payload: "" }), 5000);
      }
    } catch (e) {
      if (e.response.status === 401) {
        authDispatch({ type: "ERROR", payload: "Incorrect password" });
        setTimeout(() => authDispatch({ type: "ERROR", payload: "" }), 5000);
      } else if (e.response.status === 404)
        authDispatch({
          type: "ERROR",
          payload: "Email is not registered",
        });
      setTimeout(() => authDispatch({ type: "ERROR", payload: "" }), 5000);
      authDispatch({ type: "RESET_FORM" });
      console.error("Login error is ", e);
    }
  };

  const logout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userData");
    authDispatch({ type: "CLEAR_AUTH_DATA" });
    setTimeout(() => toastContainer("Logged out", "error"), 400);
    navigate("/", { replace: true });
  };

  const signup = async () => {
    try {
      const { data, status } = await axios.post("/api/auth/signup", {
        email: authState.email,
        password: authState.password,
      });
      const { createdUser, encodedToken } = data;
      if (status === 201 || status === 200) {
        localStorage.setItem("userToken", encodedToken);
        localStorage.setItem("userData", JSON.stringify(createdUser));
        authDispatch({
          type: "USER_DATA",
          payload: { createdUser, encodedToken },
        });
        authDispatch({ type: "RESET_FORM" });
        setTimeout(() => toastContainer("Sign in successfull", "success"), 400);
        navigate("/", { replace: true });
      }
    } catch (e) {
      console.log(e);
      if (e.response.status === 422) {
        authDispatch({ type: "ERROR", payload: "Email Already Exists." });
      }
      setTimeout(() => authDispatch({ type: "ERROR", payload: "" }), 5000);
      authDispatch({ type: "RESET_FORM" });
      console.error("Signup error is ", e);
    }
  };

  return (
    <AuthContext.Provider
      value={{ authState, authDispatch, login, logout, signup }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { useAuth, AuthProvider };
