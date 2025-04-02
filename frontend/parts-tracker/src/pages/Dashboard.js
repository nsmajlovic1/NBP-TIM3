import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { AppBar, Toolbar, IconButton, Typography, Menu, MenuItem, Box } from "@mui/material";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
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

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton edge="end" color="inherit" aria-label="user profile" sx={{ marginRight: 1 }}>
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
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          style: {
            width: "200px",
            marginTop: "16px",
            right: "-200px"
          }
        }}
      >
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>

      <div style={{ padding: "20px" }}>
        <Typography variant="h4" sx={{ fontFamily: "'Roboto', 'Arial', sans-serif" }}>
          Welcome, {user.username}!
        </Typography>
      </div>
    </div>
  );
};

export default Dashboard;
