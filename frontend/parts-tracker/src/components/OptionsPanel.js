import { List, ListItem, ListItemButton, ListItemText, Box } from "@mui/material";
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

  const menuItems = [
    { label: "Dashboard", roles: ["Admin", "Logistic", "Mechanic"] },
    { label: "My Team", roles: ["Mechanic", "Logistic"] },
    { label: "Drivers", roles: ["Admin", "Logistic"] },
    { label: "Add User", roles: ["Admin"] },
    { label: "Car Parts", roles: ["Logistic", "Mechanic"] },
    { label: "Storages", roles: ["Admin", "Logistic", "Mechanic"] },
    { label: "Transport Companies", roles: ["Admin", "Logistic"] },
    { label: "Teams", roles: ["Admin"] },
    { label: "Transport", roles: ["Admin", "Logistic", "Mechanic"] },
  ];

  return (
    <Box sx={{ width: 300, paddingTop: 0, borderRight: "1px solid #ddd" }}>
      <List disablePadding>
        {menuItems
          .filter((item) => item.roles.includes(userRole))
          .map((item) => (
            <ListItem disablePadding key={item.label}>
              <ListItemButton
                onClick={() => handleOptionClick(item.label)}
                sx={{
                  borderRadius: 0,
                  paddingY: 1,
                  paddingX: 2,
                  backgroundColor: selectedOption === item.label ? "#003366" : "transparent",
                  color: selectedOption === item.label ? "white" : "black",
                  "&:hover": {
                    backgroundColor: selectedOption === item.label ? "#003366" : "#f0f0f0",
                  },
                }}
              >
                <ListItemText primary={item.label} />
              </ListItemButton>

            </ListItem>
          ))}
      </List>
    </Box>
  );
};

export default OptionsPanel;
