import API from "./api";

export const uploadStorageImage = async (storageId, file) => {

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(',')[1]);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  try {
    const base64Image = await getBase64(file);

    const fileExtension = file.name.split('.').pop().toLowerCase();

    const response = await API.post(`/image/upload`, {
      
      assignId: storageId,
      assignType: "STORAGE",
      extension: fileExtension, 
      base64: base64Image     
    });

    if (response.status === 200) {
        return response.data;
      } else {
        throw new Error("Failed to upload image.");
      }
    } catch (error) {
      const serverErrors = error.response?.data?.errors;
      if (serverErrors && Array.isArray(serverErrors) && serverErrors.length > 0) {
        throw new Error(serverErrors[0].message);
      }

      throw new Error(error.response?.data?.message || "Failed to upload image.");
    }
  };

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
      return response.data;
    } else {
      throw new Error("Failed to fetch image.");
    }
  } catch (error) {
    console.error("Error fetching image by ID:", error);
    return null;
  }
};

export const deleteImage = async (id) => {
  try {
    const response = await API.delete(`/image/${id}`);

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to delete image.")
    }
  } catch (error) {
    const serverErrors = error.response?.data?.errors;
    if (serverErrors && Array.isArray(serverErrors) && serverErrors.length > 0) {
      throw new Error(serverErrors[0].message);
    }
    throw new Error(error.response?.data?.message || "Failed to delete image.");
  }
}



