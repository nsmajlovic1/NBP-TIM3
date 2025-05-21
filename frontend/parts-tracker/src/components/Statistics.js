import { Box, Typography } from "@mui/material";
import CarPartStatistic from "./CarPartStatistic";
import PackageStatistic from "./PackageStatistic";

const Statistics = () => {
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
        Your Team's Statistics Overview
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
        <CarPartStatistic />
        <PackageStatistic />
      </Box>
    </Box>
  );
};

export default Statistics;
