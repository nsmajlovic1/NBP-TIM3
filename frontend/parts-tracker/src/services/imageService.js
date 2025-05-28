import API from "./api";

export const uploadStorageImage = async (assignId, file) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Token not found in localStorage');
  }

  const formData = new FormData();
  formData.append('assignId', assignId.toString());
  formData.append('assignType', 'STORAGE');
  formData.append('file', file);
  try {
      const response = await fetch('/api/image/upload', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });

    if (response.status === 200) {
        return response.data;
      } else {
        throw new Error("Failed to fetch image info. Unexpected response status.");
      }
  } catch (error) {
    const serverErrors = error.response?.data?.errors;
    if (serverErrors && Array.isArray(serverErrors) && serverErrors.length > 0) {
      throw new Error(serverErrors[0].message);
    }

    throw new Error(error.response?.data?.message || "Failed to fetch image info.");
  }
}

export const getStorageImageInfo = async (requestData) => {
  try {
    const params = new URLSearchParams({
      assignId: requestData.assignId.toString(),
      assignType: 'STORAGE'
    });
    const response = await API.get(`/image/get?${params.toString()}`);

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to fetch image info. Unexpected response status.");
    }
  } catch (error) {
    const serverErrors = error.response?.data?.errors;
    if (serverErrors && Array.isArray(serverErrors) && serverErrors.length > 0) {
      throw new Error(serverErrors[0].message);
    }

    throw new Error(error.response?.data?.message || "Failed to fetch image info.");
  }
};

export const getImageById = async (id) => {
  try {
    const response = await API.get(`/image/${id}`, {
      responseType: 'blob'  
    });

    if (response.status === 200) {
      console.log(response.data)
      return response.data;
    } else {
      throw new Error("Failed to fetch image.");
    }
  } catch (error) {
    console.error("Error fetching image by ID:", error);
    return null;
  }
};



