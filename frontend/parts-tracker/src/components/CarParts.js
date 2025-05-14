import { useState, useEffect } from "react";
import { getCarParts } from "../services/carPartService"; // Metoda za dobijanje car parts
import { FaPlus } from "react-icons/fa";
import CarPartList from "./CarPartList";
import { Button, CircularProgress, Box, Typography } from "@mui/material";
import PaginationControls from "./PaginationControls";

const CarParts = () => {
  const [carParts, setCarParts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 0,
    size: 5,
    totalElements: 0,
    totalPages: 1,
  });

  const fetchCarParts = async (page = pagination.page, size = pagination.size) => {
    try {
      setLoading(true);
      const data = await getCarParts(page, size);  
      setCarParts(data.content);
      setPagination({
        page: data.pageNumber,
        size: data.pageSize,
        totalElements: data.totalElements,
        totalPages: data.totalPages,
      });
      setError(null);
    } catch (err) {
      console.error("Error fetching car parts:", err);
      setError("Failed to load car parts");
      setCarParts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCarParts();
  }, [pagination.page, pagination.size]);

  if (loading && pagination.page === 0) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        p: 3,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
          flexShrink: 0,
        }}
      >
        <Typography variant="h4">Car Parts ({pagination.totalElements})</Typography>
      </Box>

      <PaginationControls
        pagination={pagination}
        onPageChange={(newPage) => setPagination(prev => ({...prev, page: newPage - 1}))}
        onSizeChange={(newSize) => setPagination(prev => ({...prev, size: newSize, page: 0}))}
      />

      <CarPartList 
        carParts={carParts} 
        error={error} 
      />
      <Box sx={{ height: '300px', opacity: 0 }} />
    </Box>
  );
};

export default CarParts;
