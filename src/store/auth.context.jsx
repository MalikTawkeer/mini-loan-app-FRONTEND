import React, { useEffect, createContext, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

import isTokenValid from "../utils/check.token.validity.js";

import {
  API_BASE_URL,
  LOGIN_ENDPOINT,
  REGISTER_ENDPOINT,
} from "../apis/api.constants.js";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(Cookies.get("jwt_tkn") || null);

  const [userData, setUserData] = useState({
    name: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // CHECK USER IS ALREDY AUTHENTICATED
  useEffect(() => {
    // Check if the token is valid when the component mounts
    const storedToken = Cookies.get("jwt_tkn");

    if (storedToken && isTokenValid(storedToken)) {
      // Retrive user data
      const user = JSON.parse(localStorage.getItem("userData"));
      setUserData(user);

      setToken(storedToken);
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [isAuthenticated, token]);

  const register = async ({ name, email, password }) => {
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(API_BASE_URL + REGISTER_ENDPOINT, {
        name,
        email,
        password,
      });

      console.log(res, "REGISTERIGN");
      return res;
    } catch (error) {
      console.log(error, "ERROR while registering user");

      if (error?.response?.data?.error?.errors?.length > 0)
        setError(error?.response?.data?.error?.errors[0]);
      else setError(error?.response?.data?.error);
    } finally {
      setLoading(false);
    }
  };

  const login = async ({ email, password }) => {
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(
        API_BASE_URL + LOGIN_ENDPOINT,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      console.log(res?.data?.user);

      // Store into local storage
      localStorage.setItem("userData", JSON.stringify(res?.data?.user)); // Store user data as a string

      setToken(Cookies.get("jwt_tkn"));

      setUserData({
        email: res?.data?.user?.email,
        name: res?.data?.user?.name,
      });

      console.log(res, "LOGIN");
      setIsAuthenticated(true);
      return res;
    } catch (error) {
      console.log(error, "ERROR while LOGGING IN user");
      if (error?.response?.data?.error?.errors?.length > 0)
        setError(error?.response?.data?.error?.errors[0]);
      else setError(error?.response?.data?.error);
    } finally {
      setLoading(false);
    }
  };

  // Logout function that removes the JWT token and updates state
  const logout = () => {
    Cookies.remove("jwt_tkn"); // Remove JWT token from cookies
    setToken(null); // Reset the token state
    setIsAuthenticated(false); // Update the authentication state
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        token,
        userData,
        loading,
        error,
        setError,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
