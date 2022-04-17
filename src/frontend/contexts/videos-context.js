import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const VideosContext = createContext();
const useVideos = () => useContext(VideosContext);

const VideosProvider = ({ children }) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await axios.get("api/videos");
      setVideos(res.data.videos);
    })();
  }, []);

  return (
    <VideosContext.Provider value={{ videos }}>
      {children}
    </VideosContext.Provider>
  );
};

export { useVideos, VideosProvider };
