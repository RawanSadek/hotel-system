import type { JwtPayload } from "jwt-decode";
import type { ReactNode } from "react";

export interface loginDataTypes {
  email: string;
  password: string;
}
export interface IUserData {
  country: string;
  createdAt: Date | string;
  email: string;
  phoneNumber: number;
  profileImage: string;
  role: "admin" | "portal";
  updatedAt: Date | string;
  userName: string;
  verified: boolean;
  _id: string;
}
export interface changePassDataTypes {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}
export interface BookingListInterface {
  _id: string;
  roomNumber: string;
  userId: string;
  checkInDate: string;
  checkOutDate: string;
  totalPrice: number;
  startDate: string;
  endDate: string;
  user: { userName: string } | null;
  room: RoomsListInterface | null;
}
export interface BookingPopUpInterface {
  open: boolean;
  handleClose: () => void;
  bookingId: string | null;
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
  userProfile: IUserData | null;
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
export interface DeleteConfirmationProps {
  onClose: () => void;
  open: boolean;
  handleClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
}
export interface RoomsListInterface {
  _id: string;
  roomNumber: string;
  price: number;
  capacity: number;
  discount: number;
  images: string[];
  imgs: string[];
  facilities: [
    {
      _id: string;
      name: string;
    }
  ];
}

export interface FacilitiesInterface {
  _id: string;
  name: string;
}
export interface IFacilities {
  _id: string;
  name: string;
  createdAt: string;
  createdBy: { userName: string } | null;
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
  room: {
    _id: string;
    discount: number;
  };
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

export interface BookingListInterface {
  _id: string;
  totalPrice: number;
  room: RoomsListInterface | null;
  user: { _id: string; userName: string } | null;
  startDate: string;
  endDate: string;
  status: string;
}
