import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const StorageCard = ({ storage, isSelected, onClick }) => (
  <Card
    sx={{
      cursor: "pointer",
      border: isSelected ? "2px solid #007bff" : "1px solid #ddd",
    }}
    onClick={onClick}
  >
    <CardContent>
      <Typography variant="h6">{storage.address}</Typography>
      <Typography variant="body2">Capacity: {storage.capacity}</Typography>
    </CardContent>
  </Card>
);

export default StorageCard;
