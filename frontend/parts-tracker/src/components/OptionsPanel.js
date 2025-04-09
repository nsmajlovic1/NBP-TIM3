import { Button, List, ListItem, Typography, Box } from "@mui/material";
import { useState } from "react";

const OptionsPanel = ({ onOptionSelect }) => {
  const [selectedOption, setSelectedOption] = useState("Dashboard");

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
        <ListItem>
          <Button
            fullWidth
            variant={selectedOption === "Add User" ? "contained" : "outlined"}
            onClick={() => handleOptionClick("Add User")}
          >
            Add User
          </Button>
        </ListItem>
      </List>
    </Box>
  );
};

export default OptionsPanel;
