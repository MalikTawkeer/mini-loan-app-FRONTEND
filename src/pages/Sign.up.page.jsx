import React, { useContext, useState, useEffect } from "react";
import { BeatLoader } from "react-spinners";
import { Alert } from "@mui/material";

import { AuthContext } from "../store/auth.context";
import { Link, useNavigate } from "react-router-dom";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const Signup = () => {
  const navigate = useNavigate();

  const { register, loading, error, setError, isAuthenticated, token } =
    useContext(AuthContext);

  const [signUpFormData, setSignUpFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const [successMsg, setSuccessMsg] = useState("");

  const inputFeildsInfo = [
    {
      name: "name",
      label: "Your Name",
    },

    {
      name: "email",
      label: "Your Email",
    },

    {
      name: "password",
      label: "Password",
    },

    {
      name: "confirm_password",
      label: "Confirm Password",
    },
  ];

  // CHECK ALREDY AUTHENTICATED
  useEffect(() => {
    if (isAuthenticated && token) return navigate("/");
  }, [isAuthenticated, token]);

  const handleRegister = (e) => {
    e.preventDefault();
    setSuccessMsg("");

    // CHECK PASSWORD AND CONFIRM-PASSWORDS ARE SAME
    if (signUpFormData.password !== signUpFormData.confirm_password)
      return setError({
        localErr: "Passwords must match. Please check and try again.",
      });

    register(signUpFormData)
      .then((res) => {
        if (res?.status === 201 || res?.status === 200)
          setSuccessMsg("You’re registered! Please log in to continue.");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <h1 className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          Welcome To Mini loan portal
        </h1>

        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create an account
            </h1>

            {/* ERRROR */}
            {!loading && error && (
              <Alert severity="error">
                {error?.localErr || error || "Somthing went wrong!"}
              </Alert>
            )}

            {!error && !loading && successMsg && (
              <Alert severity="success">{successMsg}</Alert>
            )}

            <form className="space-y-4 md:space-y-6" onSubmit={handleRegister}>
              {inputFeildsInfo?.map((feild) => (
                <div key={feild.name}>
                  <label
                    htmlFor={feild.name}
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    {feild.label}
                  </label>
                  <input
                    type={feild.name}
                    name={feild.name}
                    id={feild.name}
                    value={signUpFormData[feild.name]}
                    onChange={(e) =>
                      setSignUpFormData((prev) => ({
                        ...prev,
                        [feild.name]: e.target.value,
                      }))
                    }
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder={
                      feild.name === "email"
                        ? "name@company.com"
                        : feild.name === "name"
                        ? "e.g, Malik towkeer"
                        : "••••••••"
                    }
                    required
                  />
                </div>
              ))}

              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                disabled={loading}
              >
                {loading ? (
                  <BeatLoader cssOverride={override} size={10} color="white" />
                ) : (
                  "Create an account"
                )}
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  to={"/login"}
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
