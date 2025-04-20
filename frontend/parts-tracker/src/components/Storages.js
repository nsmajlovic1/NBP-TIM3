import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getStorages } from "../services/storageService";
import StorageCard from "./StorageCard"; 


import { Box } from "@mui/material";

const Storages = () => {
  const [storages, setStorages] = useState([]);
  const [selectedStorage, setSelectedStorage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getStorages();
      setStorages(data);
    };
    fetchData();
  }, []);

  const handleCardClick = (storage) => {
    setSelectedStorage(storage);
  };
  return (
    <Box display="flex" height="100%">
      <Box flex={1} height="100%">
      </Box>

      <Box flex={1} overflow="auto" padding={2}>
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
