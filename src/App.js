import React, { useEffect, useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Auth from "./routes/Auth";
import { authService } from "./api/fbase";
import Home from "./routes/Home";
import Root from "./routes/Root";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const useRouter = () => {
  const auth = getAuth();
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  console.log(authService.currentUser);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <div>페이지 없음</div>,
      children: [
        { index: true, element: isLoggedIn ? <Home props={init} /> : <Auth /> },
      ],
    },
    // { path: "/", element: isLoggedIn ? <Home /> : <Auth /> },
    // { path: "login", element: <Auth /> },
  ]);
  return router;
};

export default function App() {
  const router = useRouter();
  return <RouterProvider router={router}></RouterProvider>;
}
