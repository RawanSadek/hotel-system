// AdminNavbar.tsx
import  { useContext, useState } from "react";
import { styled } from "@mui/material/styles";
import MuiAppBar, { type AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Badge from "@mui/material/Badge";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import { AuthContext } from "../../../Contexts/AuthContext/AuthContext";
import avatar from "../../../Images/nopp.png"
import { useTranslation } from "react-i18next";




interface StyledAppBarProps extends MuiAppBarProps {
  open?: boolean;
  drawerWidth?: number;
}
const StyledAppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open" && prop !== "drawerWidth",
})<StyledAppBarProps>(({ theme, open, drawerWidth = 260 }) => {
  const collapsedWidth = `calc(${theme.spacing(7)} + 1px)`;
  const left = open ? `${drawerWidth}px` : collapsedWidth;

  return {
    backgroundColor: "transparent",
    color: "inherit",
    boxShadow: "none",
    zIndex: theme.zIndex.drawer + 1,
    marginLeft: left,
    width: `calc(100% - ${left})`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.standard,
    }),
  };
});

export default function AdminNavbar({
  open = false,
  drawerWidth = 260,
 

}) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);
  let {loginData}= useContext(AuthContext)
    const { i18n } = useTranslation();
   const toggleLang = () => {
    i18n.changeLanguage(i18n.language === "ar" ? "en" : "ar");
  };
  return (
    <StyledAppBar position="fixed" open={open} drawerWidth={drawerWidth}>
      <Toolbar sx={{ py: 1.25, px: { xs: 1, sm: 2 } }}>
        <Paper
          elevation={0}
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "end",
            gap: 1.5,
            px: { xs: 1, sm: 2 },
            py: 1,
            borderRadius: 3,
            bgcolor: (t) => t.palette.action.hover,
          }}
        >

          <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
         

           <Avatar
              src={avatar || undefined}
              
              sx={{ width: 40, height: 40 }}
              imgProps={{
                onError: (e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = avatar;
                },
              }}
            >
            </Avatar>

            <Typography variant="body2" sx={{ fontWeight: 400, display: { xs: "none", sm: "block" } }}>
              {loginData?.userName || 'default user'}
            </Typography>

            <IconButton size="small" onClick={(e) => setAnchorEl(e.currentTarget)} aria-label="user-menu">
              <ExpandMoreIcon />
            </IconButton>

            <IconButton size="small" aria-label="notifications">
              <Badge variant="dot" color="error">
                <NotificationsNoneOutlinedIcon />
              </Badge>
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={menuOpen}
              onClose={() => setAnchorEl(null)}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <MenuItem onClick={() => setAnchorEl(null)}>Profile</MenuItem>
              <MenuItem
                // onClick={() => {
                //   setAnchorEl(null);
                //   onLogout?.();
                // }}
                sx={{ color: "error.main", fontWeight: 600 }}
              >
                Logout
              </MenuItem>
              <MenuItem onClick={toggleLang} >{i18n.language === "ar" ? "English" : "العربية"}</MenuItem>

            </Menu>
          </Box>
        </Paper>
      </Toolbar>
    </StyledAppBar>
  );
}
