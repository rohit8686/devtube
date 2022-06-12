export const initialState = {
  category: "All",
};

export const videoReducerFunction = (videoState, action) => {
  switch (action.type) {
    case "CATEGORY":
      return { ...videoState, category: action.payload };
    default:
      return { ...videoState };
  }
};
