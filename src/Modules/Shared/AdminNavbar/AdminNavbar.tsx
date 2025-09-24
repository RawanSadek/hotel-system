// AdminNavbar.tsx
import { useContext, useState } from "react";
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
import avatar from "../../../Images/nopp.png";
import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  Chip,
  Divider
 
} from "@mui/material";

import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import type { UserListInterface } from "../../../Services/INTERFACE";

type AdminNavbarProps = {
  open?: boolean;
  drawerWidth?: number;
};

interface StyledAppBarProps extends MuiAppBarProps {
  open?: boolean;
  drawerWidth?: number;
  isRTL?: boolean;
}

const StyledAppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open" && prop !== "drawerWidth" && prop !== "isRTL",
})<StyledAppBarProps>(({ theme, open, drawerWidth = 260, isRTL }) => {
  const collapsedWidth = `calc(${theme.spacing(7)} + 1px)`;
  const inset = open ? `${drawerWidth}px` : collapsedWidth; 
  const sideMarginProp = isRTL ? "marginRight" : "marginLeft";

  return {
    backgroundColor: "transparent",
    color: "inherit",
    boxShadow: "none",
    zIndex: theme.zIndex.drawer + 1,
    [sideMarginProp]: inset,              
    width: `calc(100% - ${inset})`,           
    direction: isRTL ? "rtl" : "ltr",          
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.standard,
    }),
  };
});


export default function AdminNavbar({
  open = false,
  drawerWidth = 260,
}: AdminNavbarProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);
  const { loginData } = useContext(AuthContext);
  const { i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";
 const [profileOpen, setProfileOpen] = useState(false);

  const toggleLang = () => {
    i18n.changeLanguage(i18n.language === "ar" ? "en" : "ar");
  };
 function DetailRow({

  label,
  value,
}: {
  icon?: React.ReactNode;
  label: string;
  value?: string;
}){
  return (
    <Box sx={{ display: "flex", gap: 1.5, mb: 0.5 }}>
      <Typography sx={{ minWidth: 120, color: "text.secondary" }}>{label}:</Typography>
      <Typography sx={{ fontWeight: 600 }}>{value || "-"}</Typography>
    </Box>
  );
}

  return (
 <>
    <StyledAppBar position="fixed" open={open} drawerWidth={drawerWidth} isRTL={isRTL}>
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
              />
            <Typography variant="body2" sx={{ fontWeight: 400, display: { xs: "none", sm: "block" } }}>
              {loginData.userName || "default user"}
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
              <MenuItem onClick={() => {
                    setAnchorEl(null);
                    setProfileOpen(true);
                  }}>    {i18n.language === "ar" ? "حسابى" : "Profile"}</MenuItem>
              <MenuItem onClick={toggleLang}>
                {i18n.language === "ar" ? "English" : "العربية"}
              </MenuItem>
            </Menu>
          </Box>
        </Paper>
      </Toolbar>
    </StyledAppBar>
    <Dialog
        open={profileOpen}
        onClose={() => setProfileOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { direction: isRTL ? "rtl" : "ltr", borderRadius: 3 } }}
      >
        <DialogTitle sx={{ fontWeight: 700, pb: 1.5 }}>
          {isRTL ? "الملف الشخصي" : "User Profile"}
        </DialogTitle>

        <DialogContent dividers sx={{ py: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4} display="flex" justifyContent="center" alignItems="start">
              <Avatar
                src={avatar || undefined}
                alt={loginData.userName}
                sx={{ width: 96, height: 96 }}
                imgProps={{
                  onError: (e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = avatar;
                  },
                }}
              />
            </Grid>

            <Grid item xs={12} sm={8}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
                  {loginData.userName}
                </Typography>
                {loginData.role !== "—" && (
                  <Chip
                    size="small"
                    color="primary"
                    icon={<ShieldOutlinedIcon sx={{ fontSize: 16 }} />}
                    label={loginData.role}
                    sx={{ fontWeight: 600 }}
                  />
                )}
              </Box>

              <Divider sx={{ my: 1.5 }} />

              <DetailRow
                label={isRTL ? "البريد الإلكتروني" : "Email"}
                value={loginData.email}
              />
              <DetailRow
                label="ID"
                value={loginData._id}
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions sx={{ px: 2.5, py: 1.5 }}>
          <Button onClick={() => setProfileOpen(false)} variant="contained">
            {isRTL ? "إغلاق" : "Close"}
          </Button>
        </DialogActions>
      </Dialog>
 
 
 </>
    
  );
  
}
