import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Alert, Button, useStepContext } from "@mui/material";
import { BeatLoader } from "react-spinners";

import { AuthContext } from "../../store/auth.context.jsx";

import { payLoanRepament } from "../../services/loan.repayment.services.js";
import { LoanContext } from "../../store/loan.context.jsx";

const Form = ({ loanId, repaymentId, amount, closeModel }) => {
  const { token } = React.useContext(AuthContext);
  const { fetchUserLoans } = React.useContext(LoanContext);

  const [amt, setAmt] = React.useState(0);
  const [successMsg, setSuccessMsg] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(false);

  const handleSubmit = () => {
    setIsLoading(true);
    setError("");

    payLoanRepament(token, loanId, repaymentId, amt || amount)
      .then((res) => {
        console.log(res);
        setIsLoading(false);

        if (res?.status == 200) {
          setSuccessMsg(res?.data?.message);
          fetchUserLoans();
        }

        if (res.status == 400) setError(res?.response?.data?.message);
      })
      .catch((err) => {
        console.log(err, "err");
        setIsLoading(false);
      });
  };

  return (
    <>
      <div className=" mb-2 flex flex-row justify-center items-center">
        {!isLoading && error && (
          <Alert severity="error">
            {error?.localErr || error || "Somthing went wrong!"}
          </Alert>
        )}

        {!isLoading && !error && successMsg && (
          <Alert severity="success">{successMsg || "Success"}</Alert>
        )}
      </div>

      <div className=" flex flex-row justify-between items-center">
        <TextField
          id="standard-number"
          label="Enter amount"
          type="number"
          variant="standard"
          value={amt || amount}
          onChange={(e) => setAmt(e.target.value)}
          placeholder="e.g, 2000"
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
        />
        <Button onClick={handleSubmit} disabled={isLoading} variant="contained">
          {isLoading ? <BeatLoader size={8} color="white" /> : "Pay"}
        </Button>
      </div>
    </>
  );
};

export default Form;
