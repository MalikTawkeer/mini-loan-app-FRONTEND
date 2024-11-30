import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import MoneyIcon from "@mui/icons-material/Money";
import Typography from "@mui/material/Typography";

import Row from "./loan.table.row";
import Container from "../container";
import Modal from "../modal.component";
import LoanApplicationForm from "./loan.application.form.jsx";

import { AuthContext } from "../../store/auth.context.jsx";
import { LoanContext } from "../../store/loan.context.jsx";

const LoanTable = () => {
  const { token } = React.useContext(AuthContext);
  const { fetchUserLoans, loans, loading, error } =
    React.useContext(LoanContext);

  React.useEffect(() => {
    fetchUserLoans();
  }, []);

  // MODAL STATES
  const [openModel, setOpenModel] = React.useState(false);

  return (
    <Container>
      <Typography
        variant="h4"
        fontWeight={"bold"}
        gutterBottom
        component="div"
        marginTop={4}
        marginLeft={1}
        color="#000000ce"
      >
        Your Loan Dashboard
      </Typography>

      <TableContainer component={Paper} className=" mt-5 mb-10">
        <div className=" flex justify-end px-5 py-3 mt-4">
          <Button
            onClick={() => setOpenModel(true)}
            variant="contained"
            color="primary"
            startIcon={<MoneyIcon />}
          >
            New Loan
          </Button>
        </div>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: "bold" }}>Repayments</TableCell>

              <TableCell style={{ fontWeight: "bold" }}>Amount ($)</TableCell>

              <TableCell style={{ fontWeight: "bold" }} align="right">
                Term
              </TableCell>

              <TableCell style={{ fontWeight: "bold" }} align="right">
                Status
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {loans?.map((row) => (
              <Row key={row._id} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {openModel && (
        <Modal
          title={"Repayment form"}
          open={openModel}
          closeModal={setOpenModel}
        >
          {<LoanApplicationForm closeModal={setOpenModel} />}
        </Modal>
      )}
    </Container>
  );
};

export default LoanTable;
