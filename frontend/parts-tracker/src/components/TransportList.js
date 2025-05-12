import React from "react";
import { Card, CardContent, Typography, Paper, Box } from "@mui/material";
import { styled } from "@mui/material/styles";

const ScrollableBox = styled(Box)(({ theme }) => ({
  overflowY: "auto",
  scrollbarWidth: "thin",
  "&::-webkit-scrollbar": {
    width: "6px",
  },
  "&::-webkit-scrollbar-track": {
    background: theme.palette.grey[100],
  },
  "&::-webkit-scrollbar-thumb": {
    background: theme.palette.grey[400],
    borderRadius: "3px",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    background: theme.palette.grey[500],
  },
  scrollbarColor: "transparent transparent",
  "&:hover": {
    scrollbarColor: `${theme.palette.grey[400]} ${theme.palette.grey[100]}`,
  },
}));

const TransportList = ({ transports }) => {
  if (!transports.length) {
    return (
      <Typography
        variant="body1"
        color="textSecondary"
        sx={{ textAlign: "center", mt: 3 }}
      >
        No transport data available.
      </Typography>
    );
  }

  return (
    <ScrollableBox
      sx={{
        flexGrow: 1,
        pr: 1,
        "& > *:not(:last-child)": {
          mb: 2,
        },
      }}
    >
      {transports.map((transport, index) => (
        <Card
          key={index}
          sx={{
            border: "1px solid #ccc",
            display: "flex",
            flexDirection: "column",
            height: "260px",
            flexShrink: 0,
          }}
        >
          <CardContent sx={{ p: 2, height: "100%", overflow: "auto" }}>
            <Typography color="black">
              <strong>Type:</strong> {transport.type}
            </Typography>
            <Typography color="black">
              <strong>Departure Date:</strong> {transport.departureDate}
            </Typography>
            <Typography color="black">
              <strong>Arrival Date:</strong> {transport.arrivalDate}
            </Typography>
            <Typography color="black">
              <strong>Vehicle Number:</strong> {transport.vehicleNumber}
            </Typography>
            <Typography color="black">
              <strong>Company:</strong> {transport.company?.name || "N/A"}
            </Typography>
            <Typography color="black">
              <strong>Capacity:</strong> {transport.capacity}
            </Typography>
            <Paper
              elevation={0}
              sx={{
                backgroundColor: "#f5f5f5",
                p: 1,
                mt: 1,
                borderRadius: "4px",
              }}
            >
              <Typography color="black">
                <strong>Departure Address:</strong>{" "}
                {transport.departureAddress?.address || "N/A"}
              </Typography>
              <Typography color="black">
                <strong>Destination Address:</strong>{" "}
                {transport.destinationAddress?.address || "N/A"}
              </Typography>
            </Paper>
          </CardContent>
        </Card>
      ))}
      <Box sx={{ height: "50px", opacity: 0 }} />
    </ScrollableBox>
  );
};

export default React.memo(TransportList);