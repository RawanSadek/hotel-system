import { Outlet, useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import logo from "../../../Images/logo.png";
import { useTranslation } from "react-i18next";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";

export default function AuthLayout() {
  const { pathname } = useLocation();
  const { i18n } = useTranslation();
  const toggleLang = () => {
    i18n.changeLanguage(i18n.language === "ar" ? "en" : "ar");
  };
  const { t } = useTranslation();
  return (
    <Box sx={{ flexGrow: 1, minHeight: "100vh" }}>
      <Grid container sx={{ minHeight: "100vh" }}>
        <Grid
          size={{ xs: 12, md: 6 }}
          sx={{
            display: "flex",
            flexDirection: "column",
            marginBottom: { xs: "30px", md: "0px" },
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Link href="/landing-page">
              <img
                src={logo}
                alt="logo"
                style={{ alignSelf: "flex-start", margin: "30px" }}
              />
            </Link>
            <Box
              sx={{
                mt: 3,
                mb: 2,
              }}
            >
              <Button variant="outlined" onClick={toggleLang}>
                {i18n.language === "ar" ? "English" : "العربية"}
              </Button>
            </Box>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Container maxWidth="sm" sx={{ bgcolor: "white" }}>
              <Outlet />
            </Container>
          </Box>
        </Grid>
        <Grid
          size={{ xs: 12, md: 6 }}
          sx={{
            padding: "10px",
            display: "flex",
            flexDirection: "column",
            minHeight: "100%",
          }}
        >
          {pathname == "/login" && (
            <Box className="login-bg auth-bg">
              <h2> {t("Sign_in_to_Roamhome")}</h2>
            </Box>
          )}

          {pathname == "/change-password" && (
            <Box className="change-bg auth-bg">
              <h2>{t("Change_Password")}</h2>
            </Box>
          )}

          {pathname == "/register" && (
            <Box className="register-bg auth-bg">
              <h2>{t("Sign_up_to_Roamhome")}</h2>
            </Box>
          )}

          {pathname == "/forgot-password" && (
            <Box className="forgot-bg auth-bg">
              <h2>{t("Forgot_Password")}</h2>
            </Box>
          )}

          {pathname == "/reset-password" && (
            <Box className="reset-bg auth-bg">
              <h2>{t("Reset_Password")}</h2>
            </Box>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
