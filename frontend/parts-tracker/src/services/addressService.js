// addressService.js
import API from "./api";
import { toast } from "react-toastify";

export const getAddresses = async () => {
  try {
    const response = await API.get("/address/all");
    if (response.status === 200) {
      return response.data; 
    } else {
      throw new Error("Failed to fetch addresses. Unexpected response status.");
    }
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch address data.");
  }
};

export const createAddress = async (addressData) => {
  try {
    const response = await API.post("/address/create", addressData);
    if (response.status === 200 || response.status === 201) {
      return response.data;
    } else {
      throw new Error("Failed to create address. Unexpected response status.");
    }
  } catch (error) {
    throw error;
  }
};