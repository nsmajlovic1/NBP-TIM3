import API from "./api";

export const getTeams = async (page = 0, size = 100) => {
  try {
    const response = await API.get(`/team/all`, {
      params: {
        page: page, 
        size: size   
      }
    });
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

export const getTeamById = async (teamId) => {
  try {
    const response = await API.get(`/team/${teamId}`);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to fetch team data.");
    }
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch team.");
  }
};

export const getAvailableMechanics = async () => {
  try {
    const response = await API.get('/team/mechanics/available');
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to fetch available mechanics.");
    }
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch available mechanics.");
  }
};

export const getAvailableLogistics = async () => {
  try {
    const response = await API.get('/team/logistics/available');
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to fetch available logistics.");
    }
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch available logistics.");
  }
};

export const assignUserToTeam = async (teamId, userId) => {
  try {
    const response = await API.post(`/team/${teamId}/assign/${userId}`);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to assign user to team.");
    }
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to assign user to team.");
  }
};

export const removeTeamMember = async (teamId, userId) => {
  try {
    const response = await API.delete(`/team/${teamId}/remove/${userId}`);

    if (response.status === 200) {
      return response.data; 
    } else {
      throw new Error("Failed to delete member. Unexpected response status.");
    }
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to delete member.");
  }
};