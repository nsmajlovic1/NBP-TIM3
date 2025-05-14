import { Button, List, ListItem, Box } from "@mui/material";
import { useState, useEffect } from "react";

const OptionsPanel = ({ onOptionSelect }) => {
  const [selectedOption, setSelectedOption] = useState("Dashboard");
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUserRole(storedUser?.role);
  }, []);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    onOptionSelect(option);
  };

  return (
    <Box sx={{ width: 200, padding: "10px", borderRight: "1px solid #ddd" }}>
      <List>
        <ListItem>
          <Button
            fullWidth
            variant={selectedOption === "Dashboard" ? "contained" : "outlined"}
            onClick={() => handleOptionClick("Dashboard")}
          >
            Dashboard
          </Button>
        </ListItem>

        {["Mechanic", "Logistic"].includes(userRole) && (
          <ListItem>
            <Button
              fullWidth
              variant={selectedOption === "My Team" ? "contained" : "outlined"}
              onClick={() => handleOptionClick("My Team")}
            >
              My Team
            </Button>
          </ListItem>
        )}

        {["Admin", "Logistic"].includes(userRole) && (
          <ListItem>
            <Button
              fullWidth
              variant={selectedOption === "Drivers" ? "contained" : "outlined"}
              onClick={() => handleOptionClick("Drivers")}
            >
              Drivers
            </Button>
          </ListItem>
        )}

        {userRole === "Admin" && (
          <ListItem>
            <Button
              fullWidth
              variant={selectedOption === "Add User" ? "contained" : "outlined"}
              onClick={() => handleOptionClick("Add User")}
            >
              Add User
            </Button>
          </ListItem>
        )}

        {["Logistic", "Mechanic"].includes(userRole) && (
          <ListItem>
            <Button
              fullWidth
              variant={selectedOption === "Car Parts" ? "contained" : "outlined"}
              onClick={() => handleOptionClick("Car Parts")}
            >
              Car Parts
            </Button>
          </ListItem>
        )}

        {["Admin", "Logistic", "Mechanic"].includes(userRole) && (
          <ListItem>
            <Button
              fullWidth
              variant={selectedOption === "Storages" ? "contained" : "outlined"}
              onClick={() => handleOptionClick("Storages")}
            >
              Storages
            </Button>
          </ListItem>
        )}

        {["Admin", "Logistic"].includes(userRole) && (
          <ListItem>
            <Button
              fullWidth
              variant={selectedOption === "Transport Companies" ? "contained" : "outlined"}
              onClick={() => handleOptionClick("Transport Companies")}
            >
              Transport Companies
            </Button>
          </ListItem>
        )}

        {["Admin"].includes(userRole) && (
          <ListItem>
            <Button
              fullWidth
              variant={selectedOption === "Teams" ? "contained" : "outlined"}
              onClick={() => handleOptionClick("Teams")}
            >
              Teams
            </Button>
          </ListItem>
        )}

        {["Admin", "Logistic", "Mechanic"].includes(userRole) && (
          <ListItem>
            <Button
              fullWidth
              variant={selectedOption === "Transport" ? "contained" : "outlined"}
              onClick={() => handleOptionClick("Transport")}
            >
              Transport
            </Button>
          </ListItem>
        )}

      </List>
    </Box>
  );
};

export default OptionsPanel;
