import { useState, useEffect } from 'react';
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
  Stack
} from '@mui/material';
import { getAddresses } from '../services/addressService';
import { getTeams, getTeamById } from '../services/teamService';
import { addStorage } from '../services/storageService';
import { toast } from 'react-toastify';
import AddAddressModal from './AddAddressModal';
import { FaPlus } from 'react-icons/fa';

const AddStorageModal = ({ open, onClose, onStorageAdded }) => {
  const [capacity, setCapacity] = useState('');
  const [teamId, setTeamId] = useState('');
  const [addressId, setAddressId] = useState('');
  const [teams, setTeams] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [newAddressOpen, setNewAddressOpen] = useState(false);
  const [isLogistic, setIsLogistic] = useState(false);
  const [userTeam, setUserTeam] = useState(null);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const role = user?.role;
        const userTeamId = user?.teamId;

        if (role === 'Logistic') {
          setIsLogistic(true);
          const team = await getTeamById(userTeamId);
          setUserTeam(team);
          setTeamId(team.id); 
        } else {
          const teamsData = await getTeams();
          setTeams(teamsData.content);
        }

        const addressesData = await getAddresses();
        setAddresses(addressesData.content);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load data.");
      }
    };

    fetchInitialData();
  }, []);

  const handleSave = async () => {
    try {
      await addStorage({
        capacity: parseInt(capacity),
        teamId: parseInt(teamId),
        addressId: parseInt(addressId)
      });
      onStorageAdded();
      onClose();
      toast.success('Storage added successfully!');
    } catch (error) {
      toast.error('Failed to add storage.');
      console.error(error);
    }
  };

  const handleAddressAdded = (newAddress) => {
    setAddresses([...addresses, newAddress]);
    setAddressId(newAddress.id);
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle>Add New Storage</DialogTitle>
        <DialogContent>
          <Box component="form" noValidate sx={{ mt: 1 }}>
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
                disabled={isLogistic}
              >
                {isLogistic && userTeam ? (
                  <MenuItem value={userTeam.id}>
                    {userTeam.name} ({userTeam.countryIso})
                  </MenuItem>
                ) : (
                  teams.map((team) => (
                    <MenuItem key={team.id} value={team.id}>
                      {team.name} ({team.countryIso})
                    </MenuItem>
                  ))
                )}
              </Select>
            </FormControl>

            <FormControl fullWidth margin="normal">
              <InputLabel>Address</InputLabel>
              <Stack direction="row" spacing={1} alignItems="center">
                <Select
                  value={addressId}
                  onChange={(e) => setAddressId(e.target.value)}
                  label="Address"
                  required
                  sx={{ flexGrow: 1 }}
                >
                  {addresses.map((address) => (
                    <MenuItem key={address.id} value={address.id}>
                      {address.streetName}, {address.cityName}, {address.countryIso}
                    </MenuItem>
                  ))}
                </Select>
                <Button
                  size="small"
                  onClick={() => setNewAddressOpen(true)}
                  sx={{
                    height: '40px',
                    whiteSpace: 'nowrap',
                    border: '1px solid',
                    borderColor: 'primary.main',
                    paddingLeft: "10px",
                    paddingRight: "10px"
                  }}
                  startIcon={<FaPlus />}
                >
                  New Address
                </Button>
              </Stack>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            Save Storage
          </Button>
        </DialogActions>
      </Dialog>

      <AddAddressModal
        open={newAddressOpen}
        onClose={() => setNewAddressOpen(false)}
        onAddressAdded={handleAddressAdded}
      />
    </>
  );
};

export default AddStorageModal;
