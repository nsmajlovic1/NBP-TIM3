import React, { useState, useEffect } from "react";
import { getTransports } from "../services/transportService";
import {
  Box,
  Typography,
  CircularProgress,
  Button,
} from "@mui/material";
import TransportList from "./TransportList";
import AddTransportModal from "./AddTransportModal";
import AddPackageModal from "./AddPackageModal";
import PackagesModal from "./PackagesModal";
import { FaPlus } from "react-icons/fa";

const Transport = () => {
  const [transports, setTransports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userRole, setUserRole] = useState(null);

  const [addTransportModalOpen, setAddTransportModalOpen] = useState(false);
  const [addPackageModalOpen, setAddPackageModalOpen] = useState(false);
  const [selectedTransportIdForAddPackage, setSelectedTransportIdForAddPackage] = useState(null);
  const [packagesModalOpen, setPackagesModalOpen] = useState(false);
  const [selectedTransportForPackages, setSelectedTransportForPackages] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUserRole(storedUser?.role);
    fetchTransports();
  }, []);

  const fetchTransports = async () => {
    setLoading(true);
    try {
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

  const handleAddTransport = (newTransport) => {
    setTransports((prev) => [...prev, newTransport]);
    setAddTransportModalOpen(false);
  };

  const handleOpenAddPackageModal = (transportId) => {
    setSelectedTransportIdForAddPackage(transportId);
    setAddPackageModalOpen(true);
  };

  const handlePackageAdded = async () => {
    setAddPackageModalOpen(false);
    setSelectedTransportIdForAddPackage(null);
    await fetchTransports(); 
  };

  const handleOpenPackagesModal = (transport) => {
    setSelectedTransportForPackages(transport);
    setPackagesModalOpen(true);
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
            onClick={() => setAddTransportModalOpen(true)}
            startIcon={<FaPlus />}
          >
            Add Transport
          </Button>
        )}
      </Box>

      <TransportList
        transports={transports}
        userRole={userRole}
        onAddPackageClick={handleOpenAddPackageModal}
        onViewPackagesClick={handleOpenPackagesModal}
      />

      <AddTransportModal
        open={addTransportModalOpen}
        onClose={() => setAddTransportModalOpen(false)}
        onTransportAdded={handleAddTransport}
      />

      <AddPackageModal
        open={addPackageModalOpen}
        onClose={() => setAddPackageModalOpen(false)}
        onPackageAdded={handlePackageAdded}
        transportId={selectedTransportIdForAddPackage}
      />

      <PackagesModal
        open={packagesModalOpen}
        onClose={() => setPackagesModalOpen(false)}
        transport={selectedTransportForPackages}
      />
    </Box>
  );
};

export default Transport;