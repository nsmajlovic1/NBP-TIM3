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

export const createDriver = async (driverData) => {
  try {
    const response = await API.post("/driver", driverData);
    if (response.status === 200 || response.status === 201) {
      return response.data;
    } else {
      throw new Error("Failed to create driver. Unexpected response status.");
    }
  } catch (error) {
    throw error;
  }
};

