import { useEffect, useState } from "react";
import { Typography, Box } from "@mui/material";
import { getStorageImageInfo } from "../services/imageService";

const StoragePopup = ({ storage }) => {
  const [imageUrl, setImageUrl] = useState("https://via.placeholder.com/150?text=No+Image+Available");

  useEffect(() => {
    let isMounted = true;

    const fetchImageInfo = async () => {
      try {
        const requestData = {
          assignId: storage.id,
          assignType: "STORAGE"
        }
        const data = await getStorageImageInfo(requestData);
        console.log(data);
      } catch (error) {

        console.error("Failed to fetch storage image info:", error.message);
      }
    };

    fetchImageInfo();

    return () => {
      isMounted = false;
    };
  }, [storage.id]);

  return (
    <Box>
      <Box
        sx={{
          width: "100%",
          height: 150,
          mb: 1.5,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
          borderRadius: 1,
          backgroundColor: "#eee",
        }}
      >
        <img
          src={imageUrl}
          alt="Storage"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "https://via.placeholder.com/150?text=No+Image+Available";
          }}
        />
      </Box>

      <Typography sx={{ fontSize: "14px" }}>
        <strong>Address:</strong> {`${storage.location.streetName}, ${storage.location.cityName}, ${storage.location.countryIso}`}
      </Typography>
      <Typography sx={{ fontSize: "14px" }}>
        <strong>Capacity:</strong> {storage.capacity}
      </Typography>

      <Box
        sx={{
          mt: 1.5,
          p: 1,
          backgroundColor: "#f5f5f5",
          borderRadius: "4px",
        }}
      >
        <Typography sx={{ fontSize: "14px" }}>
          <strong>Team:</strong> {storage.team.name} ({storage.team.countryIso})
        </Typography>
        <Typography sx={{ fontSize: "14px" }}>
          <strong>Description:</strong> {storage.team.description}
        </Typography>
      </Box>
    </Box>
  );
};

export default StoragePopup;
