import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import LandingPage from "./Modules/Shared/LandingPage/LandingPage";
import NotFound from "./Modules/Shared/NotFound/NotFound";
import AuthLayout from "./Modules/Shared/AuthLayout/AuthLayout";
import Register from "./Modules/AuthModule/Register/Register";
import ForgotPassword from "./Modules/AuthModule/ForgotPassword/ForgotPassword";
import ResetPassword from "./Modules/AuthModule/ResetPassword/ResetPassword";
import ChangePassword from "./Modules/AuthModule/ChangePassword/ChangePassword";
import MasterLayout from "./Modules/Shared/MasterLayout/MasterLayout";
import Login from "./Modules/AuthModule/Login/Login";
import RoomDetails from "./Modules/UserModule/RoomDetails/RoomDetails";
import Explore from "./Modules/UserModule/Explore/Explore";
import Favourites from "./Modules/UserModule/Favourites/Favourites";
import AdminDashboard from "./Modules/AdminModule/AdminDashboard/AdminDashboard";
import RoomsList from "./Modules/AdminModule/Rooms/RoomsList";
import RoomData from "./Modules/AdminModule/Rooms/RoomData";
import BookingList from "./Modules/AdminModule/Booking/BookingList";
import { AuthContextProvider } from "./Contexts/AuthContext/AuthContext";
import FacilitiesView from "./Modules/AdminModule/Facilities/FacilitiesView";
import ADSList from "./Modules/AdminModule/ADS/ADSList";
import UsersList from "./Modules/AdminModule/Users/UsersList";
import Payment from "./Modules/UserModule/Payment/Payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentSuccess from "./Modules/UserModule/Payment/component/PaymentSuccess";

  const stripe = loadStripe("pk_test_51SC5ir4t9AN1sPAiuqEPOI2HMWro6YkwziPoqvl1t3mwIJ8STKujXgajpo9COa3vnH9Tfq9H6CdpCyxGuC7MjUxb0071oUz3OI")

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AdminLayout from "./Modules/Shared/AdminLayout/AdminLayout";
function App() {


  const routes = createBrowserRouter([
    {
      path: "",
      element: <MasterLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <LandingPage /> },
        { path: "landing-page", element: <LandingPage /> },
        { path: "room-details/:id", element: <RoomDetails /> },
        { path: "explore", element: <Explore /> },
        { path: "favourites", element: <Favourites /> },
        { path: "Payment", element: <Payment /> },
        { path: "payment/success", element: <PaymentSuccess /> },


      ],
    },
    {
      path: "",
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "forgot-password", element: <ForgotPassword /> },
        { path: "reset-password", element: <ResetPassword /> },
        { path: "change-password", element: <ChangePassword /> },
      ],
    },

    {
      path: "dashboard",

      element: <AdminLayout />,

      errorElement: <NotFound />,
      children: [
        { index: true, element: <AdminDashboard /> },
        { path: "rooms", element: <RoomsList /> },
        { path: "add-room", element: <RoomData /> },
        { path: "edit-room/:id", element: <RoomData /> },
        { path: "view-room/:id", element: <RoomData /> },
        { path: "facilities", element: <FacilitiesView /> },
        { path: "ads", element: <ADSList /> },
        { path: "booking-list", element: <BookingList /> },
        { path: "users-list", element: <UsersList /> },
      ],
    },
  ]);
  return (
    <>
     <ToastContainer />
      <Elements stripe={stripe}>
        <AuthContextProvider>
          <RouterProvider router={routes} />
        </AuthContextProvider>
      </Elements>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ToastContainer />
        <AuthContextProvider>
          <RouterProvider router={routes}></RouterProvider>
        </AuthContextProvider>
      </LocalizationProvider>
    </>
  );
}

export default App;
