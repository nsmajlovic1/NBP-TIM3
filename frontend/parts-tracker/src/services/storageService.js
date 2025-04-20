import API from "./api";

export const getStorages = async () => {
  try {
    const response = await API.get("/storages/all");

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to fetch storages. Unexpected response status.");
    }
  } catch (error) {
    // FAKE response for testing 
    return [
      {
        id: 1,
        address: "Warehouse A, Sarajevo",
        capacity: 1200,
        latitude: 43.8563,
        longitude: 18.4131,
      },
      {
        id: 2,
        address: "Warehouse B, Mostar",
        capacity: 800,
        latitude: 43.3438,
        longitude: 17.8078,
      },
      {
        id: 3,
        address: "Warehouse C, Banja Luka",
        capacity: 1500,
        latitude: 44.7722,
        longitude: 17.1910,
      },
    ];
  }
};
