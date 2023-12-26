import { Amplify } from "aws-amplify";
import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import config from "./config";
import "./index.scss";
import { createRoutes } from "./router/router";

const router = createBrowserRouter(createRoutes());

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolClientId: config.userPoolClientID,
      userPoolId: config.userPoolID,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <Toaster position="bottom-right" />
  </React.StrictMode>
);
