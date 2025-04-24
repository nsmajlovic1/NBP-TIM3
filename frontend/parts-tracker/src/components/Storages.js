import { useEffect, useState } from "react";
import { getStorages } from "../services/storageService";
import StorageMap from "./StorageMap";
import StorageCard from "./StorageCard";
import { Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const Storages = () => {
  const [storages, setStorages] = useState([]);
  const [selectedStorage, setSelectedStorage] = useState(null);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUserRole(storedUser?.role);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getStorages();
      setStorages(data.content);
    };
    fetchData();
  }, []);

  const handleCardClick = (storage) => {
    setSelectedStorage(storage);
  };

  const handleAddStorageClick = () => {
    console.log("Add Storage button clicked");
  };

  return (
    <Box display="flex" height="100%">
      {/* Left side: Map container */}
      <Box flex={3} height="100%">
        <StorageMap
          storages={storages}
          selectedStorage={selectedStorage}
          onMarkerClick={setSelectedStorage}
        />
      </Box>

      {/* Right side: Storage Cards with Fixed Add Storage Button */}
      <Box
        flex={1}
        display="flex"
        flexDirection="column"
        height="100%"
        padding={2}
      >
        {/* Add Storage Button */}
        {["Admin", "Logistic"].includes(userRole) && (
          <Box display="flex" justifyContent="flex-end" mb={2} flexShrink={0}>
            <Button
              variant="contained"
              color="primary"
              sx={{
                width: "170px",
                fontSize: "16px",
              }}
              startIcon={<AddIcon />}
              onClick={handleAddStorageClick}
            >
              Add Storage
            </Button>
          </Box>
        )}

        {/* List of Storage Cards */}
        <Box
          flex={1}
          overflow="auto"
          display="flex"
          flexDirection="column"
          gap={2}
        >
          {storages.map((storage) => (
            <StorageCard
              key={storage.id}
              storage={storage}
              isSelected={selectedStorage?.id === storage.id}
              onClick={() => handleCardClick(storage)}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Storages;
