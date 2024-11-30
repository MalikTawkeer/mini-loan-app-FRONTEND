import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Alert, Button, useStepContext } from "@mui/material";
import { BeatLoader } from "react-spinners";

import { AuthContext } from "../../store/auth.context.jsx";

import { LoanContext } from "../../store/loan.context.jsx";

const Form = ({ loanId, repaymentId, amount, closeModel }) => {
  const { token } = React.useContext(AuthContext);
  const { applyNewLoan, fetchUserLoans } = React.useContext(LoanContext);

  const [loanForm, setLoanForm] = React.useState({
    amount: 0,
    term: 0,
  });

  const [successMsg, setSuccessMsg] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(false);

  const inputFeilds = [
    { name: "amount", label: "Enter amount", placeholder: "2000" },
    { name: "term", label: "Enter term", placeholder: "2" },
  ];

  const handleSubmit = () => {
    setError("");

    if (loanForm.amount <= 0 || loanForm.term <= 0)
      return setError("Plase enter valid input values");

    setIsLoading(true);

    applyNewLoan(loanForm)
      .then((res) => {
        console.log(res);
        setIsLoading(false);

        if (res?.status == 201) {
          fetchUserLoans();
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
          <Alert severity="error">{error || "Somthing went wrong!"}</Alert>
        )}

        {!isLoading && !error && successMsg && (
          <Alert severity="success">{successMsg || "Success"}</Alert>
        )}
      </div>

      <div className=" flex flex-row justify-between items-center">
        {inputFeilds?.map((feild) => (
          <TextField
            key={feild.name}
            id="standard-number"
            label={feild.label}
            type="number"
            variant="standard"
            value={loanForm[feild.name]}
            onChange={(e) =>
              setLoanForm((prev) => ({
                ...prev,
                [feild.name]: e.target.value,
              }))
            }
            placeholder={feild.placeholder}
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
          />
        ))}

        <Button onClick={handleSubmit} disabled={isLoading} variant="contained">
          {isLoading ? <BeatLoader size={8} color="white" /> : "Add"}
        </Button>
      </div>
    </>
  );
};

export default Form;
