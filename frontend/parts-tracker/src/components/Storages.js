import { useEffect, useState } from "react";
import { getStorages } from "../services/storageService";
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
  const [popupOpen, setPopupOpen] = useState(null); 

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUserRole(storedUser?.role);
  }, []);

  const fetchStorages = async () => {
    const data = await getStorages();
    setStorages(data.content);
  };

  useEffect(() => {
    fetchStorages();
  }, []);

  const handleCardClick = (storage) => {
    if (selectedStorage?.id === storage.id) {
      setSelectedStorage(null);
      setPopupOpen(null);
    } else {
      setSelectedStorage(storage);
      setPopupOpen(storage.id);
    }
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
          onMarkerClick={handleCardClick} 
          popupOpen={popupOpen}
          setPopupOpen={setPopupOpen}
        />
      </Box>

      <Box
        flex={1}
        display="flex"
        flexDirection="column"
        height="100%"
        padding={2}
        overflow="hidden" 
        sx={{ marginTop: "-18px" }}
      >
        {["Admin", "Logistic"].includes(userRole) && (
          <Box display="flex" justifyContent="flex-end" mb={2}>
            <Button
              variant="contained"
              color="primary"
              sx={{ width: "170px", fontSize: "16px" }}
              startIcon={<AddIcon />}
              onClick={handleAddStorageClick}
            >
              Add Storage
            </Button>
          </Box>
        )}

        <Box
          sx={{
            flexGrow: 1,
            overflowY: "hidden",
            '&:hover': {
              overflowY: "auto",
            },
            display: "flex",
            flexDirection: "column",
            gap: 2,
            pr: 1,
            scrollbarWidth: "thin",
            "&::-webkit-scrollbar": {
              width: "6px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#888",
              borderRadius: "4px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              backgroundColor: "#555",
            },
          }}
        >
          {storages.map((storage) => (
            <Box key={storage.id} sx={{ height: 250 }}>
              <StorageCard
                storage={storage}
                isSelected={selectedStorage?.id === storage.id}
                onClick={() => handleCardClick(storage)}
              />
            </Box>
          ))}
        </Box>
      </Box>

      <AddStorageModal
        open={isModalOpen}
        onClose={handleCloseModal}
        onStorageAdded={fetchStorages}
      />
    </Box>
  );
};

export default Storages;