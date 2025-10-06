import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const modelsApi = {
  getModels: async () => {
    const response = await api.get("/models");
    return response.data;
  },

  tryOnOutfit: async (formData: any) => {
    const response = await api.post("/try-on", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  createModel: async (formData: any) => {
    const response = await api.post("/models", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },
};

export default api;
