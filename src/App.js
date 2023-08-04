import React, { useEffect, useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Auth from "./routes/Auth";
import Home from "./routes/Home";
import Profile from "./routes/Profile";
import Root from "./routes/Root";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function App() {
  const auth = getAuth();
  console.log();
  const [userObj, setUserObj] = useState();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      setUserObj(user);
      console.log(user);
    });
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <div>페이지 없음</div>,
      children: [
        {
          index: true,
          element: userObj ? <Home userObj={userObj} /> : <Auth />,
        },
        { path: "profile", element: <Profile userObj={userObj} /> },
      ],
    },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
}
