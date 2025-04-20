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

      {storages.map((storage) => (
        <Marker
          key={storage.id}
          position={[storage.latitude, storage.longitude]}
          icon={storageIcon}
          eventHandlers={{
            click: () => onMarkerClick(storage),
          }}
        >
          <Popup>
            <Typography variant="subtitle1">{storage.address}</Typography>
            <Typography variant="body2">Capacity: {storage.capacity}</Typography>
          </Popup>
        </Marker>
      ))}

      {selectedStorage && (
        <FlyToLocation
          position={[selectedStorage.latitude, selectedStorage.longitude]}
        />
      )}
    </MapContainer>
  );
};

export default StorageMap;
