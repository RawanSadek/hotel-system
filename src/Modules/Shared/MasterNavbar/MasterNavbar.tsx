import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Avatar,
  Menu,
  MenuItem,
  Badge,
  Drawer,
  List,
  ListItemText,
  ListItemButton,
  useMediaQuery,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState, useContext } from "react";
import logoMain from "./../../../Images/logo.png";
import { Link as RouterLink } from "react-router-dom";
import { Link as MUILink } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LogoutIcon from "@mui/icons-material/Logout";
import { FavoriteBorder } from "@mui/icons-material";
import GTranslateIcon from "@mui/icons-material/GTranslate";
import { AuthContext } from "../../../Contexts/AuthContext/AuthContext";
export default function MasterNavbar() {
  const isMobile = useMediaQuery("(max-width: 900px)");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const { loginData, logout, userProfile } = useContext(AuthContext);

  const userName = userProfile?.userName || "Guest";
  const userAvatar = userProfile?.profileImage || "/images/default-avatar.jpg";

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    window.location.reload(); // 🔄 Force a full refresh of the app
  };

  return (
    <Box
      px={{ xs: 2, sm: 4, md: 8, lg: 20 }}
      sx={{ borderBottom: "1px solid #E5E5E5" }}
    >
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {/* Logo */}
          <Box
            component={RouterLink}
            to="/"
            sx={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
            }}
          >
            <Box
              component="img"
              src={logoMain}
              alt="Staycation Logo"
              sx={{ height: 30 }}
            />
          </Box>

          {/* Desktop Nav Items */}
          {!isMobile && (
            <Box display="flex" alignItems="center" gap={3}>
              {/* Home */}
              <Typography
                component={RouterLink}
                to="/"
                sx={{
                  textDecoration: "none",
                  color: "#3252DF",
                  fontWeight: 500,
                }}
              >
                Home
              </Typography>

              {/* Exlpore */}

              <Typography
                component={RouterLink}
                to="/explore"
                sx={{
                  textDecoration: "none",
                  color: "#152C5B",
                  fontWeight: 500,
                }}
              >
                Explore
              </Typography>

              {/* Reviews */}

              {localStorage.getItem("token") && loginData ? (
                <Typography
                  component={RouterLink}
                  to=""
                  sx={{
                    textDecoration: "none",
                    color: "#152C5B",
                    fontWeight: 500,
                  }}
                >
                  Reviews
                </Typography>
              ) : (
                <Button
                  variant="contained"
                  component={RouterLink}
                  to="/register"
                  sx={{
                    bgcolor: "#3252DF",
                    borderRadius: "6px",
                    textTransform: "none",
                    fontWeight: "100",
                    px: "25px",
                  }}
                >
                  Regsiter
                </Button>
              )}

              {/* Favorites */}

              {localStorage.getItem("token") && loginData ? (
                <Badge color="error">
                  <Typography variant="button">
                    {" "}
                    <MUILink
                      underline="none"
                      sx={{
                        textDecoration: "none",
                        color: "#152C5B",
                        fontWeight: 500,
                      }}
                      component={RouterLink}
                      to="/favourits"
                    >
                      <FavoriteBorder />
                    </MUILink>{" "}
                  </Typography>
                </Badge>
              ) : (
                <Button
                  variant="contained"
                  component={RouterLink}
                  to="/login"
                  sx={{
                    bgcolor: "#3252DF",
                    borderRadius: "6px",
                    textTransform: "none",
                    fontWeight: "50",
                    px: "25px",
                  }}
                >
                  Login Now
                </Button>
              )}

              {/* Avatar with Dropdown */}
              {localStorage.getItem("token") && loginData ? (
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <IconButton onClick={handleMenuOpen}>
                    <Avatar src={userAvatar} alt={userName} />
                  </IconButton>

                  <Menu
                    anchorEl={menuAnchorEl}
                    open={Boolean(menuAnchorEl)}
                    onClose={handleMenuClose}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    PaperProps={{
                      sx: {
                        py: 1,
                        minWidth: 200,
                        "& .MuiMenuItem-root": {
                          gap: 1,
                          color: "#152C5B",
                          fontWeight: 300,
                        },
                      },
                    }}
                  >
                    <MenuItem disabled>
                      <PersonIcon fontSize="small" />
                      Welcome: {userName}
                    </MenuItem>

                    <MenuItem
                      component={RouterLink}
                      to="/favourits"
                      onClick={handleMenuClose}
                    >
                      <FavoriteIcon fontSize="small" />
                      Favorites
                    </MenuItem>

                    <MenuItem onClick={handleMenuClose}>
                      <GTranslateIcon fontSize="small" />
                      Translate
                    </MenuItem>
                    <MenuItem
                      onClick={handleLogout}
                      sx={{ borderTop: "1px solid #E5E5E5" }}
                    >
                      <LogoutIcon fontSize="small" />
                      Logout
                    </MenuItem>
                  </Menu>
                </Box>
              ) : (
                ""
              )}
            </Box>
          )}

          {/* Mobile Menu Icon */}
          {isMobile && (
            <IconButton onClick={() => setDrawerOpen(true)}>
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box width={250} p={2}>
          <List>
            <ListItemButton
              component={RouterLink}
              to="/"
              onClick={() => setDrawerOpen(false)}
            >
              <ListItemText primary="Home" />
            </ListItemButton>

            <ListItemButton
              component={RouterLink}
              to="/rooms"
              onClick={() => setDrawerOpen(false)}
            >
              <ListItemText primary="Explore" />
            </ListItemButton>

            <ListItemButton
              component={RouterLink}
              to=""
              onClick={() => setDrawerOpen(false)}
            >
              <ListItemText primary="Reviews" />
            </ListItemButton>

            <ListItemButton
              component={RouterLink}
              to="/favourits"
              onClick={() => setDrawerOpen(false)}
            >
              <ListItemText primary="Favorites" />
              <Badge color="error" sx={{ ml: 1 }} />
            </ListItemButton>

            {/* Avatar + Logout */}
            <Box display="flex" alignItems="center" gap={1} mt={2} ml={1}>
              <Avatar
                src={userAvatar}
                alt={userName}
                sx={{ width: 40, height: 40 }}
              />
              <Box>
                <Typography variant="body2">Welcome: {userName}</Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "blue", cursor: "pointer" }}
                  onClick={() => {
                    setDrawerOpen(false);
                    handleLogout();
                  }}
                >
                  Logout
                </Typography>
              </Box>
            </Box>
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}
