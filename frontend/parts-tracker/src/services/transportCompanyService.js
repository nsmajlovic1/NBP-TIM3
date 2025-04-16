import API from "./api";

export const getTransportCompanies = async () => {
  try {
    const response = await API.get("/transport-company/all"); 

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


