import axios from "axios";

import {
  API_BASE_URL,
  PAY_LOAN_REPAYMENT_ENDPOINT,
} from "../apis/api.constants";

export const payLoanRepament = async (token, loanId, repaymentId, amount) => {
  try {
    const res = await axios.post(
      API_BASE_URL + PAY_LOAN_REPAYMENT_ENDPOINT + loanId + "/" + repaymentId,
      {
        amount,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "", // Add token if available
        },
      }
    );

    console.log("PAYMENT DONE");
    return res;
  } catch (error) {
    console.log(error, "ERROR while repaying loan amt");
    return error;
  }
};
