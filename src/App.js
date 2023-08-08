import React, { useEffect, useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Root from "./pages/Root";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Login from "./pages/Login";

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
          element: userObj ? <Home userObj={userObj} /> : <Login />,
        },
        { path: "profile", element: <Profile userObj={userObj} /> },
      ],
    },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
}
