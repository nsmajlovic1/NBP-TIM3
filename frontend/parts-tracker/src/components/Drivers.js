import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import DriversList from "./DriversList";
import { FaPlus } from "react-icons/fa";
import AddDriverModal from "./AddDriverModal";
import { getDrivers, getDriversByTeam } from "../services/driversService";
import { Button } from "@mui/material";

const Drivers = () => {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);


  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUserRole(storedUser?.role || "Guest");
  }, []);

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

  useEffect(() => {
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

      {userRole === "Admin" && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => setModalOpen(true)}
            startIcon={<FaPlus />}
          >
            Add Driver
          </Button>
      )}

      </Box>

      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      <DriversList drivers={drivers} />

      <Box sx={{ height: "300px", opacity: 0 }} />

      <AddDriverModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        fetchDrivers={fetchDrivers}
      />

    </Box>
  );
};

export default Drivers;
