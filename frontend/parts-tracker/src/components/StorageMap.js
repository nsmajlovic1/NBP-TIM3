import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { useEffect, useRef } from "react";
import StoragePopup from "./StoragePopup"; 
import "leaflet/dist/leaflet.css";

const storageIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/2933/2933921.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

const selectedStorageIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
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

const StorageMap = ({ storages, selectedStorage, onMarkerClick, popupOpen, setPopupOpen }) => {
  const markerRefs = useRef({});

  useEffect(() => {
    if (popupOpen && markerRefs.current[popupOpen]) {
      markerRefs.current[popupOpen].openPopup();
    }
  }, [popupOpen]);

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
        const isSelected = selectedStorage?.id === storage.id;
        return (
          <Marker
            key={storage.id}
            position={[storage.location.latitude, storage.location.longitude]}
            icon={isSelected ? selectedStorageIcon : storageIcon}
            eventHandlers={{
              click: () => {
                onMarkerClick(storage);
                setPopupOpen(storage.id);
              },
            }}
            ref={(ref) => {
              if (ref) {
                markerRefs.current[storage.id] = ref;
              } else {
                delete markerRefs.current[storage.id];
              }
            }}
          >
            <Popup>
              <StoragePopup storage={storage} />
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
