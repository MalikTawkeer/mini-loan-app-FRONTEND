import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../store/auth.context";

import LoginTabs from "../components/login.tab.component";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const LoginPage = () => {
  const navigate = useNavigate(); // Initialize navigate function

  const { token, isAuthenticated } = useContext(AuthContext);

  // CHECK ALREDY AUTHENTICATED
  useEffect(() => {
    if (isAuthenticated && token) navigate("/");
  }, [isAuthenticated, token, navigate]);

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <h1 className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          Mini loan portal
        </h1>

        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div>
            <h1 className=" px-6 pt-10 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account as
            </h1>

            <div className=" m-4 flex justify-center items-center">
              <LoginTabs />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
