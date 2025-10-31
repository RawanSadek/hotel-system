// import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import type {
  AuthContextType,
  AuthProviderProps,
  IUserData,
} from "../../Services/INTERFACE";
import { axiosInstance, USERDashBoard_URLS } from "../../Services/END_POINTS";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType>({
  loginData: null,
  getLoginData: () => {},
  logout: () => {},
  userProfile: null,
});

export function AuthContextProvider({ children }: AuthProviderProps) {
  const [userProfile, setUserProfile] = useState<IUserData | null>(null);
  const [loginData, setLoginData] = useState(() => {
    const userData = localStorage.getItem("userData");
    return userData ? JSON.parse(userData) : null;
    // const token = localStorage.getItem("token");
    // return token ? jwtDecode(token) : null;
  });

  // const userData = localStorage.getItem("userData");
  const getUser = async () => {
    try {
      if (!loginData?._id) return;
      const res = await axiosInstance.get(
        USERDashBoard_URLS.GET_USER_PROFILE(loginData?._id)
      );
      setUserProfile(res.data.data.user);
    } catch (err) {
      console.error("Failed to fetch user data", err);
    }
  };
  const getLoginData = () => {
    // const encodedData = localStorage.getItem('token');
    // if (!encodedData) return;
    // const decodedData = jwtDecode(encodedData);
    // setLoginData(decodedData);

    const userData = localStorage.getItem("userData");
    setLoginData(userData ? JSON.parse(userData) : null);
  };

  useEffect(() => {
    if (localStorage.getItem("token")) getLoginData();
    getUser();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setLoginData(null);
    <Navigate to="/login" />;
  };

  return (
    <AuthContext.Provider
      value={{ loginData, getLoginData, logout, userProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
}
