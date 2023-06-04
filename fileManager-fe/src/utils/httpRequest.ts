import axios from "axios";

const httpRequest = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

httpRequest.interceptors.response.use(
  (response) => {
    if (response) {
      return response;
    }

    return response;
  },
  (error) => {
    throw error;
  }
);

export default httpRequest;
