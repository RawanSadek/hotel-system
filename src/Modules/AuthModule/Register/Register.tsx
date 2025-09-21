import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import type { RegisterTypes } from "../../../Services/INTERFACES";
import { axiosInstance, USERS_URLS } from "../../../Services/END_POINTS";
import { toast } from "react-toastify";
import type { AxiosError } from "axios";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import FilledInput from "@mui/material/FilledInput";
import {
  EMAIL_VALIDATION,
  PASSWORD_VALIDATION,
  PHONE_VALIDATION,
  REQUIRED_VALIDATION,
} from "../../../Services/VALIDATIONS";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import loading from "../../../Images/loading.gif";
import google from "../../../Images/google.webp";
import facebook from "../../../Images/facebook.png";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import UploadIcon from "@mui/icons-material/Upload";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useTranslation } from "react-i18next";

export default function ChangePassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<RegisterTypes>();

  const appendToFormData = (data: RegisterTypes) => {
    const formData = new FormData();
    formData.append("userName", data.userName);
    formData.append("email", data.email);
    formData.append("role", data.role);
    formData.append("country", data.country);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("password", data.password);
    formData.append("confirmPassword", data.confirmPassword);
    if (selectedFile) {
      formData.append("profileImage", selectedFile);
    }
    return formData;
  };

  const onSubmit = async (data: RegisterTypes) => {
    const userData = appendToFormData(data);
    try {
      const response = await axiosInstance.post(USERS_URLS.REGISTER, userData);
      toast.success(response.data.message);
      navigate("/login");
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  // let imgRef = useRef();

  return (
    <Container>
      <title>Staycation | Sign up</title>
      <Box>
        <Typography variant="h4" component="h1" sx={{ fontWeight: "600" }}>
          {t("register.signup")}
        </Typography>
        <Typography variant="body1" component="p" sx={{ marginY: "20px" }}>
          {t("register.alreadyAccount")} <br />
          {t("register.youCanSignin")} {""}
          <Link
            href="/login"
            underline="none"
            sx={{ color: "#EB5148", fontWeight: "bold" }}
          >
            {t("register.loginHere")}
          </Link>
        </Typography>
      </Box>
      <Box
        onSubmit={handleSubmit(onSubmit)}
        component="form"
        marginTop={"40px"}
      >
        {/* Profile Image */}
        <FormControl fullWidth sx={{ marginBottom: "30px" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography color="#152C5B" sx={{ marginTop: "20px" }}>
              {t("register.uploadImg")}
            </Typography>
            <label htmlFor="profileImage" style={{ cursor: "pointer" }}>
              {!preview ? (
                <UploadIcon
                  color="primary"
                  sx={{ marginTop: "10px", cursor: "pointer" }}
                />
              ) : (
                // Preview
                <Box mt={2}>
                  <img
                    src={preview}
                    alt="preview"
                    style={{
                      width: "80px",
                      height: "80px",
                      borderRadius: "50%",
                    }}
                  />
                </Box>
              )}
            </label>

            <input
              type="file"
              accept="image/*"
              id="profileImage"
              style={{ display: "none" }}
              {...register(
                "profileImage",
                REQUIRED_VALIDATION("Profile Image")
              )}
              onChange={(e) => {
                const file = e.target.files?.[0] || null;
                setSelectedFile(file);
                if (file) {
                  setPreview(URL.createObjectURL(file));
                }
              }}
            />
            {errors.profileImage && (
              <Typography sx={{ color: "red" }}>
                {errors.profileImage.message as string}
              </Typography>
            )}
          </Box>
        </FormControl>

        {/* Username */}
        <FormControl fullWidth>
          <Typography color="#152C5B">{t("Username")}</Typography>
          <FilledInput
            {...register("userName", REQUIRED_VALIDATION("Username"))}
            id="userName"
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
          {errors.userName && (
            <Typography sx={{ color: "red" }}>
              {errors.userName.message as string}
            </Typography>
          )}
        </FormControl>

        {/* Phone number - Country */}
        <Grid container spacing={3} sx={{ marginTop: "20px" }}>
          <Grid size={{ xs: 12, md: 6 }}>
            {/* Phone number */}
            <FormControl fullWidth>
              <Typography color="#152C5B">{t("Phone_Number")}</Typography>
              <FilledInput
                {...register("phoneNumber", PHONE_VALIDATION)}
                id="phoneNumber"
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
              {errors.phoneNumber && (
                <Typography sx={{ color: "red" }}>
                  {errors.phoneNumber.message as string}
                </Typography>
              )}
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            {/* Country */}
            <FormControl fullWidth>
              <Typography color="#152C5B">{t("Country")}</Typography>
              <FilledInput
                {...register("country", REQUIRED_VALIDATION("Country"))}
                id="country"
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
              {errors.country && (
                <Typography sx={{ color: "red" }}>
                  {errors.country.message as string}
                </Typography>
              )}
            </FormControl>
          </Grid>
        </Grid>

        {/* Email */}
        <FormControl fullWidth>
          <Typography color="#152C5B" sx={{ marginTop: "20px" }}>
            {t("Email_Address")}
          </Typography>
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

        {/* Role */}
        <FormControl fullWidth variant="outlined">
          <Typography color="#152C5B" sx={{ marginTop: "20px" }}>
            {t("Role")}
          </Typography>
          <Controller
            name="role"
            control={control} // <-- comes from useForm()
            rules={{ required: "Role is required" }}
            render={() => (
              <Select
                {...register("role", REQUIRED_VALIDATION("Role"))}
                defaultValue=""
                displayEmpty
                renderValue={(selected) => {
                  if (selected === "") {
                    return (
                      <span style={{ color: "#b4b4b4ff" }}>
                        Select a Role...
                      </span>
                    );
                  }
                  return selected;
                }}
                id="role"
                sx={{
                  bgcolor: "#F5F6F8",
                  borderRadius: "4px",
                  marginTop: "10px",
                  "& .MuiInputBase-input": {
                    py: "10px",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "none", //removes the border
                  },
                }}
              >
                <MenuItem value={"admin"}>Admin</MenuItem>
                <MenuItem value={"user"}>User</MenuItem>
              </Select>
            )}
          />

          {errors.role && (
            <Typography sx={{ color: "red" }}>
              {errors.role.message as string}
            </Typography>
          )}
        </FormControl>

        {/* Password */}
        <FormControl fullWidth>
          <Typography color="#152C5B" sx={{ marginTop: "20px" }}>
            {t("Password")}
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
        </FormControl>

        {/* Confirm Password */}
        <FormControl fullWidth>
          <Typography color="#152C5B" sx={{ marginTop: "20px" }}>
            {t("Confirm_Password")}
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
            id="confirmPassword"
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
          {t("register.signup")}
          <img
            hidden={!isSubmitting}
            src={loading}
            alt="loading"
            className="loading-icon"
          />
        </Button>

        <Grid
          container
          spacing={3}
          justifyContent="center"
          alignItems="center"
          marginBottom={"20px"}
        >
          <Grid size={2} textAlign={"center"} sx={{ cursor: "pointer" }}>
            <img src={google} alt="google" width={"50%"} />
          </Grid>
          <Grid size={2} textAlign={"center"} sx={{ cursor: "pointer" }}>
            <img src={facebook} alt="facebook" width={"50%"} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
