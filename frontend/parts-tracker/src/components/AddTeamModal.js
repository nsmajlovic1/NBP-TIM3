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
import { createTeam } from '../services/teamService';
import { toast } from 'react-toastify';

const AddTeamModal = ({ open, onClose, onTeamAdded }) => {
  const [team, setTeam] = useState({
    name: '',
    description: '',
    countryIso: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTeam(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const createdTeam = await createTeam(team);
      toast.success('Team created successfully!');
      onTeamAdded(createdTeam);
      onClose();
      setTeam({ name: '', description: '', countryIso: '' });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create team');
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Team</DialogTitle>
      <DialogContent>
        <Box component="form" sx={{ mt: 1 }}>
          <TextField
            name="name"
            label="Team Name"
            fullWidth
            value={team.name}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            name="description"
            label="Description"
            fullWidth
            value={team.description}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            name="countryIso"
            label="Country ISO"
            fullWidth
            value={team.countryIso}
            onChange={handleChange}
            margin="normal"
            required
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
      <Button 
        onClick={onClose} 
        variant="text" 
        color="primary"
        sx={{ height: '40px' }}
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

export default AddTeamModal;