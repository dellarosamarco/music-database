import Homepage from "./pages/Homepage/Homepage";
import { useEffect } from "react";
import { getNewAlbumReleases } from "./api/services/album/new_releases";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./store/store";
import { setAlbums } from "./store/slices/albumSlice";
import setAccessToken from "./utils/setAccessToken";

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  
  useEffect(() => {
    const getNewAlbumReleasesApi = async () => {
      try {
        const response = await getNewAlbumReleases();
        dispatch(setAlbums(response.albums.items));
      } catch (error) {
        console.log(error);
      }
    }

    if(localStorage.getItem('access_token') == null) {
      setAccessToken().then(() => {
        getNewAlbumReleasesApi();
      });
    }
    else {
      getNewAlbumReleasesApi();
    }
  });

  return (
    <>
      <Homepage />
    </>
  );
}

export default App;
