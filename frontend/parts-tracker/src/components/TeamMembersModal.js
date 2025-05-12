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
import CloseIcon from '@mui/icons-material/Close';

const TeamMembersModal = ({ open, onClose, team }) => {
  if (!team) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle sx={{ m: 0, p: 2 }}>
        <Typography variant="h6" sx={{ color: 'black' }}>
          Members of "{team.name}" Team
        </Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ maxHeight: '60vh' }}>
        {team.teamMembers?.length > 0 ? (
          <Grid container spacing={2}>
            {team.teamMembers.map((member) => (
              <Grid item xs={12} sm={6} md={4} key={member.userId}>
                <Card variant="outlined" sx={{ height: '100%' }}>
                  <CardContent>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {member.firstName} {member.lastName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Email: {member.email}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Role: {member.role}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
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
  );
};

export default TeamMembersModal;
