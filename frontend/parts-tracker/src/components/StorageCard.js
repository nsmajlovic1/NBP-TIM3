import { Card, CardContent, Typography } from "@mui/material";

const StorageCard = ({ storage, isSelected, onClick }) => {
  const { streetName, cityName, countryIso } = storage.location;

  return (
    <Card
      onClick={onClick}
      sx={{
        border: isSelected ? "2px solid #1976d2" : "1px solid #ccc",
        cursor: "pointer",
        transition: "0.3s",
        "&:hover": { boxShadow: 3 },
      }}
    >
      <CardContent>
        <Typography variant="subtitle1" sx={{ fontWeight: 500, color: "black" }}>
          {streetName}, {cityName}, {countryIso}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Capacity: {storage.capacity}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default StorageCard;
