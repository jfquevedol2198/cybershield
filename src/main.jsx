import { Amplify } from "aws-amplify";
import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "regenerator-runtime/runtime";

import awsconfig from "./aws-exports";
import { AuthProvider } from "./hooks/useAuth";
import "./index.scss";
import { createRoutes } from "./router/router";

const router = createBrowserRouter(createRoutes());

Amplify.configure(awsconfig);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster position="bottom-right" />
    </AuthProvider>
  </React.StrictMode>
);
