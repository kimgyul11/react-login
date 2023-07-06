import React, { useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./routes/Home";
import Auth from "./routes/Auth";

const useRouter = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = createBrowserRouter([
    { path: "/", element: isLoggedIn ? <Home /> : <Auth /> },
    { path: "login", element: <Auth /> },
  ]);
  return router;
};

export default function App() {
  const router = useRouter();
  return (
    <RouterProvider router={router}>
      <div></div>
    </RouterProvider>
  );
}
