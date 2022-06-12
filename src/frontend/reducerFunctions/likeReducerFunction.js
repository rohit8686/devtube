export const initialState = {
  likedVideos: [],
};

export const likeReducerFunction = (likeState, action) => {
  switch (action.type) {
    case "LIKE":
      return {
        ...likeState,
        likedVideos: action.payload,
      };
    default:
      return { ...initialState };
  }
};
