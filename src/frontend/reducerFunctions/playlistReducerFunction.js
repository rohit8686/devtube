export const initialState = {
  playlistName: "",
  playlistData: [],
};

export const playlistReducerFunction = (playlistState, action) => {
  switch (action.type) {
    case "PLAYLIST_DATA":
      return {
        ...playlistState,
        playlistData: action.payload,
      };
    case "PLAYLIST_NAME":
      return {
        ...playlistState,
        playlistName: action.payload,
      };
    case "CLEAR_PLAYLIST":
      return { ...playlistState, selectedPlaylists: [] };
    default:
      return { ...playlistState };
  }
};
