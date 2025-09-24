import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import type { changePassDataTypes } from "../../../Services/INTERFACE";
import { axiosInstance, USERS_URLS } from "./../../../Services/END_POINTS";
import { toast } from "react-toastify";
import type { AxiosError } from "axios";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import FilledInput from "@mui/material/FilledInput";
import {
  PASSWORD_VALIDATION,
  REQUIRED_VALIDATION,
} from "../../../Services/VALIDATIONS";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import loading from "../../../Images/loading.gif";
import { useTranslation } from "react-i18next";

export default function ChangePassword() {
  const { t } = useTranslation();
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<changePassDataTypes>();

  const onSubmit = async (data: changePassDataTypes) => {
    try {
      const response = await axiosInstance.post(
        USERS_URLS.CHANGE_PASSWORD,
        data
      );
      toast.success(response.data.message);
      navigate("/login");
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <Container>
      <title>Staycation | Change Password</title>
      <Box>
        <Typography variant="h4" component="h1" sx={{ fontWeight: "600" }}>
          {t("Change_Password")}
        </Typography>
        <Typography variant="body1" component="p" sx={{ marginY: "20px" }}>
          {t("change_password.Please_fill_the_below_data")}
        </Typography>
      </Box>
      <Box onSubmit={handleSubmit(onSubmit)} component="form">
        <FormControl fullWidth>
          <Typography color="#152C5B" sx={{ marginTop: "40px" }}>
            {t("Password")}
          </Typography>
          <FilledInput
            {...register("oldPassword", REQUIRED_VALIDATION("Old Password"))}
            type={showOldPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showOldPassword
                      ? "hide the password"
                      : "display the password"
                  }
                  onClick={() => setShowOldPassword(!showOldPassword)}
                  onMouseDown={(e) => e.preventDefault()}
                  onMouseUp={(e) => e.preventDefault()}
                  edge="end"
                >
                  {showOldPassword ? <VisibilityOff /> : <Visibility />}
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
          {errors.oldPassword && (
            <Typography variant="body1" sx={{ color: "red" }}>
              {errors.oldPassword.message as string}
            </Typography>
          )}
        </FormControl>

        <FormControl fullWidth>
          <Typography color="#152C5B" sx={{ marginTop: "30px" }}>
            {t("change_password.New_Password")}
          </Typography>
          <FilledInput
            {...register("newPassword", PASSWORD_VALIDATION)}
            type={showNewPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showNewPassword
                      ? "hide the password"
                      : "display the password"
                  }
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  onMouseDown={(e) => e.preventDefault()}
                  onMouseUp={(e) => e.preventDefault()}
                  edge="end"
                >
                  {showNewPassword ? <VisibilityOff /> : <Visibility />}
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
          {errors.newPassword && (
            <Typography variant="body1" sx={{ color: "red" }}>
              {errors.newPassword.message as string}
            </Typography>
          )}
        </FormControl>

        <FormControl fullWidth>
          <Typography color="#152C5B" sx={{ marginTop: "30px" }}>
            {t("change_password.Confirm_Password")}
          </Typography>
          <FilledInput
            {...register("confirmPassword", PASSWORD_VALIDATION)}
            type={showConfirmPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showConfirmPassword
                      ? "hide the password"
                      : "display the password"
                  }
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  onMouseDown={(e) => e.preventDefault()}
                  onMouseUp={(e) => e.preventDefault()}
                  edge="end"
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
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
          {errors.confirmPassword && (
            <Typography variant="body1" sx={{ color: "red" }}>
              {errors.confirmPassword.message as string}
            </Typography>
          )}
        </FormControl>

        <Button
          type="submit"
          disabled={isSubmitting}
          variant="contained"
          fullWidth
          sx={{
            bgcolor: "#3252DF",
            marginTop: "60px",
            marginBottom: "20px",
            padding: "15px",
            textTransform: "capitalize",
            fontSize: "17px",
          }}
        >
          {t("change_password.Save")}
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
