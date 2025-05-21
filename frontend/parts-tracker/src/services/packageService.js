import API from "./api";

export const getPackagesStatistic = async () => {
  try {
    const response = await API.get("/package/statistic");
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to fetch package statistic. Unexpected response status.");
    }
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch package statistic.");
  }
};

export const createPackage = async (packageData) => {
  try {
    const response = await API.post("/package", packageData);

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to add package. Unexpected response status.");
    }
  } catch (error) {
    const serverErrors = error.response?.data?.errors;
    if (serverErrors && Array.isArray(serverErrors) && serverErrors.length > 0) {
      throw new Error(serverErrors[0].message);
    }

    throw new Error(error.response?.data?.message || "Failed to add package.");
  }
};
