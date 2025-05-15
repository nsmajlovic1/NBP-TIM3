import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import TeamReport from "./TeamReport";
import AdminReport from "./AdminReport";

const Report = () => {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUserRole(storedUser?.role);
  }, []);

  const renderReportComponent = () => {
    if (userRole === "Admin") {
      return <AdminReport />;
    } else if (userRole === "Mechanic" || userRole === "Logistic") {
      return <TeamReport />;
    } else {
      return <Typography variant="body1">Access denied or role not recognized.</Typography>;
    }
  };

  return (
    <Box>
      {renderReportComponent()}
    </Box>
  );
};

export default Report;
