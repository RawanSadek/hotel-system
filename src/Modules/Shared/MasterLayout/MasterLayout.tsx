import { Outlet } from "react-router-dom";
import MasterNavbar from "../MasterNavbar/MasterNavbar";
import MasterFooter from "../MasterFooter/MasterFooter";
import { Box } from "@mui/material";

export default function MasterLayout() {
  return (
    <>
      <MasterNavbar />
      <Box px={{ xs: 2, sm: 4, md: 8, lg: 20 }} py={6}>
        <Outlet />
      </Box>

      <MasterFooter />
    </>
  );
}
