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
  images: [string];
  imgs: [string];
}

export interface FacilitiesInterface {
  _id: string;
  name: string;
}
export interface AddsRoom {
  _id: string;
  roomNumber: string;
}
export interface IADS {
  _id?: string;
  roomId: string;
  discount: number;
  isActive: boolean;
  room?: RoomsListInterface;
  createdAt?: string;
  updatedAt?: string;
}
export interface IADSForm {
  room: string;
  discount: number;
  isActive: string;
}
export interface IselectedAdd {
  _id: string;
  roomId: string;
  discount: number;
  isActive: boolean;
  roomNumber: string;
  price: number;
  capacity: number;
}
export interface IADS {
  _id?: string;
  roomId: string;
  discount: number;
  isActive: boolean;
  room?: RoomsListInterface;
  createdAt?: string;
  updatedAt?: string;
}
