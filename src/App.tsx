import { useEffect } from "react";
import setAccessToken from "./utils/setAccessToken";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/router";

const App = () => {
  useEffect(() => {
    if(localStorage.getItem('access_token') == null) {
      setAccessToken();
    }
  });

  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
