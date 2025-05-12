import { useState, useEffect } from "react";
import { getTransports } from "../services/transportService";
import {
  Box,
  Typography,
  CircularProgress,
  Card,
  Button,
} from "@mui/material";
import TransportList from "./TransportList";
import AddTransportModal from "./AddTransportModal";
import { FaPlus } from "react-icons/fa";


const Transport = () => {
  const [transports, setTransports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUserRole(storedUser?.role);
  }, []);

  const fetchTransports = async () => {
    try {
      setLoading(true);
      const data = await getTransports();
      setTransports(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching transports:", err);
      setError("Failed to load transport data from backend.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransports();
  }, []);

  const handleAddTransport = (newTransport) => {
    setTransports((prev) => [...prev, newTransport]);
    fetchTransports();
  };

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
        <Typography variant="h4">Transport List ({transports.length})</Typography>
        {userRole === "Admin" && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => setModalOpen(true)}
            startIcon={<FaPlus />}
          >
            Add Transport
          </Button>
        )}
      </Box>

      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      <TransportList transports={transports} />

      <AddTransportModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onTransportAdded={handleAddTransport}
      />
      <Box sx={{ height: "300px", opacity: 0 }} />
    </Box>
  );
};

export default Transport;