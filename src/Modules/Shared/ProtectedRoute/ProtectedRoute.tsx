
// import { useContext } from "react";
// import { Navigate } from "react-router-dom";
// import { AuthContext } from "../../../Contexts/AuthContext/AuthContext";

// interface ProtectedRoutedProps {
//   children: React.ReactNode;
// }
// const ProtectedRoute = ({ children }: ProtectedRoutedProps) => {
//      let {loginData}= useContext(AuthContext)
//   if (
//   localStorage.getItem('token')|| loginData &&
//     localStorage.getItem("getUser") === "admin"
//   ) {
//     return children;
//   } else if (
//   localStorage.getItem('token')|| loginData &&
//     localStorage.getItem("getUser") === "user"
//   ) {
//     return <Navigate to={"/"} />;
//   } else {
//     return <Navigate to={"/login"} />;
//   }
// };

// export default ProtectedRoute;
