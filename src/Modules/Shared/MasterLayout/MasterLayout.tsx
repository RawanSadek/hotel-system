import { Outlet } from "react-router-dom";
import MasterNavbar from "../MasterNavbar/MasterNavbar";
import MasterFooter from "../MasterFooter/MasterFooter";

export default function MasterLayout() {
  return (
    <>
      <MasterNavbar />

      <Outlet />
      <MasterFooter />
    </>
  );
}
