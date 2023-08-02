import React, { useEffect, useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Auth from "./routes/Auth";
import Home from "./routes/Home";
import Profile from "./routes/Profile";
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

  console.log("auth", auth);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <div>페이지 없음</div>,
      children: [
        { index: true, element: isLoggedIn ? <Home props={init} /> : <Auth /> },
        { path: "profile", element: <Profile /> },
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
