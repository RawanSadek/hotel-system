import axios from "axios";

const baseURL = `https://upskilling-egypt.com:3000/api/v0`;
export const userPortalBaseURL = `/portal`;
export const adminPortalBaseURL = `/admin`;

export const axiosInstance = axios.create({
  baseURL,
  headers: { Authorization: localStorage.getItem("token") },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// AUTH_URLs
export const USERS_URLS = {
  LOGIN: `${userPortalBaseURL}/users/login`,
  REGISTER: `${userPortalBaseURL}/users`,
  FORGOT_PASSWORD: `${userPortalBaseURL}/users/forgot-password`,
  RESET_PASSWORD: `${userPortalBaseURL}users/reset-password`,
  CHANGE_PASSWORD: `${userPortalBaseURL}/users/change-password`,
  GOOGLE_AUTH: `${userPortalBaseURL}/users/auth/google`,
  FACEBOOK_AUTH: `${userPortalBaseURL}/users/auth/facebook`,
};

// ADMIN PORTAL
// ------------

// Rooms URLs
export const ROOMS_URLS = {
  GET_ALL: `${adminPortalBaseURL}/rooms`,
  CREATE_ROOM: `${adminPortalBaseURL}/rooms`,
  UPDATE_ROOMS: (id: number) => `${adminPortalBaseURL}/rooms/${id}`,
  GET_ROOM_DETAILS: (id: number) => `${adminPortalBaseURL}/rooms/${id}`,
  DELETE_ROOM: (id: number) => `${adminPortalBaseURL}/rooms/${id}`,
};

// Facilities URLs
export const FACILITIES_URLS = {
  GET_ALL: `${adminPortalBaseURL}/room-facilities`,
  CREATE_FACILITY: `${adminPortalBaseURL}/room-facilities`,
  UPDATE_FACILITY: (id: string) => `${adminPortalBaseURL}/room-facilities/${id}`,
  GET_FACILITY_DETAILS: (id: string) => `${adminPortalBaseURL}/room-facilities/${id}`,
  DELETE_FACILITY: (id: string) => `${adminPortalBaseURL}/room-facilities/${id}`,
};

// USER PORTAL
// -----------
