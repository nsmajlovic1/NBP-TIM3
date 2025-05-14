import API from "./api";

export const getCarParts = async () => {
  try {
    const response = await API.get("/car-part");

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to fetch car parts. Unexpected response status.");
    }
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch car parts data.");
  }
};

export const createCarPart = async (carPartData) => {
  try {
    const response = await API.post("/car-part/create", carPartData);

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to add car part. Unexpected response status.");
    }
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to add car part.");
  }
};