import Homepage from "./pages/Homepage/Homepage";
import { useEffect } from "react";
import { requestAccessToken } from "./api/request_access_token";
import { getNewAlbumReleases } from "./api/services/album/new_releases";

const App = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await requestAccessToken();

        /*
          Il token andrebbe salvato in un cookie dal backend, ma in questo caso il backend non c'è
          quindi lo salvo nel localStorage (anche se non è una pratica sicura) per poi riprenderlo all'interno dell'interceptor
          e aggiungerlo come header ad ogni richiesta
        */
        localStorage.setItem('access_token', response.access_token);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();

    getNewAlbumReleases();
  });

  return (
    <>
      <Homepage />
    </>
  );
}

export default App;
