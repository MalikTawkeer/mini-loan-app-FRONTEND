import React, { Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import { PropagateLoader } from "react-spinners";

import App from "../App.jsx";
import AuthLayout from "../components/auth.layout.jsx";

// Lazy loaded components
const AdminDashboardPage = React.lazy(() =>
  import("../pages/admin/dashboard.page.jsx")
);

const LoanPage = React.lazy(() => import("../pages/loans.pages.jsx"));

const LoginPage = React.lazy(() => import("../pages/login.page.jsx"));
const SignupPage = React.lazy(() => import("../pages/Sign.up.page.jsx"));
// const PageNotFound = React.lazy(() => import("../pages/PageNotFound.jsx"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      //User routes
      {
        path: "/",
        element: (
          <Suspense fallback={<PropagateLoader color="#1bccd2" size={10} />}>
            <AuthLayout>
              <LoanPage />
            </AuthLayout>
          </Suspense>
        ),
      },

      {
        path: "/login",
        element: (
          <Suspense fallback={<PropagateLoader color="#1bccd2" size={10} />}>
            <LoginPage />
          </Suspense>
        ),
      },

      {
        path: "/signup",
        element: (
          <Suspense fallback={<PropagateLoader color="#1bccd2" size={10} />}>
            <SignupPage />
          </Suspense>
        ),
      },

      {
        path: "/admin/dashboard",
        element: (
          <AuthLayout>
            <Suspense fallback={<PropagateLoader color="#1bccd2" size={10} />}>
              <AdminDashboardPage />
            </Suspense>
          </AuthLayout>
        ),
      },

      //   {
      //     path: "*",
      //     element: (
      //       <Suspense fallback={<Spinner />}>
      //         <PageNotFound />
      //       </Suspense>
      //     ),
      //   },
    ],
  },
]);

export default router;
