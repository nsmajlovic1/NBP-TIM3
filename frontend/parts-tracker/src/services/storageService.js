import API from "./api";

export const getStorages = async () => {
  try {
    const response = await API.get("/storage/all");

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to fetch storages. Unexpected response status.");
    }
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch storage data.");
  }
};
