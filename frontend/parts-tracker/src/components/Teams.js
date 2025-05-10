import { useState, useEffect } from "react";
import { getTeams, createTeam } from "../services/teamService";
import { FaPlus } from "react-icons/fa";
import {
  Button,
  CircularProgress,
  Box,
  Typography,
  Card,
  CardContent,
  Paper,
} from "@mui/material";
import AddTeamModal from "./AddTeamModal";

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openAddModal, setOpenAddModal] = useState(false);

  const fetchTeams = async () => {
    try {
      const data = await getTeams();
      setTeams(data.content);
      setError(null);
    } catch (err) {
      console.error("Error fetching teams:", err);
      setError("Failed to load teams");
      setTeams([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h4">Teams</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpenAddModal(true)}
          startIcon={<FaPlus />}
        >
          Add Team
        </Button>
      </Box>

      {error ? (
        <Typography
          variant="body1"
          color="error"
          sx={{ textAlign: "center", mt: 3 }}
        >
          Teams couldn't be loaded. Try again later.
        </Typography>
      ) : teams.length === 0 ? (
        <Typography
          variant="body1"
          color="textSecondary"
          sx={{ textAlign: "center", mt: 3 }}
        >
          There are currently no teams to display.
        </Typography>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            maxHeight: "calc(100vh - 200px)",
            overflowY: "hidden",
            "&:hover": {
              overflowY: "auto",
              paddingRight: "8px",
              mr: "-8px",
            },
            "&::-webkit-scrollbar": {
              width: "8px",
            },
            "&::-webkit-scrollbar-track": {
              background: "transparent",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "rgba(0,0,0,0.2)",
              borderRadius: "4px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              backgroundColor: "rgba(0,0,0,0.4)",
            },
          }}
        >
          {teams.map((team) => (
            <Card
              key={team.id}
              sx={{
                display: "flex",
                flexDirection: "column",
                border: "1px solid #ccc",
                minHeight: "130px",
                flexShrink: 0,
              }}
            >
              <CardContent
                sx={{
                  p: "12px !important",
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                  height: "100%",
                  '&:last-child': { pb: '12px' },
                }}
              >
                <Box sx={{ display: "flex" }}>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: "bold",
                      color: "black",
                      mr: 1,
                    }}
                  >
                    Name:
                  </Typography>
                  <Typography sx={{ fontSize: "14px", color: "black" }}>
                    {team.name}
                  </Typography>
                </Box>

                <Box sx={{ display: "flex" }}>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: "bold",
                      color: "black",
                      mr: 1,
                    }}
                  >
                    Country:
                  </Typography>
                  <Typography sx={{ fontSize: "14px", color: "black" }}>
                    {team.countryIso}
                  </Typography>
                </Box>

                <Paper
                  elevation={0}
                  sx={{
                    p: 1,
                    backgroundColor: "#f5f5f5",
                    borderRadius: "4px",
                    flexGrow: 1,
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Box sx={{ display: "flex", flexGrow: 1 }}>
                    <Typography
                      sx={{
                        fontSize: "14px",
                        fontWeight: "bold",
                        color: "black",
                        mr: 1,
                        flexShrink: 0,
                      }}
                    >
                      Description:
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "14px",
                        color: "black",
                        overflow: "auto",
                        "&::-webkit-scrollbar": {
                          width: "6px",
                          height: "6px",
                        },
                        "&::-webkit-scrollbar-thumb": {
                          backgroundColor: "rgba(0,0,0,0.2)",
                          borderRadius: "3px",
                        },
                      }}
                    >
                      {team.description}
                    </Typography>
                  </Box>
                </Paper>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}

      <AddTeamModal
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
        fetchTeams={fetchTeams}  
      />
    </Box>
  );
};

export default Teams;