import React, { Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import { PropagateLoader } from "react-spinners";

import App from "../App.jsx";

// import Spinner from "../components/Spinner.jsx";

// Lazy loaded components
const Home = React.lazy(() => import("../pages/home.page.jsx"));
// import ShowOrders from "../pages/ShowOrdersPage.jsx";

// const PageNotFound = React.lazy(() => import("../pages/PageNotFound.jsx"));
const LoginPage = React.lazy(() => import("../pages/login.page.jsx"));
const SignupPage = React.lazy(() => import("../pages/Sign.up.page.jsx"));
// const ForgotPassPage = React.lazy(() => import("../pages/ForgotPassPage.jsx"));
// const PasswordResetPage = React.lazy(() =>
//   import("../pages/PasswordResetPage.jsx")
// );

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      //User routes
      {
        path: "/",
        element: (
          <Suspense fallback={<PropagateLoader color="red" size={30} />}>
            <Home />
          </Suspense>
        ),
      },

      //   {
      //     path: "/cart",
      //     element: (
      //       <Suspense fallback={<Spinner />}>
      //         <Cart />
      //       </Suspense>
      //     ),
      //   },

      //   {
      //     path: "/orders",
      //     element: (
      //       <Suspense fallback={<Spinner />}>
      //         <ShowOrders />
      //       </Suspense>
      //     ),
      //   },

      {
        path: "/login",
        element: (
          <Suspense fallback={<PropagateLoader />}>
            <LoginPage />
          </Suspense>
        ),
      },

      {
        path: "/signup",
        element: (
          <Suspense fallback={<PropagateLoader />}>
            <SignupPage />
          </Suspense>
        ),
      },

      //   {
      //     path: "/reset-pass/:token",
      //     element: (
      //       <Suspense fallback={<Spinner />}>
      //         <PasswordResetPage />
      //       </Suspense>
      //     ),
      //   },

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
