import { React, createContext, useContext, useReducer, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toastContainer } from "../components/Toast/Toast";

const AuthContext = createContext();
const useAuth = () => useContext(AuthContext);

function AuthProvider({ children }) {
  const navigate = useNavigate();
  const initialState = {
    email: "",
    password: "",
    errorMsg: "",
    userData: "",
    encodedToken: "",
  };
  const [authState, authDispatch] = useReducer(
    authReducerFunction,
    initialState
  );

  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      authDispatch({ type: "LOCAL_STORAGE_DATA" });
    }
  }, []);

  const login = async () => {
    try {
      const { data, status } = await axios.post("/api/auth/login", {
        email: authState.email,
        password: authState.password,
      });
      console.log(data);
      const { foundUser, encodedToken } = data;
      if (status === 200 || status === 201) {
        localStorage.setItem("userToken", encodedToken);
        localStorage.setItem("userData", JSON.stringify(foundUser));
        authDispatch({
          type: "USER_DATA",
          payload: { foundUser, encodedToken },
        });
        authDispatch({ type: "RESET_FORM" });
        navigate("/", { replace: true });
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
    navigate("/", { replace: true });
    toastContainer("Logged out", "info");
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
        navigate("/", { replace: true });
      }
    } catch (e) {
      if (e.response.status === 422) {
        authDispatch({ type: "ERROR", payload: "Email Already Exists." });
      }
      setTimeout(() => authDispatch({ type: "ERROR", payload: "" }), 5000);
      authDispatch({ type: "RESET_FORM" });
      console.error("Signup error is ", e);
    }
  };

  function authReducerFunction(authState, action) {
    switch (action.type) {
      case "EMAIL":
        return { ...authState, email: action.payload };
      case "PASSWORD":
        return { ...authState, password: action.payload };
      case "RESET_FORM":
        return { ...authState, email: "", password: "" };
      case "CLEAR_AUTH_DATA":
        return { ...initialState };
      case "ERROR":
        return { ...authState, errorMsg: action.payload };
      case "TEST_CREDENTIALS":
        return { ...authState, email: "rohit@gmail.com", password: "rohit" };
      case "USER_DATA":
        const { foundUser, encodedToken } = action.payload;
        return {
          ...authState,
          userData: foundUser,
          encodedToken,
        };
      case "LOCAL_STORAGE_DATA":
        return {
          ...authState,
          userData: JSON.parse(localStorage.getItem("userData")),
          encodedToken: localStorage.getItem("userToken"),
        };
      default:
        return { ...authState };
    }
  }

  return (
    <AuthContext.Provider
      value={{ authState, authDispatch, login, logout, signup }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { useAuth, AuthProvider };