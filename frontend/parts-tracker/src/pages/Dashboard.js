import { useState } from "react";
import { useAuth } from "../context/AuthContext"; 
import { AppBar, Toolbar, IconButton, Typography, Menu, MenuItem, Box } from "@mui/material";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ChangePasswordModal from "../components/ChangePasswordModal";
import OptionsPanel from "../components/OptionsPanel";
import AddUserForm from "../components/AddUserForm";
import TransportCompanies from "../components/TransportCompanies"; 
import Storages from "../components/Storages";
import Teams from "../components/Teams";
import Transport from "../components/Transport";
import Drivers from "../components/Drivers";
import MyTeam from "../components/MyTeam";
import CarParts from "../components/CarParts";

const Dashboard = () => {
  const { user, logout } = useAuth(); 
  const [anchorEl, setAnchorEl] = useState(null);
  const [openModal, setOpenModal] = useState(false); 
  const [selectedOption, setSelectedOption] = useState("Dashboard");
  const navigate = useNavigate();

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "97vh", overflow: "hidden" }}>
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton edge="end" color="inherit" aria-label="user profile" sx={{ marginRight: 1 }} onClick={handleMenuClick}>
              <FaUserCircle size={30} />
            </IconButton>
            <Typography variant="h6" sx={{ marginRight: 2, cursor: "pointer" }} onClick={handleMenuClick}>
              {user?.username}
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
  
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          style: {
            position: "absolute",
            top: "64px",
            right: "0px",
            width: "200px",
            marginTop: "60px",
          },
        }}
      >
        <MenuItem onClick={handleOpenModal}>Change Password</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
  
      <div style={{ display: "flex", flexGrow: 1, overflow: "hidden" }}>
        <OptionsPanel onOptionSelect={handleOptionSelect} />
  
        <div style={{ flexGrow: 1, paddingTop: "20px", paddingLeft: "20px", paddingRight: "20px", overflow: "hidden", paddingBottom: "20px" }}>
          {selectedOption === "Dashboard" && (
            <Typography variant="h4" sx={{ fontFamily: "'Roboto', 'Arial', sans-serif" }}>
              Welcome, {user.username}!
            </Typography>
          )}
  
          {selectedOption === "Add User" && <AddUserForm />}
          {selectedOption === "Transport Companies" && <TransportCompanies />} 
          {selectedOption === "Storages" && <Storages />}
          {selectedOption === "Teams" && <Teams />}
          {selectedOption === "Transport" && <Transport />} 
          {selectedOption === "Drivers" && <Drivers />}
          {selectedOption === "My Team" && <MyTeam />}
          {selectedOption === "Car Parts" && <CarParts />}
        </div>
      </div>
  
      <ChangePasswordModal open={openModal} onClose={handleCloseModal} />
    </div>
  );
}

export default Dashboard;
