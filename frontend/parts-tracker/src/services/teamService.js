import API from "./api";

export const getTeams = async (page = 0, size = 5) => {
  try {
    const response = await API.get(`/team/all?page=${page}&size=${size}`);
    if (response.status === 200) {
      return response.data; 
    } else {
      throw new Error("Failed to fetch teams. Unexpected response status.");
    }
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch team data.");
  }
};

export const createTeam = async (teamData) => {
  try {
    const response = await API.post("/team/create", teamData);
    if (response.status === 200 || response.status === 201) {
      return response.data;
    } else {
      throw new Error("Failed to create team. Unexpected response status.");
    }
  } catch (error) {
    throw error;
  }
};