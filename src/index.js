import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { firebase } from "./api/filebase";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./routes/Home";
import Auth from "./routes/Auth";

console.log(firebase);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
