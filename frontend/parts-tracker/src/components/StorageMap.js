import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { useEffect } from "react";
import { Typography } from "@mui/material";
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
        const { streetName, cityName, countryIso } = storage.location;

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
              <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                {streetName}, {cityName}, {countryIso}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Capacity: {storage.capacity}
              </Typography>
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
