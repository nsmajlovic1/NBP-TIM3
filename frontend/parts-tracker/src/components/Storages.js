import { useEffect, useState } from "react";
import { getStorages } from "../services/storageService";
import { getStoragesByTeam } from "../services/storageService";
import StorageMap from "./StorageMap";
import StorageCard from "./StorageCard";
import { Box, Button, Typography, CircularProgress } from "@mui/material";
import { FaPlus } from "react-icons/fa";
import AddStorageModal from "./AddStorageModal";

const Storages = () => {
  const [storages, setStorages] = useState([]);
  const [selectedStorage, setSelectedStorage] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [userTeamId, setUserTeamId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [popupOpen, setPopupOpen] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUserRole(storedUser?.role);
    setUserTeamId(storedUser?.teamId);
  }, []);

  const fetchStorages = async () => {
    try {
      let data;

      if (["Mechanic", "Logistic"].includes(userRole)) {
        if (!userTeamId) {
          throw new Error("Team ID not found.");
        }

        const teamStorages = await getStoragesByTeam(userTeamId);
        data = teamStorages.content;
        if (!teamStorages || teamStorages.length === 0) {
          setError("Your team currently does not have any storage units.");
        } else {
          setError(null);
        }
      } else {
        const response = await getStorages();
        data = response.content;
        setError(null);
      }

      setStorages(data || []);
    } catch (err) {
      console.error("Error fetching storages:", err);
      setError("Failed to load storage data");
      setStorages([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userRole) {
      fetchStorages();
    }
  }, [userRole]);

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
    fetchStorages();
  };

  if (loading) {
    return (
      <Box display="flex" height="100%">
        <Box flex={3} height="100%">
          <StorageMap storages={[]} />
        </Box>
        <Box
          flex={1}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <CircularProgress />
        </Box>
      </Box>
    );
  }

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
              sx={{ width: "170px", fontSize: "16px", marginBottom: "15px" }}
              startIcon={<FaPlus />}
              onClick={handleAddStorageClick}
            >
              Add Storage
            </Button>
          </Box>
        )}

        <Box
          sx={{
          flexGrow: 1,
           overflowY: "auto",

          "&::-webkit-scrollbar": {
            width: "0px",
            height: "0px",
          },

          "&::-webkit-scrollbar-track": {
            background: "transparent",
          },

          "&::-webkit-scrollbar-thumb": {
            background: "transparent",
          },

          scrollbarWidth: "none",
          scrollbarColor: "transparent transparent",
          }}
        >
          {error ? (
            <Typography
              variant="body1"
              color="error"
              sx={{ textAlign: "center", mt: 3 }}
            >
              {error}
            </Typography>
          ) : storages.length > 0 ? (
            storages.map((storage) => (
              <Box marginRight={3} key={storage.id} sx={{ height: 250 }}>
                <StorageCard
                  storage={storage}
                  isSelected={selectedStorage?.id === storage.id}
                  onClick={() => handleCardClick(storage)}
                />
              </Box>
            ))
          ) : (
            <Typography
              variant="body1"
              color="textSecondary"
              sx={{ textAlign: "center", mt: 3 }}
            >
              No storage data available
            </Typography>
          )}
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
