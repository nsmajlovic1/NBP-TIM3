import { useEffect, useState } from "react";
import { getStorages, addStorage } from "../services/storageService";
import StorageMap from "./StorageMap";
import StorageCard from "./StorageCard";
import { Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AddStorageModal from "./AddStorageModal";

const Storages = () => {
  const [storages, setStorages] = useState([]);
  const [selectedStorage, setSelectedStorage] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUserRole(storedUser?.role);
  }, []);

  const fetchStorages = async () => {
    const data = await getStorages();
    setStorages(data.content);
  };

  const fetchData = async () => {
    const data = await getStorages();
    setStorages(data.content);
  };

  useEffect(() => {
    fetchStorages();
  }, []);

  const handleCardClick = (storage) => {
    setSelectedStorage(storage);
  };

  const handleAddStorageClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
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

      <Box
        flex={1}
        display="flex"
        flexDirection="column"
        height="100%"
        padding={2}
      >
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

      <AddStorageModal open={isModalOpen} onClose={handleCloseModal} onStorageAdded={fetchData} />

    </Box>
  );
};

export default Storages;
