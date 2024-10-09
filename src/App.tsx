import Homepage from "./pages/Homepage/Homepage";
import { useEffect } from "react";
import setAccessToken from "./utils/setAccessToken";

const App = () => {
  useEffect(() => {
    if(localStorage.getItem('access_token') == null) {
      setAccessToken();
    }
  });

  return (
    <>
      <Homepage />
    </>
  );
}

export default App;
