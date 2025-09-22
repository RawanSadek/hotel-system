import React, { useContext } from "react";
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
import MenuIcon from "@mui/icons-material/Menu";
import BeenhereIcon from "@mui/icons-material/Beenhere";
import BedIcon from "@mui/icons-material/Bed";
import { AuthContext } from "../../../Contexts/AuthContext/AuthContext";

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
    borderRight: "",
    height: "100vh",
    backgroundColor: "#1f3fc6",
    color: "#fff",
    ...(open ? openedMixin(theme) : closedMixin(theme)),
  },
  ...(open ? openedMixin(theme) : closedMixin(theme)),
}));

type NavItem = { key: string; to: string; icon: React.ReactNode };
const isActive = (to: string, pathname: string) => {
  if (to === "/dashboard") return pathname === "/dashboard";
  return pathname === to || pathname.startsWith(`${to}/`);
};

const defaultItems: NavItem[] = [
  { key: "Home", to: "/dashboard", icon: <HomeOutlinedIcon /> },
  {
    key: "Users",
    to: "/dashboard/users-list",
    icon: <PeopleAltOutlinedIcon />,
  },
  { key: "Rooms", to: "/dashboard/rooms", icon: <BedIcon /> },
  { key: "Ads", to: "/dashboard/ads", icon: <CalendarMonthOutlinedIcon /> },
  { key: "Booking", to: "/dashboard/booking-list", icon: <BeenhereIcon /> },
  {
    key: "Facilities",
    to: "/dashboard/facilities",
    icon: <DashboardOutlinedIcon />,
  },

  {
    key: "Change password",
    to: "/ChangePassword",
    icon: <LockIcon />,
  },
  
  { key: "Logout", to: "/logout", icon: <LogoutIcon /> },

  
];

export default function AdminSidebar({
  open,
  onToggle,
  items = defaultItems,
}: {
  open: boolean;
  onToggle: () => void;
  items?: NavItem[];
},) {
  const location = useLocation();
let navigate = useNavigate()
const { logout } = useContext(AuthContext);

const handleLogout = () => {
  logout();                    
  navigate("/login", { replace: true });
};
  return (
    <>
      <CssBaseline />
      <Drawer  variant="permanent" open={open} > 
        <DrawerHeader>
          <IconButton
            onClick={onToggle}
            aria-label="toggle sidebar"
            sx={{
              width: 40,
              height: 40,
              border: "1px solid",
              borderColor: "divider",
              color: "white",
              borderRadius: 2,
              bgcolor: "action.hover",
              "&:hover": { bgcolor: "action.selected" },
            }}
          >
            {open ? <ArrowForwardIcon /> : <MenuIcon />}
          </IconButton>
          <Box />
        </DrawerHeader>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.25)" }} />

        <List sx={{ pt: 0 }}>
          {items.map((item) => {
            const active = isActive(item.to, location.pathname);
          const isLogout = item.to === "/logout";
            return (
              <ListItem key={item.key} disablePadding sx={{ display: "block" }}>
              <ListItemButton
          component={isLogout ? "button" : Link}  
          to={isLogout ? undefined : item.to}
          onClick={isLogout ? handleLogout : undefined}
          sx={{
            minHeight: 46,
            px: 2,
            justifyContent: open ? "initial" : "center",
            borderRadius: 2,
            mx: 1,
            my: 0.5,
            color: "#fff",
            ...(active && !isLogout && {           
              bgcolor: "rgba(255,255,255,0.22)",
              "&:hover": { bgcolor: "rgba(255,255,255,0.26)" },
            }),
            "&:hover": { bgcolor: "rgba(255,255,255,0.14)" },
          }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 2 : "auto",
                      justifyContent: "center",
                      color: "#fff",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.key}
                    primaryTypographyProps={{
                      noWrap: true,
                      sx: { color: "#fff" },
                    }}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Drawer>
    </>
  );
}
