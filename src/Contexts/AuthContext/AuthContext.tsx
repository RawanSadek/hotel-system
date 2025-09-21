// import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import type { AuthContextType, AuthProviderProps } from "../../Services/INTERFACES";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType>({
  loginData: null,
  getLoginData: () => {},
  logout: () => {},
});

export function AuthContextProvider({ children }: AuthProviderProps) {

  const [loginData, setLoginData] = useState(() => {
    const userData = localStorage.getItem("userData");
    return userData ? JSON.parse(userData) : null;
    // const token = localStorage.getItem("token");
    // return token ? jwtDecode(token) : null;
  });

  // const userData = localStorage.getItem("userData");

  const getLoginData = () => {
    // const encodedData = localStorage.getItem('token');
    // if (!encodedData) return;
    // const decodedData = jwtDecode(encodedData);
    // setLoginData(decodedData);

    const userData = localStorage.getItem('userData');
    setLoginData(userData ? JSON.parse(userData) : null);

  }

  useEffect(() => {
    if (localStorage.getItem('token'))
      getLoginData();
  }, [])

  const logout = () => {
    localStorage.removeItem('token');
    setLoginData(null);
    <Navigate to='/login' />
  }

  return <AuthContext.Provider value={{ loginData, getLoginData, logout }}>{children}</AuthContext.Provider>
}