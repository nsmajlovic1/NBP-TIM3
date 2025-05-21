import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import CarPartStatistic from "./CarPartStatistic";
import PackageStatistic from "./PackageStatistic";
import TransportStatistic from "./TransportStatistic";

const Statistics = () => {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.role) {
      setUserRole(user.role);
    }
  }, []);

  if (!userRole) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography
        variant="h5"
        sx={{
          fontFamily: "'Roboto', 'Arial', sans-serif",
          color: "black",
          textAlign: "center",
          mb: 2,
        }}
      >
        {userRole === "Admin"
          ? "General Statistics"
          : "Your Team's Statistics Overview"}
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "center",
          alignItems: "center",
          gap: 20,
          flexWrap: "wrap",
        }}
      >
        {userRole === "Admin" ? (
          <>
            <TransportStatistic />
            <PackageStatistic />
          </>
        ) : (
          <>
            <CarPartStatistic />
            <PackageStatistic />
          </>
        )}
      </Box>
    </Box>
  );
};

export default Statistics;
