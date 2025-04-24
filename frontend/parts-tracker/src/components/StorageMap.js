import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { useEffect } from "react";
import { Typography, Box } from "@mui/material";
import "leaflet/dist/leaflet.css";

const storageIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/2933/2933921.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

const FlyToLocation = ({ position }) => {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.flyTo(position, 13);
    }
  }, [position]);

  return null;
};

const StorageMap = ({ storages, selectedStorage, onMarkerClick }) => {
  return (
    <MapContainer
      center={[43.8563, 18.4131]}
      zoom={8}
      scrollWheelZoom
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
      />

      {storages.map((storage) => {

        return (
          <Marker
            key={storage.id}
            position={[storage.location.latitude, storage.location.longitude]}
            icon={storageIcon}
            eventHandlers={{
              click: () => onMarkerClick(storage),
            }}
          >

          <Popup>
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
          </Popup>

          </Marker>
        );
      })}

      {selectedStorage && (
        <FlyToLocation
          position={[
            selectedStorage.location.latitude,
            selectedStorage.location.longitude,
          ]}
        />
      )}
    </MapContainer>
  );
};

export default StorageMap;
