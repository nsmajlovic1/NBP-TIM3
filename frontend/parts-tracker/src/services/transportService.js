import API from "./api";


export const getTransportStatistic = async () => {
  try {
    const response = await API.get("/transport/statistic");
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to fetch transport statistic. Unexpected response status.");
    }
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch transport statistic.");
  }
};

export const getTransports = async () => {
  try {
    const response = await API.get(`/transport`);
    if (response.status === 200) {
      return response.data; 
    } else {
      throw new Error("Failed to fetch transport data. Unexpected response status.");
    }
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch transport data.");
  }
};


export const createTransport = async (transportData) => {
  try {
    const response = await API.post("/transport", transportData);
    if (response.status === 200 || response.status === 201) {
      return response.data;
    } else {
      throw new Error("Failed to create transport. Unexpected response status.");
    }
  } catch (error) {
    throw error;
  }
};

export const getTransportById = async (transportId) => {
  try {
    const response = await API.get(`/transport/${transportId}`);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to fetch transport data.");
    }
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch transport.");
  }
};




