export const initialState = {
  watchLaterVideos: [],
};

export const watchLaterReducerFunction = (watchLaterState, action) => {
  switch (action.type) {
    case "WATCH_LATER":
      return {
        ...watchLaterState,
        watchLaterVideos: action.payload,
      };
    default:
      return { ...initialState };
  }
};
