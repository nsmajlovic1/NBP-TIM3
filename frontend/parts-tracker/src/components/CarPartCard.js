import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Box, CircularProgress } from "@mui/material";
import { getStorageById } from "../services/storageService";

const CarPartCard = ({ carPart }) => {
  const [storage, setStorage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStorage = async () => {
      if (!carPart.storageId) return;

      setLoading(true);
      setError(null);
      
      try {
        const storageData = await getStorageById(carPart.storageId);
        setStorage(storageData);
      } catch (err) {
        console.error("Error fetching storage data:", err);
        setError("Failed to load storage information");
      } finally {
        setLoading(false);
      }
    };

    fetchStorage();
  }, [carPart.storageId]);

  const formatStorageAddress = (location) => {
    if (!location) return "Address not available";
    
    const addressParts = [
      location.streetName,
      location.cityName,
      location.countryIso
    ].filter(Boolean);

    return addressParts.length > 0 
      ? addressParts.join(", ") 
      : "Address information incomplete";
  };

  return (
    <Card sx={{ 
      display: "flex", 
      flexDirection: "column", 
      border: "1px solid #ccc", 
      minHeight: "150px", 
      marginBottom: "16px",
      backgroundColor: "#f9f9f9"
    }}>
      <CardContent sx={{ p: "12px !important" }}>
        <Box sx={{ display: "flex", mb: 1 }}>
          <Typography sx={{ fontSize: "14px", fontWeight: "bold", color: "black", mr: 1, minWidth: "120px" }}>ID:</Typography>
          <Typography sx={{ fontSize: "14px", color: "black" }}>{carPart.id || "N/A"}</Typography>
        </Box>

        <Box sx={{ display: "flex", mb: 1 }}>
          <Typography sx={{ fontSize: "14px", fontWeight: "bold", color: "black", mr: 1, minWidth: "120px" }}>Name:</Typography>
          <Typography sx={{ fontSize: "14px", color: "black" }}>{carPart.name || "N/A"}</Typography>
        </Box>

        <Box sx={{ display: "flex", mb: 1 }}>
          <Typography sx={{ fontSize: "14px", fontWeight: "bold", color: "black", mr: 1, minWidth: "120px" }}>Manufactured At:</Typography>
          <Typography sx={{ fontSize: "14px", color: "black" }}>
            {carPart.manufacturedAt ? new Date(carPart.manufacturedAt).toLocaleDateString() : "N/A"}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", mb: 1 }}>
          <Typography sx={{ fontSize: "14px", fontWeight: "bold", color: "black", mr: 1, minWidth: "120px" }}>Homologation:</Typography>
          <Typography sx={{ fontSize: "14px", color: "black" }}>{carPart.homologationNumber || "N/A"}</Typography>
        </Box>

        <Box sx={{ display: "flex", mb: 1 }}>
          <Typography sx={{ fontSize: "14px", fontWeight: "bold", color: "black", mr: 1, minWidth: "120px" }}>Description:</Typography>
          <Typography sx={{ fontSize: "14px", color: "black" }}>{carPart.description || "No description"}</Typography>
        </Box>

        <Box sx={{ display: "flex", mb: 1 }}>
          <Typography sx={{ fontSize: "14px", fontWeight: "bold", color: "black", mr: 1, minWidth: "120px" }}>Package ID:</Typography>
          <Typography sx={{ fontSize: "14px", color: "black" }}>{carPart.packageId || "N/A"}</Typography>
        </Box>

        <Box sx={{ display: "flex", mb: 1 }}>
          <Typography sx={{ fontSize: "14px", fontWeight: "bold", color: "black", mr: 1, minWidth: "120px" }}>Driver ID:</Typography>
          <Typography sx={{ fontSize: "14px", color: "black" }}>{carPart.driverId || "N/A"}</Typography>
        </Box>

        <Box sx={{ display: "flex", mb: 1 }}>
          <Typography sx={{ fontSize: "14px", fontWeight: "bold", color: "black", mr: 1, minWidth: "120px" }}>Weight:</Typography>
          <Typography sx={{ fontSize: "14px", color: "black" }}>
            {carPart.weight ? `${carPart.weight} kg` : "N/A"}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", mb: 1 }}>
          <Typography sx={{ fontSize: "14px", fontWeight: "bold", color: "black", mr: 1, minWidth: "120px" }}>Status:</Typography>
          <Typography 
            sx={{ 
              fontSize: "14px", 
              color: carPart.status === "Active" ? "green" : 
                    carPart.status === "In Repair" ? "orange" : 
                    "black"
            }}
          >
            {carPart.status || "N/A"}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", mb: 1, alignItems: "center" }}>
          <Typography sx={{ fontSize: "14px", fontWeight: "bold", color: "black", mr: 1, minWidth: "120px" }}>Storage:</Typography>
          
          {!carPart.storageId ? (
            <Typography sx={{ fontSize: "14px", color: "gray" }}>Not assigned</Typography>
          ) : loading ? (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <CircularProgress size={16} sx={{ mr: 1 }} />
              <Typography sx={{ fontSize: "14px", color: "gray" }}>Loading...</Typography>
            </Box>
          ) : error ? (
            <Typography sx={{ fontSize: "14px", color: "red" }}>{error}</Typography>
          ) : storage ? (
            <Typography sx={{ fontSize: "14px", color: "black" }}>
              {formatStorageAddress(storage.location)}
            </Typography>
          ) : (
            <Typography sx={{ fontSize: "14px", color: "gray" }}>No storage data</Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default CarPartCard;