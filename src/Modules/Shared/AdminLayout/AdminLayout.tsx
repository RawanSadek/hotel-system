import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Outlet } from "react-router-dom";
import AdminNavbar from "./../AdminNavbar/AdminNavbar";
import AdminSidebar from "../AdminSidebar/AdminSidebar";
import { useTranslation } from "react-i18next";
import "../../../i18n/i18n";
import React from "react";
import { Toolbar, useMediaQuery } from "@mui/material";
const drawerWidth = 260;

export default function AdminLayout() {
  const { i18n } = useTranslation();
   const isDesktop = useMediaQuery("(min-width:900px)");
  const [open, setOpen] = React.useState<boolean>(isDesktop);
  React.useEffect(() => setOpen(isDesktop), [isDesktop]);

  const toggleLang = () => {
    i18n.changeLanguage(i18n.language === "ar" ? "en" : "ar");
  };
  return (
   <Box sx={{ display: "flex" }}>
      {/* Navbar */}
      <AdminNavbar
 open={open}
        drawerWidth={drawerWidth}
      
        // right={
        //   <Button variant="outlined" size="small" onClick={toggleLang}>
        //     {i18n.language === "ar" ? "English" : "العربية"}
        //   </Button>
        // }
      />

      <AdminSidebar
        open={open}
        onToggle={() => setOpen((v) => !v)} 
      />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}
