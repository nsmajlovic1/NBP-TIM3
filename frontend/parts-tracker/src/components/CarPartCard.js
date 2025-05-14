import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { getStorageById } from "../services/storageService";

const CarPartCard = ({ carPart }) => {
  const [storage, setStorage] = useState(null); 

  useEffect(() => {
    const fetchStorage = async () => {
      try {
        const storageData = await getStorageById(carPart.storageId); 
        setStorage(storageData); 
      } catch (error) {
        console.error("Error fetching storage data: ", error);
      }
    };

    if (carPart.storageId) {
      fetchStorage();
    }
  }, [carPart.storageId]);


  const formatStorageAddress = (location) => {
    if (location) {
      return `${location.streetName}, ${location.cityName}, ${location.countryIso}`;
    }
    return "Address not available";
  };

  return (
    <Card sx={{ display: "flex", flexDirection: "column", border: "1px solid #ccc", minHeight: "150px", marginBottom: "16px" }}>
      <CardContent sx={{ p: "12px !important" }}>
        <Box sx={{ display: "flex", mb: 1 }}>
          <Typography sx={{ fontSize: "14px", fontWeight: "bold", color: "black", mr: 1 }}>Name:</Typography>
          <Typography sx={{ fontSize: "14px", color: "black" }}>{carPart.name}</Typography>
        </Box>

        <Box sx={{ display: "flex", mb: 1 }}>
          <Typography sx={{ fontSize: "14px", fontWeight: "bold", color: "black", mr: 1 }}>Manufactured At:</Typography>
          <Typography sx={{ fontSize: "14px", color: "black" }}>
            {new Date(carPart.manufacturedAt).toLocaleDateString()}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", mb: 1 }}>
          <Typography sx={{ fontSize: "14px", fontWeight: "bold", color: "black", mr: 1 }}>Homologation Number:</Typography>
          <Typography sx={{ fontSize: "14px", color: "black" }}>{carPart.homologationNumber}</Typography>
        </Box>

        <Box sx={{ display: "flex", mb: 1 }}>
          <Typography sx={{ fontSize: "14px", fontWeight: "bold", color: "black", mr: 1 }}>Description:</Typography>
          <Typography sx={{ fontSize: "14px", color: "black" }}>{carPart.description}</Typography>
        </Box>

        <Box sx={{ display: "flex", mb: 1 }}>
          <Typography sx={{ fontSize: "14px", fontWeight: "bold", color: "black", mr: 1 }}>Package ID:</Typography>
          <Typography sx={{ fontSize: "14px", color: "black" }}>{carPart.packageId}</Typography>
        </Box>

        <Box sx={{ display: "flex", mb: 1 }}>
          <Typography sx={{ fontSize: "14px", fontWeight: "bold", color: "black", mr: 1 }}>Driver ID:</Typography>
          <Typography sx={{ fontSize: "14px", color: "black" }}>{carPart.driverId}</Typography>
        </Box>

        <Box sx={{ display: "flex", mb: 1 }}>
          <Typography sx={{ fontSize: "14px", fontWeight: "bold", color: "black", mr: 1 }}>Weight:</Typography>
          <Typography sx={{ fontSize: "14px", color: "black" }}>{carPart.weight}</Typography>
        </Box>

        <Box sx={{ display: "flex", mb: 1 }}>
          <Typography sx={{ fontSize: "14px", fontWeight: "bold", color: "black", mr: 1 }}>Status:</Typography>
          <Typography sx={{ fontSize: "14px", color: "black" }}>{carPart.status}</Typography>
        </Box>

        {storage && (
          <Box sx={{ display: "flex", mb: 1 }}>
            <Typography sx={{ fontSize: "14px", fontWeight: "bold", color: "black", mr: 1 }}>Storage Location:</Typography>
            <Typography sx={{ fontSize: "14px", color: "black" }}>
              {formatStorageAddress(storage.location)}
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default CarPartCard;
