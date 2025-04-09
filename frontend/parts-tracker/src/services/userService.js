import API from "./api";

export const registerUser = async (userData) => {
  try {
    const response = await API.post("/auth/register", userData);

    if (response.status === 201 || response.status === 200) {
      return response.data;
    } else {
      throw new Error("Registration failed. Unexpected response status.");
    }
  } catch (error) {
    throw new Error(error.response?.data?.message || "Registration failed");
  }
};
