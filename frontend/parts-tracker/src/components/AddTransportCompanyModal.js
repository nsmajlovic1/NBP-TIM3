import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Box
} from "@mui/material";
import { toast } from "react-toastify";

const AddTransportCompanyModal = ({ open, onClose, onCompanyAdded }) => {
  const [companyName, setCompanyName] = useState("");
  const [description, setDescription] = useState("");

  const handleSave = async () => {
    const newCompany = {
      name: companyName,
      description: description,
    };

    try {
      await onCompanyAdded(newCompany);
      setCompanyName("");
      setDescription("");
      onClose();
    } catch (error) {
      toast.error('An error occurred! Try again later.');
      console.error("Error saving transport company:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Add Transport Company</DialogTitle>
      <DialogContent>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            label="Company Name"
            fullWidth
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            label="Description"
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            margin="normal"
            required
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={handleSave}
          variant="contained"
          color="primary"
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTransportCompanyModal;
