import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Card,
  Box,
  Button,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const PackagesModal = ({ open, onClose, transport }) => {
  if (!transport) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle sx={{ m: 0, p: 2, position: "relative" }}>
        <Typography variant="h6" sx={{ color: "black" }}>
          Packages for Transport ID: {transport.id}
        </Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent
        dividers
        sx={{
          maxHeight: "60vh",
          overflowY: "auto",
          "&::-webkit-scrollbar": {
            display: "none",
          },
          scrollbarWidth: "none", 
          msOverflowStyle: "none", 
        }}
      >
        {transport.packages && transport.packages.length > 0 ? (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {transport.packages.map((pkg) => (
              <Card key={pkg.id} variant="outlined" sx={{ p: 2 }}>
                <Typography variant="subtitle1" fontWeight="bold" sx={{ color: "black" }}>
                  Package Code: {pkg.code}
                </Typography>
                <Typography sx={{ color: "black" }}>Status: {pkg.status}</Typography>
                <Typography sx={{ color: "black" }}>Shipment ID: {pkg.shipmentId}</Typography>
                <Typography sx={{ color: "black" }}>
                  Departure Storage ID: {pkg.departureStorageId}
                </Typography>
                <Typography sx={{ color: "black" }}>
                  Destination Storage ID: {pkg.destinationStorageId}
                </Typography>

                {pkg.carParts && pkg.carParts.length > 0 && (
                  <>
                    <Typography sx={{ mt: 1, fontWeight: "bold" }}>Car Parts:</Typography>
                    {pkg.carParts.map((part) => (
                      <Card
                        key={part.id}
                        variant="outlined"
                        sx={{ p: 1, mt: 1, backgroundColor: "#f9f9f9" }}
                      >
                        <Typography>Name: {part.name}</Typography>
                        <Typography>
                          Manufactured At: {new Date(part.manufacturedAt).toLocaleDateString()}
                        </Typography>
                        <Typography>Homologation Number: {part.homologationNumber}</Typography>
                        <Typography>Description: {part.description}</Typography>
                        <Typography>Weight: {part.weight}</Typography>
                        <Typography>Status: {part.status}</Typography>
                      </Card>
                    ))}
                  </>
                )}
              </Card>
            ))}
          </Box>
        ) : (
          <Typography variant="body1">No packages available for this transport.</Typography>
        )}
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} variant="contained" color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PackagesModal;
