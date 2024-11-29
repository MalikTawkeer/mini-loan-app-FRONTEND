import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Chip } from "@mui/material";
import Button from "@mui/material/Button";
import PaymentIcon from "@mui/icons-material/Payment";

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.amount}
        </TableCell>
        <TableCell align="right">{row.term}</TableCell>

        <TableCell align="right">
          {row?.state === "PENDING" ? (
            <Chip label={row?.state} color="warning" />
          ) : row?.state === "PAID" ? (
            <Chip label={row?.state} color="info" />
          ) : (
            <Chip label={row?.state} variant="filled" color="success" />
          )}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography
                variant="h6"
                fontWeight={"bold"}
                gutterBottom
                component="div"
              >
                Repayments
              </Typography>
              {row?.repayments?.length === 0 && (
                <Typography
                  variant="h6"
                  fontWeight={"bold"}
                  gutterBottom
                  component="div"
                  textAlign={"center"}
                  color="gray"
                  paddingTop={4}
                  paddingBottom={2}
                >
                  Once your loan is approved, your repayment schedule will
                  appear here.
                </Typography>
              )}

              {/* SHOW REPAYMENTS TABLE */}
              {row?.repayments?.length > 0 && (
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center" style={{ fontWeight: "bold" }}>
                        Due Date
                      </TableCell>
                      <TableCell align="center" style={{ fontWeight: "bold" }}>
                        Amount ($)
                      </TableCell>
                      <TableCell align="center" style={{ fontWeight: "bold" }}>
                        Status
                      </TableCell>
                      <TableCell align="center" style={{ fontWeight: "bold" }}>
                        Action
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {row?.repayments?.map((historyRow) => (
                      <TableRow key={historyRow.date}>
                        <TableCell component="th" scope="row" align="center">
                          {
                            new Date(historyRow?.due_date)
                              .toISOString()
                              .split("T")[0]
                          }
                        </TableCell>
                        <TableCell align="center">
                          {historyRow?.amount}
                        </TableCell>

                        <TableCell align="center">
                          {historyRow?.state === "PENDING" ? (
                            <Chip
                              variant="outlined"
                              label={historyRow?.state}
                              color="warning"
                            />
                          ) : (
                            <Chip
                              label={historyRow?.state}
                              variant="outlined"
                              color="info"
                            />
                          )}
                        </TableCell>

                        <TableCell align="center">
                          <Button
                            disabled={historyRow?.state === "PAID"}
                            variant="outlined"
                            startIcon={<PaymentIcon />}
                          >
                            Repay
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default Row;
