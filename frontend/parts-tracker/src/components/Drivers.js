import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
const Drivers = () => {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUserRole(storedUser?.role || "Guest");
  }, []);
  return (
    <Box sx={{ p: 3, height: "100vh", display: "flex", flexDirection: "column" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
      <Typography variant="h4">
        {userRole === "Mechanic" || userRole === "Logistic"
          ? `Your Team's Drivers (${drivers.length})`
          : `Drivers List (${drivers.length})`}
      </Typography>
      </Box>
      <Box sx={{ height: "300px", opacity: 0 }} />
    </Box>
  );
};

export default Drivers;
