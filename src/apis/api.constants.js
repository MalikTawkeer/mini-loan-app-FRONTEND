export const API_BASE_URL = "http://localhost:5000/";

// AUTH APIS
export const LOGIN_ENDPOINT = "api/auth/login";
export const REGISTER_ENDPOINT = "api/auth/register";

// LOAN APIS
export const RETRIVE_USER_LOANS_ENDPOINT = "api/loan/applications";
export const CREATE_LOAN_REQ_ENDPOINT = "api/loan/applications";
export const RETRIVE_LOAN_REPAYMENTS_ENDPOINT =
  "api/repayment/loans/repayments/history/67485bedfdb3bdb6246a7b14"; // loanID

// REPAYMENT APIS
export const PAY_LOAN_REPAYMENT_ENDPOINT =
  "api/repayment/loans/repayments/6748a3dec380eef6fad5ed7d/6748b137ade0954409"; // loanId/repaymentId
