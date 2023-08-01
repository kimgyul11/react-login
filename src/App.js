import React, { useState } from "react";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./routes/Home";
import Auth from "./routes/Auth";
import { authService } from "./api/fbase";
import Footer from "./components/Footer";
import Profile from "./routes/Profile";
import Root from "./routes/Root";

const useRouter = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <div>페이지 없음</div>,
      children: [{ index: true, element: isLoggedIn ? <Profile /> : <Auth /> }],
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
