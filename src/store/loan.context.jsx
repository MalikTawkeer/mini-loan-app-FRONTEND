import React, { createContext, useContext, useState } from "react";
import axios from "axios";

import { AuthContext } from "./auth.context";

import {
  API_BASE_URL,
  APPROVE_LOAN_BY_LOAN_ID,
  CREATE_LOAN_REQ_ENDPOINT,
  RETRIVE_LOANS_BY_LOAN_STATUS,
  RETRIVE_USER_LOANS_ENDPOINT,
} from "../apis/api.constants";

export const LoanContext = createContext();

export const LoanContextProvider = ({ children }) => {
  const { token } = useContext(AuthContext);

  const [loans, setLoans] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");

  const fetchUserLoans = async () => {
    try {
      const res = await axios.get(API_BASE_URL + RETRIVE_USER_LOANS_ENDPOINT, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "", // Add token if available
        },
      });

      setLoans(res?.data?.loans);
    } catch (error) {
      console.log(error, "Error fetching user loans");
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const applyNewLoan = async ({ amount, term }) => {
    try {
      const res = await axios.post(
        API_BASE_URL + CREATE_LOAN_REQ_ENDPOINT,
        {
          amount,
          term,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "", // Add token if available
          },
        }
      );

      return res;
    } catch (error) {
      console.log(error, "Error applying new loan ");
      setError(error);
      return error;
    } finally {
      setLoading(false);
    }
  };

  // LIST ADMIN LOANS
  const getLoansByStatus = async (status = "PENDING") => {
    setLoading(true);

    try {
      const res = await axios.get(
        `${API_BASE_URL}${RETRIVE_LOANS_BY_LOAN_STATUS}?status=${status}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "", // Add token if available
          },
        }
      );

      setLoans(res?.data?.loans);
      console.log(res, "ADMIN LOANS");
    } catch (error) {
      console.log(error, "Error fetching admin loans");
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const approveLoanByLoanId = async (loanId) => {
    try {
      const res = await axios.post(
        API_BASE_URL + APPROVE_LOAN_BY_LOAN_ID + loanId,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "", // Add token if available
          },
        }
      );

      return res;
    } catch (error) {
      console.log(error, "Error Approving a loan ");
      setError(error);
      return error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoanContext.Provider
      value={{
        fetchUserLoans,
        getLoansByStatus,
        applyNewLoan,
        approveLoanByLoanId,
        loans,
        loading,
        error,
      }}
    >
      {children}
    </LoanContext.Provider>
  );
};
