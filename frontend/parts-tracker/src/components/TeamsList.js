import React, { useState } from "react";
import { FaTrash, FaPlus } from "react-icons/fa";
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper
} from "@mui/material";

const TeamsList = ({ teams: initialTeams }) => {
  const [teams, setTeams] = useState(initialTeams);

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h4">Teams</Typography>
        <Button variant="contained" startIcon={<FaPlus />}>
          Add Team
        </Button>
      </Box>

      {teams.length === 0 ? (
        <Typography color="textSecondary" sx={{ textAlign: "center" }}>
          No teams available.
        </Typography>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {teams.map((team) => (
            <Box
              key={team.id}
              sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}
            >
              <Card sx={{ flex: 1, border: "1px solid #ccc" }}>
                <CardContent>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {team.name}
                  </Typography>
                  <Paper sx={{ p: 1, mt: 1, backgroundColor: "#f5f5f5" }}>
                    <Typography fontSize={14}>{team.description}</Typography>
                  </Paper>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default TeamsList;
