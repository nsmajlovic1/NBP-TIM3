import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box
} from '@mui/material';
import { createAddress } from '../services/addressService';
import { toast } from 'react-toastify';

const AddAddressModal = ({ open, onClose, onAddressAdded }) => {
  const [address, setAddress] = useState({
    streetName: '',
    cityName: '',
    countryIso: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const createdAddress = await createAddress(address);
      onAddressAdded(createdAddress);
      onClose();
      toast.success('Address created successfully!');
      setAddress({ streetName: '', cityName: '', countryIso: '' });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create address');
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Address</DialogTitle>
      <DialogContent>
        <Box component="form" sx={{ mt: 1 }}>
          <TextField
            name="streetName"
            label="Street Name"
            fullWidth
            value={address.streetName}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            name="cityName"
            label="City Name"
            fullWidth
            value={address.cityName}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            name="countryIso"
            label="Country ISO"
            fullWidth
            value={address.countryIso}
            onChange={handleChange}
            margin="normal"
            required
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          color="primary"
          sx={{ height: '40px', borderWidth: '2px' }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          sx={{ height: '40px' }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddAddressModal;
