import API from "./api";

export const getStorages = async () => {
  try {
    const response = await API.get("/storage/all?page=1&size=100");

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to fetch storages. Unexpected response status.");
    }
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch storage data.");
  }
};

export const addStorage = async (storageData) => {
  try {
    const response = await API.post("/storage/create", storageData);

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to add storage. Unexpected response status.");
    }
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to add storage.");
  }
};

export const getStoragesByTeam = async (teamId) => {
  try {
    const response = await API.get("/storage/team", {
      params: { teamId },
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to fetch storages. Unexpected response status.");
    }
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch storage data.");
  }
};


export const getStorageById = async (storageId) => {
  try {
    const response = await API.get(`/storage/${storageId}`);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to fetch storage data.");
    }
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch storage.");
  }
};


