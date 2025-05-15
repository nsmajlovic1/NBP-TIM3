import API from "./api";

export const getReportByTeam = async (teamId) => {
  try {
    const response = await API.get("/reports/storage/pdf", {
      params: { teamId },
      responseType: 'blob',
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to fetch report. Unexpected response status.");
    }
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch report.");
  }
};