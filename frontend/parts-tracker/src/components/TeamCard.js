import { useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Box,
  Paper,
  Button,
} from "@mui/material";
import AddTeamMembersModal from "./AddTeamMembersModal";

const TeamCard = ({ team, onViewMembers }) => {
  const [openAddModal, setOpenAddModal] = useState(false);

  return (
    <>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          border: "1px solid #ccc",
          minHeight: "130px",
        }}
      >
        <CardContent sx={{ p: "12px !important" }}>
          <Box sx={{ display: "flex", mb: 1 }}>
            <Typography
              sx={{ fontSize: "14px", fontWeight: "bold", color: "black", mr: 1 }}
            >
              Name:
            </Typography>
            <Typography sx={{ fontSize: "14px", color: "black" }}>{team.name}</Typography>
          </Box>

          <Box sx={{ display: "flex", mb: 1 }}>
            <Typography
              sx={{ fontSize: "14px", fontWeight: "bold", color: "black", mr: 1 }}
            >
              Country:
            </Typography>
            <Typography sx={{ fontSize: "14px", color: "black" }}>{team.countryIso}</Typography>
          </Box>

          <Paper
            elevation={0}
            sx={{ p: 1, backgroundColor: "#f5f5f5", borderRadius: "4px" }}
          >
            <Typography
              sx={{ fontSize: "14px", fontWeight: "bold", color: "black", mb: 0.5 }}
            >
              Description:
            </Typography>
            <Typography sx={{ fontSize: "14px", color: "black" }}>
              {team.description || "No description provided"}
            </Typography>
          </Paper>
        </CardContent>

        <CardActions sx={{ p: 2, display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", width: "100%", gap: 1, marginTop: "-18px" }}>
            <Button
              color="secondary"
              variant="outlined"
              fullWidth
              onClick={() => onViewMembers(team.id)}
              sx={{ borderRadius: "3px", padding: "6px 16px" }} 
            >
              View Team Members
            </Button>
            <Button
              color="primary"
              variant="contained"
              fullWidth
              onClick={() => setOpenAddModal(true)}
              sx={{ borderRadius: "3px", padding: "6px 16px" }} 
            >
              Add Team Members
            </Button>
          </Box>
        </CardActions>
      </Card>

      <AddTeamMembersModal
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
        teamId={team.id}
      />
    </>
  );
};

export default TeamCard;
