import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import DriversList from "./DriversList";
import { getDrivers, getDriversByTeam } from "../services/driversService";

const Drivers = () => {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUserRole(storedUser?.role || "Guest");
  }, []);

  useEffect(() => {
    const fetchDrivers = async () => {
      if (!userRole) return;

      try {
        setLoading(true);
        let data;

        if (userRole === "Admin") {
          data = await getDrivers();
        } else if (userRole === "Mechanic" || userRole === "Logistic") {
          data = await getDriversByTeam();
        } else {
          throw new Error("Unauthorized role");
        }

        setDrivers(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching drivers:", err);
        setError("Failed to load drivers data from backend.");
      } finally {
        setLoading(false);
      }
    };

    fetchDrivers();
  }, [userRole]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, height: "100vh", display: "flex", flexDirection: "column" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
      <Typography variant="h4">
        {userRole === "Mechanic" || userRole === "Logistic"
          ? `Your Team's Drivers (${drivers.length})`
          : `Drivers List (${drivers.length})`}
      </Typography>
      </Box>

      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      <DriversList drivers={drivers} />

      <Box sx={{ height: "300px", opacity: 0 }} />
    </Box>
  );
};

export default Drivers;
