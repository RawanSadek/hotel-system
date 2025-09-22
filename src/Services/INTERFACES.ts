import type { JwtPayload } from "jwt-decode";
import type { ReactNode } from "react";

export interface loginDataTypes {
  email: string;
  password: string;
}

export interface changePassDataTypes {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface RegisterTypes {
  userName: string;
  email: string;
  country: string;
  profileImage?: string;
  role: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}

export interface AuthContextType {
  loginData: JwtPayload | null;
  getLoginData: () => void;
  logout: () => void;
}

export interface AuthProviderProps {
  children: ReactNode;
}
export interface IForgotPasswordTypes {
  email: string;
}
export interface IResetPasswordTypes {
  email: string;
  seed: string;
  password: string;
  confirmPassword: string;
}

export interface RoomsListInterface {
  _id: string;
  roomNumber: string;
  price: number;
  capacity: number;
  discount: number;
  images: [string]
}

export interface BookingListInterface {
  _id: string;
  room: { roomNumber: string };
  totalPrice: number;
  startDate: string;
  endDate: string;
  user: { userName: string }
}

export interface BookingPopUpInterface {
  open: boolean;
  handleClose: () => void;
  bookingId?: string | null;
}
