import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  IconButton,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import { removeTeamMember } from "../services/teamService";

const TeamMembersModal = ({ open, onClose, team, fetchTeamData }) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState(null);

  const onDeleteMember = async (teamId, userId) => {
    try {
      const result = await removeTeamMember(teamId, userId);

      if (result) {
        toast.success("Member successfully removed from team!");
        fetchTeamData(teamId); 
      }
    } catch (error) {
      toast.error("Member could not be removed. Try again later.");
    }
  };

  const handleDeleteClick = (member) => {
    setMemberToDelete(member);
    setOpenDeleteModal(true);
  };

  const handleDeleteCancel = () => {
    setOpenDeleteModal(false);
    setMemberToDelete(null);
  };

  const handleDeleteConfirm = () => {
    if (memberToDelete) {
      onDeleteMember(team.id, memberToDelete.userId);
    }
    setOpenDeleteModal(false);
    setMemberToDelete(null);
  };

  if (!team) return null;

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
        <DialogTitle sx={{ m: 0, p: 2 }}>
          <Typography variant="h6" sx={{ color: "black" }}>
            Members of "{team.name}" Team
          </Typography>
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers sx={{ maxHeight: "60vh" }}>
          {team.teamMembers?.length > 0 ? (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {team.teamMembers.map((member) => (
                <Card
                  variant="outlined"
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    padding: 2,
                    gap: 1,
                  }}
                  key={member.userId}
                >
                  <Box sx={{ display: "flex", width: "100%", justifyContent: "space-between" }}>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="subtitle1" fontWeight="bold" sx={{ color: "black" }}>
                        {member.firstName} {member.lastName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ color: "black" }}>
                        Email: {member.email}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ color: "black" }}>
                        Role: {member.role}
                      </Typography>
                    </Box>
                    <IconButton
                      aria-label="delete"
                      onClick={() => handleDeleteClick(member)}
                      sx={{ color: "red", alignSelf: "flex-start" }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Card>
              ))}
            </Box>
          ) : (
            <Typography variant="body1">
              There are currently no members in this team.
            </Typography>
          )}
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={onClose} variant="contained" color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openDeleteModal} onClose={handleDeleteCancel}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to remove "{memberToDelete?.firstName} {memberToDelete?.lastName} from the team"?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TeamMembersModal;
