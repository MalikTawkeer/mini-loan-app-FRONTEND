import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function SelectSmall({ setStatus }) {
  const [showBy, setShowBy] = React.useState("");

  const handleChange = (event) => {
    setShowBy(event.target.value);
    if (event.target.value !== "") setStatus(event.target.value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small-label">Filter by Status</InputLabel>

      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={showBy}
        label="Filter by Status"
        onChange={handleChange}
      >
        <MenuItem value="">
          <em>Filter by Payment Status</em>
        </MenuItem>
        <MenuItem value={"PENDING"}>PENDING</MenuItem>
        <MenuItem value={"PAID"}>PAID</MenuItem>
        <MenuItem value={"APPROVED"}>APPROVED</MenuItem>
      </Select>
    </FormControl>
  );
}
