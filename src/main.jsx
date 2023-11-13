import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import "./index.scss";
import { createRoutes } from "./router/router";

const router = createBrowserRouter(createRoutes());

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <Toaster position="bottom-right" />{" "}
  </React.StrictMode>
);
