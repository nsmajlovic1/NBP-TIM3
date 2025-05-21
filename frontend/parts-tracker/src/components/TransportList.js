import React from "react";
import { Card, CardContent, Typography, Paper, Box, Button, CardActions } from "@mui/material";
import { styled } from "@mui/material/styles";
import { FaPlus, FaEye } from "react-icons/fa";

const ScrollableBox = styled(Box)(() => ({
  overflowY: "auto",
  "&::-webkit-scrollbar": { width: "0px", height: "0px" },
  "&::-webkit-scrollbar-track": { background: "transparent" },
  "&::-webkit-scrollbar-thumb": { background: "transparent" },
  scrollbarWidth: "none",
  scrollbarColor: "transparent transparent",
}));

const formatAddress = (address) => {
  if (!address) return "N/A";

  const parts = [];

  if (address.streetName) {
    parts.push(address.streetName);
  }

  if (address.cityName) {
    parts.push(address.cityName);
  }

  if (address.countryIso) {
    parts.push(address.countryIso);
  }

  return parts.join(", ");
};

const TransportList = ({ transports, userRole, onAddPackageClick, onViewPackagesClick }) => {
  if (!transports.length) {
    return (
      <Typography variant="body1" color="textSecondary" sx={{ textAlign: "center", mt: 3 }}>
        No transport data available.
      </Typography>
    );
  }

  return (
    <ScrollableBox sx={{ flexGrow: 1, pr: 1, "& > *:not(:last-child)": { mb: 2 } }}>
      {transports.map((transport) => (
        <Card
          key={transport.id}
          sx={{ border: "1px solid #ccc", display: "flex", flexDirection: "column", flexShrink: 0 }}
        >
          <CardContent sx={{ p: 2, height: "100%", overflow: "auto" }}>
            <Typography color="black"><strong>ID:</strong> {transport.id}</Typography>
            <Typography color="black"><strong>Type:</strong> {transport.type}</Typography>
            <Typography color="black"><strong>Departure Date:</strong> {new Date(transport.departureDate).toLocaleString()}</Typography>
            <Typography color="black"><strong>Arrival Date:</strong> {new Date(transport.arrivalDate).toLocaleString()}</Typography>
            <Typography color="black"><strong>Vehicle Number:</strong> {transport.vehicleNumber}</Typography>
            <Typography color="black"><strong>Company:</strong> {transport.company?.name || "N/A"}</Typography>
            <Typography color="black"><strong>Capacity:</strong> {transport.capacity}</Typography>
            <Typography color="black"><strong>Status:</strong> {transport.status}</Typography>
            <Paper elevation={0} sx={{ backgroundColor: "#f5f5f5", p: 1, mt: 1, borderRadius: "4px" }}>
              <Typography color="black">
                <strong>Departure Address:</strong> {formatAddress(transport.departureAddress)}
              </Typography>
              <Typography color="black">
                <strong>Destination Address:</strong> {formatAddress(transport.destinationAddress)}
              </Typography>
            </Paper>
          </CardContent>

          <CardActions sx={{ p: 2 }}>
            <Box sx={{ display: "flex", width: "100%", gap: 1 }}>
              {(userRole === "Admin" || userRole === "Mechanic" || userRole === "Logistic") && (
                <Button
                  size="small"
                  variant="outlined"
                  color="secondary"
                  startIcon={<FaEye />}
                  fullWidth
                  onClick={() => onViewPackagesClick(transport)}
                  sx={{ borderRadius: "3px", padding: "6px 16px" }}
                >
                  View Packages
                </Button>
              )}

              {userRole === "Logistic" && (
                <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  startIcon={<FaPlus />}
                  fullWidth
                  onClick={() => onAddPackageClick(transport.id)}
                  sx={{ borderRadius: "3px", padding: "6px 16px" }}
                >
                  Add Package
                </Button>
              )}
            </Box>
          </CardActions>
        </Card>
      ))}
      <Box sx={{ height: "170px", opacity: 0 }} />
    </ScrollableBox>
  );
};

export default TransportList;