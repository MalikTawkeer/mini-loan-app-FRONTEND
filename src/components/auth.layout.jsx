import React, { useContext, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { PropagateLoader } from "react-spinners";

import isTokenValid from "../utils/check.token.validity.js";
import { AuthContext } from "../store/auth.context.jsx";

const AuthLayout = ({ children, redirectPath = "/login" }) => {
  const location = useLocation();
  const { isAuthenticated, setIsAuthenticated, role } = useContext(AuthContext);

  useEffect(() => {
    const token = Cookies.get("jwt_tkn"); // Get token directly from cookies
    if (token && isTokenValid(token)) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [isAuthenticated]); // Run only on mount (componentDidMount)

  if (isAuthenticated === null) {
    return (
      <div className=" flex justify-center items-center py-10">
        <PropagateLoader color="#1bccd2" size={10} />
      </div>
    ); // Show a loading state while checking authentication
  }

  if (isAuthenticated === false) {
    return <Navigate to={redirectPath} replace />;
  }

  // REDIRECT TO ADMIN DASHBOARD
  if (
    isAuthenticated &&
    role === "admin" &&
    location.pathname !== "/admin/dashboard"
  ) {
    return <Navigate to={"/admin/dashboard"} replace />;
  }

  // Render children if the token is valid
  return <>{children}</>;
};

export default AuthLayout;
