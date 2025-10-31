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
import { useState } from "react";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import type { IResetPasswordTypes } from "../../../Services/INTERFACES";
import {
  EMAIL_VALIDATION,
  PASSWORD_VALIDATION,
  REQUIRED_VALIDATION,
} from "../../../Services/VALIDATIONS";
import { axiosInstance, USERS_URLS } from "../../../Services/END_POINTS";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import type { AxiosError } from "axios";
import loading from "../../../Images/loading.gif";
export default function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const passedEmail = location.state?.email || "";
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<IResetPasswordTypes>({
    defaultValues: { email: passedEmail },
  });

  const onSubmit = async (data: IResetPasswordTypes) => {
    try {
      const response = await axiosInstance.post(
        USERS_URLS.RESET_PASSWORD,
        data
      );
      toast.success(
        response?.data?.message || `Your password has been reset successfully.`
      );
      navigate("/login");
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };
  return (
    <Container>
      <title>Staycation | Reset Password</title>
      <Box>
        <Typography variant="h4" component="h1" sx={{ fontWeight: "600" }}>
          Reset Password
        </Typography>
        <Typography variant="body1" component="p" sx={{ marginY: "30px" }}>
          If you already have an account register
          <Typography>
            You can{" "}
            <Link
              href="/login"
              underline="none"
              sx={{ color: "#eb5148", fontWeight: "bold" }}
            >
              Login here !
            </Link>
          </Typography>
        </Typography>
      </Box>
      <Box onSubmit={handleSubmit(onSubmit)} component="form">
        {/* Email */}
        <FormControl fullWidth>
          <Typography color="#152C5B">Email Address</Typography>
          <FilledInput
            {...register("email", EMAIL_VALIDATION)}
            id="email"
            placeholder="Please type here..."
            value={watch("email")}
            disabled
            readOnly
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
        </FormControl>
        {/* OTP*/}
        <FormControl fullWidth>
          <Typography color="#152C5B" sx={{ marginTop: "20px" }}>
            OTP
          </Typography>
          <FilledInput
            {...register("seed", REQUIRED_VALIDATION("OTP"))}
            type="text"
            id="otp"
            placeholder="Please type here..."
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
          {errors.seed && (
            <Typography variant="body1" sx={{ color: "red" }}>
              {errors.seed.message as string}
            </Typography>
          )}
        </FormControl>
        {/*Password */}
        <FormControl fullWidth>
          <Typography color="#152C5B" sx={{ marginTop: "20px" }}>
            Password
          </Typography>
          <FilledInput
            {...register("password", PASSWORD_VALIDATION)}
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
            placeholder="Please type here..."
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
        </FormControl>

        {/* Confirm Password */}
        <FormControl fullWidth>
          <Typography color="#152C5B" sx={{ marginTop: "20px" }}>
            Confirm Password
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
            id="confirm-password"
            placeholder="Please type here..."
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
            marginTop: "50px",
            padding: "15px",
            textTransform: "capitalize",
            fontSize: "17px",
            cursor: isSubmitting ? "not-allowed" : "pointer",
          }}
        >
          Reset{" "}
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
