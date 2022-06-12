export const initialState = {
  historyVideos: [],
};

export const historyReducerFunction = (historyState, action) => {
  switch (action.type) {
    case "HISTORY":
      return {
        ...historyState,
        historyVideos: action.payload,
      };
    default:
      return { ...initialState };
  }
};
