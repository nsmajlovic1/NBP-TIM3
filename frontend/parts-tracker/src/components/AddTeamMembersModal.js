import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText
} from '@mui/material';
import {
  getAvailableMechanics,
  getAvailableLogistics,
  assignUserToTeam
} from '../services/teamService';
import { toast } from 'react-toastify';

const AddTeamMembersModal = ({ open, onClose, teamId }) => {
  const [role, setRole] = useState('mechanic');
  const [availableUsers, setAvailableUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users =
          role === 'mechanic'
            ? await getAvailableMechanics()
            : await getAvailableLogistics();
        setAvailableUsers(users);
        setSelectedUserId(null);
      } catch (error) {
        toast.error(error.message || 'Failed to load users');
      }
    };

    if (open) fetchUsers();
  }, [role, open]);

  const handleSubmit = async () => {
    if (!selectedUserId) {
      toast.warn('Please select a user to assign.');
      return;
    }

    try {
      await assignUserToTeam(teamId, selectedUserId);
      toast.success('User assigned to team successfully!');
      onClose();
    } catch (error) {
      toast.error(error.message || 'Failed to assign user');
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle color="black">Add Team Member</DialogTitle>
      <DialogContent>
        <ToggleButtonGroup
          value={role}
          exclusive
          onChange={(e, newRole) => {
            if (newRole) setRole(newRole);
          }}
          fullWidth
          sx={{ mb: 2 }}
        >
          <ToggleButton value="mechanic">Add Mechanic</ToggleButton>
          <ToggleButton value="logistic">Add Logistic</ToggleButton>
        </ToggleButtonGroup>

        {availableUsers.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            No available users found for the selected role.
          </Typography>
        ) : (
          <List>
            {availableUsers.map((user) => (
              <ListItem key={user.userId} disablePadding>
                <ListItemButton
                  selected={selectedUserId === user.userId}
                  onClick={() => setSelectedUserId(user.userId)}
                >
                  <ListItemText
                    primary={`${user.firstName} ${user.lastName}`}
                    secondary={user.email}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="text">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" disabled={!selectedUserId}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTeamMembersModal;
