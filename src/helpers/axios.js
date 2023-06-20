import axios from "axios";

export const axiosApi = axios.create({
  baseURL: process.env.REACT_APP_BASEURL,
});

axiosApi.defaults.headers.common[
  "Authorization"
] = `Bearer ${localStorage.getItem("access")}`;

axiosApi.interceptors.response.use(
  (response) => response,
  (error) => {
    const statusCode = error?.response?.status;
    if (statusCode === 401) {
      localStorage.clear();
      location.reload();
    }
    return Promise.reject(error);
  }
);
