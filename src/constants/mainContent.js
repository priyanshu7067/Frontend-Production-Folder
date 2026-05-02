// import axios from "axios";
import logo from "../assets/logo.png";
import Swal from "sweetalert2";
import { removeBannerShown, removeRole, removeToken } from "../utils/authStorage";
import axios from "axios";

export const MainContent = {
  appName: "Odin",
  logo: logo,
  appURL: "",
  contactNo: "+022-69710-968",
  email: "info@rg@gmail.com",
  address:
    " Noida Sector 62, SO Gautam Buddha Nagar, Uttar Pradesh, India - 201309",
  telegram_link: "https://t.me/YourTelegramUsername",
};

export const backendConfig = {
  base: import.meta.env.VITE_BASE_URL || "http://localhost:6069/api",
};

export const Axios = axios.create({
  baseURL: backendConfig.base,
  withCredentials: true,
});
Axios.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

Axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401 || error.response.status === 403) {
      console.warn("⚠️ Unauthorized! Logging out...");
      Swal.fire({
        icon: "warning",
        title: "Session Expired",
        text: "Your session has expired. Please log in again.",
        confirmButtonText: "OK",
        allowOutsideClick: false,
      }).then(() => {
        removeToken();
        removeRole();
        removeBannerShown();
        window.location.href = "/";
      });
    }

    return Promise.reject(error);
  },
);