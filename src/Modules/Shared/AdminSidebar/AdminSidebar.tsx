import  { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { styled, type Theme, type CSSObject } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import {
  Box,
  CssBaseline,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import LockIcon from "@mui/icons-material/Lock";
import LogoutIcon from "@mui/icons-material/Logout";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BeenhereIcon from "@mui/icons-material/Beenhere";
import BedIcon from "@mui/icons-material/Bed";
import { AuthContext } from "../../../Contexts/AuthContext/AuthContext";
import { useTranslation } from "react-i18next";

export const drawerWidth = 260;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(1),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})<{ open: boolean }>(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  "& .MuiDrawer-paper": {
    height: "100vh",
    backgroundColor: "#1f3fc6",
    color: "#fff",
    ...(open ? openedMixin(theme) : closedMixin(theme)),
  },
  ...(open ? openedMixin(theme) : closedMixin(theme)),
   "& .MuiDrawer-paperAnchorLeft": { borderRight: "none" },
  "& .MuiDrawer-paperAnchorRight": { borderLeft: "none" },
}));

const isActive = (to: string, pathname: string) => {
  if (to === "/dashboard") return pathname === "/dashboard";
  return pathname === to || pathname.startsWith(`${to}/`);
};

export default function AdminSidebar({
  open,
  onToggle,
}: {
  open: boolean;
  onToggle: () => void;
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const { i18n, t } = useTranslation(); 
    const isRTL = i18n.dir() === "rtl";

  const ToggleIcon = isRTL
    ? (open ? ArrowBackIcon : ArrowForwardIcon)   
    : (open ? ArrowForwardIcon : ArrowBackIcon);  

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <>
      <CssBaseline />
      <Drawer variant="permanent" open={open} anchor={isRTL ? "right" : "left"}>
        <DrawerHeader>
          <IconButton
            onClick={onToggle}
            aria-label="toggle sidebar"
            sx={{
              width: 40,
              height: 40,
              border: "1px solid",
              borderColor: "divider",
              color: "#fff",
              borderRadius: 2,
              bgcolor: "action.hover",
              "&:hover": { bgcolor: "action.selected" },
            }}
          >
            {open ? <ArrowForwardIcon /> : <ArrowBackIcon />}
          </IconButton>
          <Box />
        </DrawerHeader>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.25)" }} />

        <List sx={{ pt: 0 }}>
          {/* Home */}
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
              component={Link}
              to="/dashboard"
              sx={{
                minHeight: 46,
                px: 2,
                justifyContent: open ? "initial" : "center",
                borderRadius: 2,
                mx: 1,
                my: 0.5,
                color: "#fff",
                ...(isActive("/dashboard", location.pathname) && {
                  bgcolor: "rgba(255,255,255,0.22)",
                  "&:hover": { bgcolor: "rgba(255,255,255,0.26)" },
                }),
                "&:hover": { bgcolor: "rgba(255,255,255,0.14)" },
              }}
            >
              <ListItemIcon sx={{ minWidth: 0, mr: open ? 2 : "auto", justifyContent: "center", color: "#fff" }}>
                <HomeOutlinedIcon />
              </ListItemIcon>
              <ListItemText
                primary={t("Sidebar.home") || "Home"}
                primaryTypographyProps={{ noWrap: true, sx: { color: "#fff" } }}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>

          {/* Users */}
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
              component={Link}
              to="/dashboard/users-list"
              sx={{
                minHeight: 46,
                px: 2,
                justifyContent: open ? "initial" : "center",
                borderRadius: 2,
                mx: 1,
                my: 0.5,
                color: "#fff",
                ...(isActive("/dashboard/users-list", location.pathname) && {
                  bgcolor: "rgba(255,255,255,0.22)",
                  "&:hover": { bgcolor: "rgba(255,255,255,0.26)" },
                }),
                "&:hover": { bgcolor: "rgba(255,255,255,0.14)" },
              }}
            >
              <ListItemIcon sx={{ minWidth: 0, mr: open ? 2 : "auto", justifyContent: "center", color: "#fff" }}>
                <PeopleAltOutlinedIcon />
              </ListItemIcon>
              <ListItemText
                primary={t("Sidebar.users") || "Users"}
                primaryTypographyProps={{ noWrap: true, sx: { color: "#fff" } }}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>

          {/* Rooms */}
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
              component={Link}
              to="/dashboard/rooms"
              sx={{
                minHeight: 46,
                px: 2,
                justifyContent: open ? "initial" : "center",
                borderRadius: 2,
                mx: 1,
                my: 0.5,
                color: "#fff",
                ...(isActive("/dashboard/rooms", location.pathname) && {
                  bgcolor: "rgba(255,255,255,0.22)",
                  "&:hover": { bgcolor: "rgba(255,255,255,0.26)" },
                }),
                "&:hover": { bgcolor: "rgba(255,255,255,0.14)" },
              }}
            >
              <ListItemIcon sx={{ minWidth: 0, mr: open ? 2 : "auto", justifyContent: "center", color: "#fff" }}>
                <BedIcon />
              </ListItemIcon>
              <ListItemText
                primary={t("Sidebar.rooms") || "Rooms"}
                primaryTypographyProps={{ noWrap: true, sx: { color: "#fff" } }}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>

          {/* Ads */}
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
              component={Link}
              to="/dashboard/ads"
              sx={{
                minHeight: 46,
                px: 2,
                justifyContent: open ? "initial" : "center",
                borderRadius: 2,
                mx: 1,
                my: 0.5,
                color: "#fff",
                ...(isActive("/dashboard/ads", location.pathname) && {
                  bgcolor: "rgba(255,255,255,0.22)",
                  "&:hover": { bgcolor: "rgba(255,255,255,0.26)" },
                }),
                "&:hover": { bgcolor: "rgba(255,255,255,0.14)" },
              }}
            >
              <ListItemIcon sx={{ minWidth: 0, mr: open ? 2 : "auto", justifyContent: "center", color: "#fff" }}>
                <CalendarMonthOutlinedIcon />
              </ListItemIcon>
              <ListItemText
                primary={t("Sidebar.ads") || "Ads"}
                primaryTypographyProps={{ noWrap: true, sx: { color: "#fff" } }}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>

          {/* Booking */}
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
              component={Link}
              to="/dashboard/booking-list"
              sx={{
                minHeight: 46,
                px: 2,
                justifyContent: open ? "initial" : "center",
                borderRadius: 2,
                mx: 1,
                my: 0.5,
                color: "#fff",
                ...(isActive("/dashboard/booking-list", location.pathname) && {
                  bgcolor: "rgba(255,255,255,0.22)",
                  "&:hover": { bgcolor: "rgba(255,255,255,0.26)" },
                }),
                "&:hover": { bgcolor: "rgba(255,255,255,0.14)" },
              }}
            >
              <ListItemIcon sx={{ minWidth: 0, mr: open ? 2 : "auto", justifyContent: "center", color: "#fff" }}>
                <BeenhereIcon />
              </ListItemIcon>
              <ListItemText
                primary={t("Sidebar.booking") || "Booking"}
                primaryTypographyProps={{ noWrap: true, sx: { color: "#fff" } }}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>

          {/* Facilities */}
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
              component={Link}
              to="/dashboard/facilities"
              sx={{
                minHeight: 46,
                px: 2,
                justifyContent: open ? "initial" : "center",
                borderRadius: 2,
                mx: 1,
                my: 0.5,
                color: "#fff",
                ...(isActive("/dashboard/facilities", location.pathname) && {
                  bgcolor: "rgba(255,255,255,0.22)",
                  "&:hover": { bgcolor: "rgba(255,255,255,0.26)" },
                }),
                "&:hover": { bgcolor: "rgba(255,255,255,0.14)" },
              }}
            >
              <ListItemIcon sx={{ minWidth: 0, mr: open ? 2 : "auto", justifyContent: "center", color: "#fff" }}>
                <DashboardOutlinedIcon />
              </ListItemIcon>
              <ListItemText
                primary={t("Sidebar.facilities") || "Facilities"}
                primaryTypographyProps={{ noWrap: true, sx: { color: "#fff" } }}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>

          {/* Change Password */}
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
              component={Link}
              to="/change-password"
              sx={{
                minHeight: 46,
                px: 2,
                justifyContent: open ? "initial" : "center",
                borderRadius: 2,
                mx: 1,
                my: 0.5,
                color: "#fff",
                ...(isActive("/dashboard/ChangePassword", location.pathname) && {
                  bgcolor: "rgba(255,255,255,0.22)",
                  "&:hover": { bgcolor: "rgba(255,255,255,0.26)" },
                }),
                "&:hover": { bgcolor: "rgba(255,255,255,0.14)" },
              }}
            >
              <ListItemIcon sx={{ minWidth: 0, mr: open ? 2 : "auto", justifyContent: "center", color: "#fff" }}>
                <LockIcon />
              </ListItemIcon>
              <ListItemText
                primary={t("Sidebar.changePassword") || "Change password"}
                primaryTypographyProps={{ noWrap: true, sx: { color: "#fff" } }}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>

          {/* Logout */}
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
              component={Link}
              to="/logout"
              onClick={(e) => {
                e.preventDefault();
                handleLogout();  
              }}
              sx={{
                minHeight: 46,
                px: 2,
                justifyContent: open ? "initial" : "center",
                borderRadius: 2,
                mx: 1,
                my: 0.5,
                color: "#fff",
                "&:hover": { bgcolor: "rgba(255,255,255,0.14)" },
              }}
            >
              <ListItemIcon sx={{ minWidth: 0, mr: open ? 2 : "auto", justifyContent: "center", color: "#fff" }}>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText
                primary={t("Sidebar.logout") || "Logout"}
                primaryTypographyProps={{ noWrap: true, sx: { color: "#fff" } }}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}
