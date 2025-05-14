import API from "./api";

export const getTransportCompanies = async (page = 0, size = 100) => {
  try {
    const response = await API.get(`/transport-company/all?page=${page}&size=${size}`); 

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to fetch transport companies. Unexpected response status.");
    }
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch transport companies.");
  }
};

export const deleteTransportCompany = async (companyId) => {
  try {
    const response = await API.delete(`/transport-company/${companyId}`);

    if (response.status === 200) {
      return response.data; 
    } else {
      throw new Error("Failed to delete transport company. Unexpected response status.");
    }
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to delete transport company.");
  }
};


export const addTransportCompany = async (companyData) => {
  try {
    const response = await API.post("/transport-company/create", companyData); 

    if (response.status === 200) {
      return response.data; 
    } else {
      throw new Error("Failed to add transport company. Unexpected response status.");
    }
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to add transport company.");
  }
};


