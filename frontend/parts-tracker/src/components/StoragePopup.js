import { Typography, Box } from "@mui/material";

const StoragePopup = ({ storage }) => {
  return (
    <Box>
      <Typography sx={{ fontSize: "14px" }}>
        <strong>Address:</strong> {`${storage.location.streetName}, ${storage.location.cityName}, ${storage.location.countryIso}`}
      </Typography>
      <Typography sx={{ fontSize: "14px" }}>
        <strong>Capacity:</strong> {storage.capacity}
      </Typography>

      <Box
        sx={{
          mt: 1.5,
          p: 1,
          backgroundColor: "#f5f5f5",
          borderRadius: "4px",
        }}
      >
        <Typography sx={{ fontSize: "14px" }}>
          <strong>Team:</strong> {storage.team.name} ({storage.team.countryIso})
        </Typography>
        <Typography sx={{ fontSize: "14px" }}>
          <strong>Description:</strong> {storage.team.description}
        </Typography>
      </Box>
    </Box>
  );
};

export default StoragePopup;
