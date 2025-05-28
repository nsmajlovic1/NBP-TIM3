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
      const offsetPosition = [position[0] - 0.01, position[1]];
      map.flyTo(offsetPosition, 12);
    }
  }, [position, map]);

  return null;
};

const StorageMap = ({ storages, selectedStorage, onMarkerClick, popupOpen, setPopupOpen }) => {
  const markerRefs = useRef({});
  const mapRef = useRef();
  const hasCentered = useRef(false);

  useEffect(() => {
    if (mapRef.current && storages.length > 0 && !hasCentered.current) {
      mapRef.current.flyTo(
        [storages[0].location.latitude, storages[0].location.longitude],
        12
      );
      hasCentered.current = true;
    }
  }, [storages]);

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
      whenCreated={(map) => { mapRef.current = map; }}
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
            <Popup className="storage-popup">
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