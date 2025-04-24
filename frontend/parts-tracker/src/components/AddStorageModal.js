import { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Box,
} from "@mui/material";
import { getAddresses } from "../services/addressService";
import { getTeams } from "../services/teamService";
import { addStorage } from "../services/storageService";

const AddStorageModal = ({ open, onClose, onStorageAdded }) => {
  const [capacity, setCapacity] = useState("");
  const [teamId, setTeamId] = useState("");
  const [addressId, setAddressId] = useState("");
  const [teams, setTeams] = useState([]);
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    const fetchTeamsAndAddresses = async () => {
      try {
        const teamsData = await getTeams();
        const addressesData = await getAddresses();
        setTeams(teamsData.content);
        setAddresses(addressesData.content);
      } catch (error) {
        console.error("Error fetching teams and addresses:", error);
      }
    };

    fetchTeamsAndAddresses();
  }, []);

  const handleSave = async () => {
    const storageRequest = {
      capacity: parseInt(capacity),
      teamId: parseInt(teamId),
      addressId: parseInt(addressId),
    };

    try {
      await addStorage(storageRequest);
      onClose();
      onStorageAdded();
    } catch (error) {
      console.error("Error saving storage:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Storage</DialogTitle>
      <DialogContent>
        <Box component="form" noValidate sx={{ minWidth: 400 }}>
          <TextField
            label="Capacity"
            type="number"
            fullWidth
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            margin="normal"
            required
          />

          <FormControl fullWidth margin="normal">
            <InputLabel>Team</InputLabel>
            <Select
              value={teamId}
              onChange={(e) => setTeamId(e.target.value)}
              label="Team"
              required
            >
              {teams.map((team) => (
                <MenuItem key={team.id} value={team.id}>
                  {team.name} ({team.countryIso})
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel>Address</InputLabel>
            <Select
              value={addressId}
              onChange={(e) => setAddressId(e.target.value)}
              label="Address"
              required
            >
              {addresses.map((address) => (
                <MenuItem key={address.id} value={address.id}>
                  {address.streetName}, {address.cityName}, {address.countryIso}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddStorageModal;
