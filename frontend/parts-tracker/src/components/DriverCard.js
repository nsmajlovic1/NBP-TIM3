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
import { getTeamById } from "../services/teamService";
import { useEffect } from "react";

const DriverCard = ({ driver }) => {
  const [team, setTeam] = useState({});

  const fetchTeam = async () => {
    try {
      const data = await getTeamById(driver.teamId);
      setTeam(data);
    } catch (err) {
      console.error("Error fetching team:", err);
    } 
  };

  useEffect(() => {
    fetchTeam();
  }, []);

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
              ID:
            </Typography>
            <Typography sx={{ fontSize: "14px", color: "black" }}>{driver.id}</Typography>
          </Box>

          <Box sx={{ display: "flex", mb: 1 }}>
            <Typography
              sx={{ fontSize: "14px", fontWeight: "bold", color: "black", mr: 1 }}
            >
              Name:
            </Typography>
            <Typography sx={{ fontSize: "14px", color: "black" }}>{driver.firstName + " " + driver.lastName}</Typography>
          </Box>

          <Box sx={{ display: "flex", mb: 1 }}>
            <Typography
              sx={{ fontSize: "14px", fontWeight: "bold", color: "black", mr: 1 }}
            >
              Country:
            </Typography>
            <Typography sx={{ fontSize: "14px", color: "black" }}>{driver.countryIso}</Typography>
          </Box>

          <Box sx={{ display: "flex", mb: 1 }}>
            <Typography
              sx={{ fontSize: "14px", fontWeight: "bold", color: "black", mr: 1 }}
            >
              Team:
            </Typography>
            <Typography sx={{ fontSize: "14px", color: "black" }}>{team.name}</Typography>
          </Box>

          <Box sx={{ display: "flex", mb: 1 }}>
            <Typography
              sx={{ fontSize: "14px", fontWeight: "bold", color: "black", mr: 1 }}
            >
              Car number:
            </Typography>
            <Typography sx={{ fontSize: "14px", color: "black" }}>{driver.carNumber}</Typography>
          </Box>

        </CardContent>

      </Card>

    </>
  );
};

export default DriverCard;
