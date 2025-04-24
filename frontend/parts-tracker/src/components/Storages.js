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
      <Box flex={3} height="100%">
        <StorageMap
          storages={storages}
          selectedStorage={selectedStorage}
          onMarkerClick={setSelectedStorage}
        />
      </Box>

      <Box flex={1} overflow="auto" padding={2}>
        {["Admin", "Logistic"].includes(userRole) && (
          <Box display="flex" justifyContent="flex-end" mb={2}>
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

        <Box display="flex" flexDirection="column" gap={2}>
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
