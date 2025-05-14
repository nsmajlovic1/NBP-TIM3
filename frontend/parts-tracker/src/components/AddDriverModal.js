import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  MenuItem
} from "@mui/material";
import { toast } from "react-toastify";
import { getTeams } from "../services/teamService";
import { createDriver } from "../services/driversService"; 

const AddDriverModal = ({ open, onClose, fetchDrivers }) => {
  const [driver, setDriver] = useState({
    firstName: "",
    lastName: "",
    countryIso: "",
    carNumber: "",
    teamId: ""
  });

  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const fetchTeamsData = async () => {
      try {
        const data = await getTeams(0, 100);
        setTeams(data.content || []);
      } catch (error) {
        toast.error("Failed to fetch teams.");
      }
    };

    if (open) fetchTeamsData();
  }, [open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDriver((prev) => ({ ...prev, [name]: value }));
  };

  const clearForm = () => {
    setDriver({
      firstName: "",
      lastName: "",
      countryIso: "",
      carNumber: "",
      teamId: ""
    });
  };

  const handleSubmit = async () => {
    try {
      await createDriver(driver);
      toast.success("Driver created successfully!");
      clearForm();
      await fetchDrivers();
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create driver");
      clearForm();
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Driver</DialogTitle>
      <DialogContent>
        <Box component="form" sx={{ mt: 1 }}>
          <TextField
            name="firstName"
            label="First Name"
            fullWidth
            value={driver.firstName}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            name="lastName"
            label="Last Name"
            fullWidth
            value={driver.lastName}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            name="countryIso"
            label="Country ISO"
            fullWidth
            value={driver.countryIso}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            name="carNumber"
            label="Car Number"
            type="number"
            fullWidth
            value={driver.carNumber}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            select
            name="teamId"
            label="Team"
            fullWidth
            value={driver.teamId}
            onChange={handleChange}
            margin="normal"
            required
          >
            {teams.map((team) => (
              <MenuItem key={team.id} value={team.id}>
                {team.name}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} variant="text" color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddDriverModal;
