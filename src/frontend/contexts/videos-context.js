import {
  createContext,
  useContext,
  useEffect,
  useState,
  useReducer,
} from "react";
import {
  videoReducerFunction,
  initialState,
} from "../reducerFunctions/videoReducerFuntion";
import axios from "axios";

const VideosContext = createContext();
const useVideos = () => useContext(VideosContext);

const VideosProvider = ({ children }) => {
  const [videos, setVideos] = useState([]);
  const categoriesData = videos.reduce(
    (acc, curr) =>
      !acc[curr.category]
        ? { ...acc, [curr.category]: [curr] }
        : { ...acc, [curr.category]: [...acc[curr.category], curr] },
    { All: videos }
  );

  const categories = Object.keys(categoriesData);

  const [videoState, videoDispatch] = useReducer(
    videoReducerFunction,
    initialState
  );

  let categoryWiseData = [];
  categoryWiseData =
    videoState.category === "All"
      ? videos
      : videos.filter((video) => video.category === videoState.category);

  useEffect(() => {
    (async () => {
      const res = await axios.get("/api/videos");
      setVideos(res.data.videos);
    })();
  }, []);

  return (
    <VideosContext.Provider
      value={{
        videos,
        categoryWiseData,
        categories,
        videoState,
        videoDispatch,
      }}
    >
      {children}
    </VideosContext.Provider>
  );
};

export { useVideos, VideosProvider };
