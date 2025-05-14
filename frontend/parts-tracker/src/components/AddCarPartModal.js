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
} from '@mui/material';
import { toast } from 'react-toastify';
import { getStoragesByTeam } from '../services/storageService';
import { getDriversByTeam } from '../services/driversService';
import { createCarPart } from '../services/carPartService';

const AddCarPartModal = ({ open, onClose, onCarPartAdded }) => {
  const [driverId, setDriverId] = useState('');
  const [storageId, setStorageId] = useState('');
  const [name, setName] = useState('');
  const [manufacturedAt, setManufacturedAt] = useState('');
  const [homologationNumber, setHomologationNumber] = useState('');
  const [description, setDescription] = useState('');
  const [weight, setWeight] = useState('');
  const [status, setStatus] = useState('');
  const [storages, setStorages] = useState([]);
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const teamId = storedUser?.teamId;
        const storagesData = await getStoragesByTeam(teamId); 
        const driversData = await getDriversByTeam(teamId);   
        setStorages(storagesData.content);
        setDrivers(driversData);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load data.");
      }
    };

    fetchInitialData();
  }, []);

  const handleManufacturedAtChange = (e) => {
    const localDateTime = e.target.value;
    if (localDateTime) {
      const isoString = new Date(localDateTime).toISOString();
      setManufacturedAt(isoString);
    } else {
      setManufacturedAt('');
    }
  };

  const handleSave = async () => {
    try {
      const carPartData = {
        driverId: parseInt(driverId),
        storageId: parseInt(storageId),
        name,
        manufacturedAt, 
        homologationNumber,
        description,
        weight: parseFloat(weight),
        status
      };

      await createCarPart(carPartData);
      onCarPartAdded();
      onClose();
      toast.success('Car part added successfully!');
    } catch (error) {
      toast.error('Failed to add car part.');
      console.error(error);
    }
  };

  const getLocalDateTimeValue = (isoString) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    const localDateTime = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 16);
    return localDateTime;
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Add New Car Part</DialogTitle>
      <DialogContent>
        <Box component="form" noValidate sx={{ 
          mt: 1,
          '& .MuiFormControl-root': { 
            my: 1,
            minHeight: '50px' 
          }
        }}>
          <TextField
            label="Name"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <Box display="flex" gap="10px">
            <TextField
              label="Manufactured At"
              type="datetime-local"
              fullWidth
              value={getLocalDateTimeValue(manufacturedAt)}
              onChange={handleManufacturedAtChange}
              required
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Homologation Number"
              fullWidth
              value={homologationNumber}
              onChange={(e) => setHomologationNumber(e.target.value)}
              required
            />
          </Box>

          <TextField
            label="Description"
            fullWidth
            multiline
            rows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <Box display="flex" gap="10px">
            <TextField
              label="Weight"
              type="number"
              fullWidth
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              required
            />
            <TextField
              label="Status"
              fullWidth
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            />
          </Box>

          <FormControl fullWidth>
            <InputLabel>Driver</InputLabel>
            <Select
              value={driverId}
              onChange={(e) => setDriverId(e.target.value)}
              label="Driver"
              required
            >
              {drivers.map((driver) => (
                <MenuItem key={driver.id} value={driver.id}>
                  {driver.firstName} {driver.lastName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Storage</InputLabel>
            <Select
              value={storageId}
              onChange={(e) => setStorageId(e.target.value)}
              label="Storage"
              required
            >
              {storages.map((storage) => (
                <MenuItem key={storage.id} value={storage.id}>
                  {storage.location.streetName}, {storage.location.cityName}, {storage.location.countryIso}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained" color="primary">
          Save Car Part
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddCarPartModal;