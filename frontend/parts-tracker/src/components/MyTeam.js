import React, { useEffect, useState } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import { getTeamById } from "../services/teamService";

const MyTeam = () => {
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const teamId = storedUser?.teamId;

        if (!teamId) {
          setError("You are currently not assigned to any team. Please contact an admin for more information.");
          setLoading(false);
          return;
        }

        const data = await getTeamById(teamId);
        setTeam(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load team data.");
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, color: "black" }}>
      <Typography marginBottom="40px" variant="h4" gutterBottom>
        My Team
      </Typography>

      <Typography sx={{ mb: 1 }}>
        <strong>Team ID:</strong> {team.id}
      </Typography>

      <Typography sx={{ mb: 1 }}>
        <strong>Team Name:</strong> {team.name}
      </Typography>

      <Typography sx={{ mb: 1 }}>
        <strong>Description:</strong> {team.description}
      </Typography>

      <Typography sx={{ mb: 3 }}>
        <strong>Country:</strong> {team.countryIso}
      </Typography>

      <Typography variant="h5" gutterBottom>
        Team Members
      </Typography>

      {team.teamMembers.map((member, index) => (
        <Box
          key={index}
          sx={{
            border: "1px solid #ccc",
            borderRadius: 2,
            padding: 2,
            mb: 2,
            backgroundColor: "#f9f9f9"
          }}
        >
          <Typography>
            <strong>Name:</strong> {member.firstName} {member.lastName}
          </Typography>
          <Typography>
            <strong>Email:</strong> {member.email}
          </Typography>
          <Typography>
            <strong>Role:</strong> {member.role}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default MyTeam;
