import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import ShowByDrowdown from "./show.by.dropdown.component";
import { LoanContext } from "../../store/loan.context";
import { Button, Chip, Typography } from "@mui/material";
import { FadeLoader } from "react-spinners";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const headNames = ["Loan ID", "Amount ($)", "Term", "Status", "Actions"];

export default function CustomizedTables() {
  const { getLoansByStatus, approveLoanByLoanId, loans, loading, error } =
    React.useContext(LoanContext);

  const [status, setStatus] = React.useState("PENDING");

  React.useEffect(() => {
    getLoansByStatus(status);
  }, [status]);

  const handleApproveLoan = async (loanId) => {
    await approveLoanByLoanId(loanId);
    await getLoansByStatus(status);
  };

  return (
    <TableContainer
      style={{ marginTop: 20, marginBottom: 10 }}
      component={Paper}
    >
      <Typography
        variant="h4"
        fontWeight={"bold"}
        gutterBottom
        component="div"
        marginTop={4}
        marginLeft={5}
        textAlign={"left"}
        color="#000000ce"
      >
        Customer Loans
      </Typography>

      {/* HEAD */}
      <div className=" flex flex-row justify-end items-center py-4 px-4">
        <ShowByDrowdown setStatus={setStatus} />
      </div>

      {loading && !error && (
        <div className=" flex flex-row justify-center items-center">
          <FadeLoader color="teal" />{" "}
        </div>
      )}

      {!loading && !error && loans?.length > 0 && (
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              {headNames?.map((title) => (
                <StyledTableCell key={title} align="left">
                  {title}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {loans.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                  {row?._id}
                </StyledTableCell>
                <StyledTableCell align="left">{row?.amount}</StyledTableCell>
                <StyledTableCell align="left">{row?.term}</StyledTableCell>
                <StyledTableCell align="left">
                  <Chip
                    label={row?.state}
                    variant="filled"
                    color={
                      row?.state === "PENDING"
                        ? "warning"
                        : row?.state === "APPROVED"
                        ? "success"
                        : "info"
                    }
                  />
                </StyledTableCell>

                <StyledTableCell align="left">
                  <Button
                    disabled={
                      loading || row?.state === "PENDING" ? false : true
                    }
                    variant="contained"
                    onClick={() => {
                      handleApproveLoan(row?._id);
                    }}
                  >
                    Approve
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </TableContainer>
  );
}
