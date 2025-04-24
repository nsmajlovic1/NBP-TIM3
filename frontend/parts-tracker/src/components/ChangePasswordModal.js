import { useState } from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import API from "../services/api";  
import { toast } from "react-toastify";

const ChangePasswordModal = ({ open, onClose }) => {
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");

  const handleChangePassword = async () => {
    try {
      const response = await API.patch("/auth/password", { newPassword });
      if (response.status === 200) {
        onClose();  

        toast.success('Password changed successfully!');

        setNewPassword(""); 
      }
    } catch (err) {
      
      toast.error('An error occurred! Try again later.');
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Change Password
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        <TextField
          label="New Password"
          type="password"
          variant="outlined"
          fullWidth
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button variant="outlined" color="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={handleChangePassword}>
            Submit
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ChangePasswordModal;
