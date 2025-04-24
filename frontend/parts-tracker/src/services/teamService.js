import API from "./api";
import { toast } from "react-toastify";

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