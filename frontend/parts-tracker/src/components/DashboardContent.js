import { Box, Typography } from "@mui/material";
const DashboardContent = ({ selectedOption }) => {
  return (
    <Box>
      {selectedOption === "Dashboard" && (
        <div style={{ padding: "20px" }}>
          <Typography variant="h4" sx={{ fontFamily: "'Roboto', 'Arial', sans-serif" }}>
            Welcome to the Dashboard!
          </Typography>
        </div>
      )}
    </Box>
  );
};

export default DashboardContent;
