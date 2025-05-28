import { useEffect, useState } from "react";
import { Typography, Box } from "@mui/material";
import { getStorageImageInfo, getImageById } from "../services/imageService";

const StoragePopup = ({ storage }) => {
  const [storageImageUrl, setStorageImageUrl] = useState(null);

  useEffect(() => {
    let isMounted = true;
    let imageBlobUrl = null;

    const fetchImage = async () => {
      try {
        if (storage.image) {
          const url = URL.createObjectURL(storage.image);
          if (isMounted) setStorageImageUrl(url);
        } else {
          const requestData = {
            assignId: storage.id,
            assignType: "STORAGE"
          };
          const imageInfo = await getStorageImageInfo(requestData);
          if (imageInfo && imageInfo.id) {
            const imageData = await getImageById(imageInfo.id);
            const url = URL.createObjectURL(imageData);
            if (isMounted) {
              setStorageImageUrl(url);
              imageBlobUrl = url;
            }
          }
        }
      } catch (error) {
        console.error("Failed to fetch storage image:", error.message);
        if (isMounted) setStorageImageUrl(null);
      }
    };

    fetchImage();

    return () => {
      isMounted = false;
      if (imageBlobUrl) {
        URL.revokeObjectURL(imageBlobUrl);
      }
    };
  }, [storage.id, storage.image]);

  const typographyStyle = {
    fontSize: "12px",
    marginTop: 0,
    marginBottom: 0,
    padding: 0,
    lineHeight: 1.01,
  };

  return (
    <Box sx={{ maxWidth: 220, fontSize: "12px" }}>
      <Box
        sx={{
          width: "100%",
          height: 110,
          backgroundColor: "#f0f0f0",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mb: 0,
          paddingBottom: 0,
          borderRadius: "4px",
          overflow: "hidden",
        }}
      >
        {storageImageUrl ? (
          <img
            src={storageImageUrl}
            alt={`Storage ${storage.id}`}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ ...typographyStyle, textAlign: "center" }}
          >
            No image available
          </Typography>
        )}
      </Box>

      <Typography sx={typographyStyle}>
        <strong>Address:</strong>{" "}
        {`${storage.location.streetName}, ${storage.location.cityName}, ${storage.location.countryIso}`}
      </Typography>
      <Typography sx={typographyStyle}>
        <strong>Capacity:</strong> {storage.capacity}
      </Typography>

      <Box
        sx={{
          p: 0.5,
          backgroundColor: "#f5f5f5",
          borderRadius: "4px",
          mt: 0.0,
        }}
      >
        <Typography sx={typographyStyle}>
          <strong>Team:</strong> {storage.team.name} ({storage.team.countryIso})
        </Typography>
        <Typography sx={typographyStyle}>
          <strong>Description:</strong> {storage.team.description}
        </Typography>
      </Box>
    </Box>
  );
};

export default StoragePopup;
