export const initialState = {
  email: "",
  password: "",
  errorMsg: "",
  userData: "",
  encodedToken: "",
};

export function authReducerFunction(authState, action) {
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
