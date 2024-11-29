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

import { fetchUserLoans } from "../../services/loan.services.js";
import { AuthContext } from "../../store/auth.context.jsx";

function createData(name, calories, fat) {
  return {
    name,
    calories,
    fat,
    history: [
      {
        date: "2020-01-05",
        customerId: "11091700",
        amount: 3,
      },
      {
        date: "2020-01-02",
        customerId: "Anonymous",
        amount: 1,
      },
    ],
  };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0),
  createData("Ice cream sandwich", 237, 9.0),
  createData("Eclair", 262, 16.0),
  createData("Cupcake", 305, 3.7),
  createData("Gingerbread", 356, 16.0),
];

const LoanTable = () => {
  const { token } = React.useContext(AuthContext);

  const [loans, setLoans] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    fetchUserLoans(token)
      .then((res) => {
        setLoans(res?.data?.loans);
        console.log(res?.data?.loans);

        setError("");
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setError(err?.message);
        console.log(err, "EEEERRRRRRR");
      });
  }, []);

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
          <Button variant="contained" color="primary" startIcon={<MoneyIcon />}>
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
            {loans.map((row) => (
              <Row key={row.name} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default LoanTable;
