import { Card, CardContent, Typography, Box, Paper } from "@mui/material";

const StorageCard = ({ storage, isSelected, onClick }) => {
  const { streetName, cityName, countryIso } = storage.location;
  const { name: teamName, description: teamDescription, countryIso: teamCountry } = storage.team;

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
        <Typography sx={{ fontSize: "14px", color: "black" }}>
          <strong>Address:</strong> {`${streetName}, ${cityName}, ${countryIso}`}
        </Typography>
        <Typography sx={{ fontSize: "14px", color: "black" }}>
          <strong>Capacity:</strong> {storage.capacity}
        </Typography>

        <Paper
          elevation={1}
          sx={{ mt: 2, p: 1.5, backgroundColor: "#f5f5f5" }}
        >
          <Typography sx={{ fontSize: "14px", color: "black" }}>
            <strong>Team:</strong> {teamName} ({teamCountry})
          </Typography>
          <Typography sx={{ fontSize: "14px", color: "black" }}>
            <strong>Description:</strong> {teamDescription}
          </Typography>
        </Paper>
      </CardContent>
    </Card>
  );
};

export default StorageCard;
