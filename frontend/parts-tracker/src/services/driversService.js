import API from "./api";

export const getDrivers = async () => {
  try {
    const response = await API.get("/driver");

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to fetch drivers. Unexpected response status.");
    }
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch drivers data.");
  }
};

export const getDriversByTeam = async () => {
  try {
    const response = await API.get("/driver/team");

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to fetch drivers. Unexpected response status.");
    }
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch drivers data.");
  }
};

