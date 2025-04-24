import API from "./api";

export const getTeams = async () => {
  try {
    const response = await API.get("/team/all");

    if (response.status === 200) {
      return response.data; 
    } else {
      throw new Error("Failed to fetch teams. Unexpected response status.");
    }
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch team data.");
  }
};
