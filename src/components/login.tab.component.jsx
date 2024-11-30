import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";

import UserLogin from "./user.login.component";
import AdminLogin from "./admin/admin.login.component";
import { AuthContext } from "../store/auth.context";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

const LoginTabs = () => {
  const { setError, setLoading } = useContext(AuthContext);
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setError("");
    setLoading(false);
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="wrapped label tabs example"
      >
        <Tab sx={{ color: "green", fontWeight: "bold" }} label="USER" wrapped />
        <Tab sx={{ color: "green", fontWeight: "bold" }} label="ADMIN" />
      </Tabs>

      {/* TabPanel content */}

      {/* USER LOGIN */}
      <TabPanel value={value} index={0}>
        <UserLogin />
      </TabPanel>

      {/* ADMIN LOGIN */}
      <TabPanel value={value} index={1}>
        <AdminLogin />
      </TabPanel>
    </Box>
  );
};

export default LoginTabs;
