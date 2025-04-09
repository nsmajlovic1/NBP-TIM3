import { Box, Typography } from "@mui/material";
import AddUserForm from "./AddUserForm";

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

      {selectedOption === "Add User" && (
        <AddUserForm />
      )}
    </Box>
  );
};

export default DashboardContent;
