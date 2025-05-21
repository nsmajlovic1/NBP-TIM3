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