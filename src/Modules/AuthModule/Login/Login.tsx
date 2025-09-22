import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import FilledInput from "@mui/material/FilledInput";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Link from "@mui/material/Link";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Typography from "@mui/material/Typography";
import { useContext, useState } from "react";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import type { loginDataTypes } from "../../../Services/INTERFACES";
import {
  EMAIL_VALIDATION,
  REQUIRED_VALIDATION,
} from "../../../Services/VALIDATIONS";
import { axiosInstance, USERS_URLS } from "../../../Services/END_POINTS";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import type { AxiosError } from "axios";
import loading from "../../../Images/loading.gif";
import { AuthContext } from "../../../Contexts/AuthContext/AuthContext";
import { useTranslation } from "react-i18next";

export default function Login() {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const { getLoginData } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<loginDataTypes>();

  const onSubmit = async (data: loginDataTypes) => {
    try {
      const response = await axiosInstance.post(USERS_URLS.LOGIN, data);
      localStorage.setItem(
        "token",
        response.data.data.token.replace(/^Bearer\s+/, "")
      );
      localStorage.setItem("userData", JSON.stringify(response.data.data.user));
      getLoginData();
      toast.success(`Welcome to StayCation!`);
      if (response.data.data.user.role === "admin") {
        navigate("/dashboard");
        return;
      } else if (response.data.data.user.role === "user") {
        navigate("/landing-page");
      }
      if (response.data.data.user.role == "admin") navigate("/dashboard");
      else navigate("/landing-page");
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <Container>
      <title>Staycation | Sign in</title>
      <Box>
        <Typography variant="h4" component="h1" sx={{ fontWeight: "600" }}>
          {t("login.signIn")}
        </Typography>
        <Typography variant="body1" component="p" sx={{ marginY: "30px" }}>
          {t("login.noAccount")} <br />
          {t("login.registerPrompt")}
          <Link
            href="/register"
            underline="none"
            sx={{ color: "#152C5B", fontWeight: "bold" }}
          >
            {t("login.registerPrompt")}
          </Link>
        </Typography>
      </Box>
      <Box onSubmit={handleSubmit(onSubmit)} component="form">
        <FormControl fullWidth>
          {/* <InputLabel htmlFor="email">Email address</InputLabel> */}
          <Typography color="#152C5B">{t("Email_Address")}</Typography>
          <FilledInput
            {...register("email", EMAIL_VALIDATION)}
            id="email"
            placeholder={t("Type_Here")}
            disableUnderline
            sx={{
              bgcolor: "#F5F6F8",
              borderRadius: "4px",
              marginTop: "10px",
              "& .MuiInputBase-input": {
                py: "10px",
                "::placeholder": {
                  color: "#b4b4b4ff",
                },
              },
            }}
          />
          {errors.email && (
            <Typography sx={{ color: "red" }}>
              {errors.email.message as string}
            </Typography>
          )}
        </FormControl>
        <FormControl fullWidth>
          {/* <InputLabel htmlFor="email">Email address</InputLabel> */}
          <Typography color="#152C5B" sx={{ marginTop: "50px" }}>
            {t("Password")}
          </Typography>
          <FilledInput
            {...register("password", REQUIRED_VALIDATION("Password"))}
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword ? "hide the password" : "display the password"
                  }
                  onClick={() => setShowPassword(!showPassword)}
                  onMouseDown={(e) => e.preventDefault()}
                  onMouseUp={(e) => e.preventDefault()}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            id="password"
            placeholder={t("Type_Here")}
            disableUnderline
            sx={{
              bgcolor: "#F5F6F8",
              borderRadius: "4px",
              marginTop: "10px",
              "& .MuiInputBase-input": {
                py: "10px",
                "::placeholder": {
                  color: "#b4b4b4ff",
                },
              },
            }}
          />
          {errors.password && (
            <Typography variant="body1" sx={{ color: "red" }}>
              {errors.password.message as string}
            </Typography>
          )}
          <Link
            href="/forgot-password"
            underline="none"
            sx={{
              color: "#4D4D4D",
              fontFamily: "sans-serif",
              marginTop: "15px",
              fontSize: "13px",
              textAlign: "end",
            }}
          >
            {t("Forgot_Password")}
          </Link>
        </FormControl>
        <Button
          type="submit"
          disabled={isSubmitting}
          variant="contained"
          fullWidth
          sx={{
            bgcolor: "#3252DF",
            marginTop: "100px",
            padding: "15px",
            textTransform: "capitalize",
            fontSize: "17px",
          }}
        >
          {t("login.signIn")}
          <img
            hidden={!isSubmitting}
            src={loading}
            alt="loading"
            className="loading-icon"
          />
        </Button>
      </Box>
    </Container>
  );
}
