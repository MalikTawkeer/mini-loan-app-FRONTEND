import axios from "axios";
import { createContext, useState } from "react";
import {
  API_BASE_URL,
  LOGIN_ENDPOINT,
  REGISTER_ENDPOINT,
} from "../apis/api.constants.js";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);

  const [userData, setUserData] = useState({
    name: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
      const res = await axios.post(API_BASE_URL + LOGIN_ENDPOINT, {
        email,
        password,
      });

      console.log(res, "LOGIN");
    } catch (error) {
      console.log(error, "ERROR while LOGGING IN user");
      if (error?.response?.data?.error?.errors?.length > 0)
        setError(error?.response?.data?.error?.errors[0]);
      else setError(error?.response?.data?.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        token,
        userData,
        loading,
        error,
        setError,
        register,
        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
