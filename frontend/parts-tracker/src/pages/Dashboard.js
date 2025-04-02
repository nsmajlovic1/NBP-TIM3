import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { AppBar, Toolbar, IconButton, Typography, Menu, MenuItem, Box } from "@mui/material";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ChangePasswordModal from "../components/ChangePasswordModal";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const [openModal, setOpenModal] = useState(false); 
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

  const handlePasswordChange = () => {
    alert("Password changed successfully!");
  };

  return (
    <div>
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

      <div style={{ padding: "20px" }}>
        <Typography variant="h4" sx={{ fontFamily: "'Roboto', 'Arial', sans-serif" }}>
          Welcome, {user.username}!
        </Typography>
      </div>

      <ChangePasswordModal
        open={openModal}
        onClose={handleCloseModal}
        onPasswordChange={handlePasswordChange}
      />
    </div>
  );
};

export default Dashboard;
