import { useState } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Typography } from "@mui/material";
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
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Change Password</DialogTitle>
      <DialogContent sx={{ paddingTop: 3 }}>
        {error && <Typography color="error">{error}</Typography>}
        <TextField
          label="New Password"
          type="password"
          variant="outlined"
          fullWidth
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          sx={{
            marginTop: 5,
            '& .MuiInputLabel-root': {
              top: 1, 
            },
          }}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </DialogContent>
      <DialogActions sx={{ padding: 2 }}>
        <Button 
          onClick={onClose}
          sx={{ mr: 1 }}
        >
          Cancel
        </Button>
        <Button 
          onClick={handleChangePassword} 
          variant="contained" 
          color="primary"
          sx={{ 
            px: 3,
            py: 1
          }}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ChangePasswordModal;