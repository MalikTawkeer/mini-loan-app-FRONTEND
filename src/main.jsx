import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import router from "./routes/app.routes.jsx";
import { RouterProvider } from "react-router-dom";
import { AuthContextProvider } from "./store/auth.context.jsx";
import { LoanContextProvider } from "./store/loan.context.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      <LoanContextProvider>
        <RouterProvider router={router} />
      </LoanContextProvider>
    </AuthContextProvider>
  </StrictMode>
);
