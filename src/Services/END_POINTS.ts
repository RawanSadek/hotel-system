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
  UPDATE_ROOMS: (id: string) => `${adminPortalBaseURL}/rooms/${id}`,
  GET_ROOM_DETAILS: (id: string) => `${adminPortalBaseURL}/rooms/${id}`,
  DELETE_ROOM: (id: string) => `${adminPortalBaseURL}/rooms/${id}`,
};
// Users Dashboard URLs
export const USERDashBoard_URLS = {
  GET_ALL: `${adminPortalBaseURL}/users`,
  GET_USER_DETAILS: (id: number) => `${adminPortalBaseURL}/users/${id}`,
  GET_USER_PROFILE: (id: string) => `${adminPortalBaseURL}/users/${id}`,
};

// Facilities URLs
export const FACILITIES_URLS = {
  GET_ALL: `${adminPortalBaseURL}/room-facilities`,
  CREATE_FACILITY: `${adminPortalBaseURL}/room-facilities`,
  UPDATE_FACILITY: (id: string) =>
    `${adminPortalBaseURL}/room-facilities/${id}`,
  GET_FACILITY_DETAILS: (id: string) =>
    `${adminPortalBaseURL}/room-facilities/${id}`,
  DELETE_FACILITY: (id: string) =>
    `${adminPortalBaseURL}/room-facilities/${id}`,
};

// Booking URLs
export const BOOKING_URLS = {
  GET_ALL: `${adminPortalBaseURL}/booking`,
  GET_BOOking_DETAILS: (id: string) => `${adminPortalBaseURL}/booking/${id}`,
  DELETE_BOOKING: (id: string) => `${adminPortalBaseURL}/booking/${id}`,
  UPDATE_ROOMS: (id: number) => `${adminPortalBaseURL}/rooms/${id}`,
  GET_ROOM_DETAILS: (id: number) => `${adminPortalBaseURL}/rooms/${id}`,
  DELETE_ROOM: (id: number) => `${adminPortalBaseURL}/rooms/${id}`,
};
// ADS URLs
export const ADS_URLS = {
  GET_ALL: `${adminPortalBaseURL}/ads`,
  CREATE_AD: `${adminPortalBaseURL}/ads`,
  UPDATE_AD: (id: string) => `${adminPortalBaseURL}/ads/${id}`,
  GET_AD_DETAILS: (id: string) => `${adminPortalBaseURL}/ads/${id}`,
  DELETE_AD: (id: string) => `${adminPortalBaseURL}/ads/${id}`,
};
// Chart URLs
export const ADMINChart = {
  getChart: `${adminPortalBaseURL}/dashboard`,
};

// USER PORTAL
// -----------
//rooms Portal
export const ROOMPORTAL_URL = {
  GET_ALL: `${userPortalBaseURL}/rooms/available`,
  GET_ROOM_DETAILS: (id: string) => `${userPortalBaseURL}/rooms/${id}`,
};

//Favourites URLs
export const FAVOURITES_URLS = {
  GET_ALL: `${userPortalBaseURL}/favorite-rooms`,
  ADD_FAVOURITE: `${userPortalBaseURL}/favorite-rooms`,
  REMOVE_FAVOURITE: (id: string) => `${userPortalBaseURL}/favorite-rooms/${id}`,
};
