import {
  Box,
  Breadcrumbs,
  Typography,
  Link as MuiLink,
  Grid,
  Stack,
  Paper,
  Divider,
  Button,
  Rating,
  TextField,
} from "@mui/material";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import nopic from "../../../Images/no-pic.png";

import HotelIcon from "@mui/icons-material/Hotel";
import WeekendIcon from "@mui/icons-material/Weekend";
import BathtubIcon from "@mui/icons-material/Bathtub";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import TvIcon from "@mui/icons-material/Tv";
import KitchenIcon from "@mui/icons-material/Kitchen";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import WifiIcon from "@mui/icons-material/Wifi";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/ar"; 

import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useTranslation } from "react-i18next";
import React, { useContext, useEffect, useState } from "react";
import { axiosInstance, ROOMPORTAL_URL } from "../../../Services/END_POINTS";
import type { RoomsListInterface } from "../../../Services/INTERFACE";
import type { AxiosError } from "axios";
import { toast } from "react-toastify";
// import loading from "../../../Images/loading.gif";
import { AuthContext } from "../../../Contexts/AuthContext/AuthContext";

export default function RoomDetails() {
  const { i18n } = useTranslation();
  const [checkIn, setCheckIn] = React.useState<Dayjs | null>(dayjs());
  const [checkOut, setCheckOut] = React.useState<Dayjs | null>(
    dayjs().add(2, "day")
  );
  const [rating, setRating] = React.useState<number | null>(4.5);
  const [rateMessage, setRateMessage] = React.useState("");
  const [comment, setComment] = React.useState("");

  const blue = "#203FC7";
  const HEADER_H = 56;
  const textFieldSX = {
    "& .MuiOutlinedInput-root": {
      borderRadius: 2,
      "& fieldset": { borderColor: blue },
      "&:hover fieldset": { borderColor: blue },
      "&.Mui-focused fieldset": {
        borderColor: blue,
        boxShadow: "0 0 0 2px rgba(32,63,199,.08)",
      },
    },
  } as const;

  const [roomDetails, setRoomDetails] = useState<RoomsListInterface | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);

  const getRoomDetails = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance(
        ROOMPORTAL_URL.GET_ROOM_DETAILS(id!)
      );
      setRoomDetails(response.data.data.room);
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      toast.error(error.response?.data?.message || "Something went wrong");
    }
    setIsLoading(false);
  };
  const { id } = useParams<{ id: string }>();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (id) getRoomDetails();
  }, [id]);
const { loginData } = useContext(AuthContext);
const navigate = useNavigate();

const isLoggedIn = Boolean(localStorage.getItem("token")) && !!loginData;

const handleContinue = () => {
  if (isLoggedIn) {
    navigate("/Payment"); 
  } else {
    toast.warning("You must login first");
  }
};
  return (
    <Box sx={{ px: { xs: 2, sm: 3 }, py: 3, maxWidth: 1200, mx: "auto" }}>
      {/* Breadcrumb */}
      <Breadcrumbs sx={{ mb: 2 }}>
        <MuiLink
          component={RouterLink}
          to="/"
          underline="none"
          color="text.secondary"
          sx={{ fontWeight: 500 }}
        >
          Home
        </MuiLink>
        <Typography color="primary" fontWeight={400}>
          Room Details
        </Typography>
      </Breadcrumbs>
     
      {/* Title + Location */}
      <Typography
        variant="h4"
        textAlign="center"
        fontWeight={800}
        sx={{ color: "#1F2B6B" , mb:5 }}
      >
        {roomDetails?.roomNumber
          ? ` ${roomDetails.roomNumber}`
          : ""}
      </Typography>
   

      {/* Gallery */}
    

      <Grid container spacing={2}>
        
        <Grid size={{ xs: 12, md: 8 }}>
          <Box
            sx={{
              height: { xs: 220, md: 420 },
              borderRadius: 3,
              overflow: "hidden",
              bgcolor: "grey.100",
            }}
          >
            <Box
              component="img"
              src={
                roomDetails?.images?.[0] ||
              
                nopic
              }
              alt={`Room ${roomDetails?.roomNumber ?? ""}`}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Grid container spacing={2} direction="column">
            <Grid>
              <Box
                sx={{
                  height: { xs: 180, md: 200 },
                  borderRadius: 3,
                  overflow: "hidden",
                  bgcolor: "grey.100",
                }}
              >
                <Box
                  component="img"
                  src={
                    roomDetails?.images?.[1] ||
                    nopic
                  
                  }
                  alt={`Room ${roomDetails?.roomNumber ?? ""}`}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </Box>
            </Grid>
            <Grid>
              <Box
                sx={{
                  height: { xs: 180, md: 200 },
                  borderRadius: 3,
                  overflow: "hidden",
                  bgcolor: "grey.100",
                }}
              >
                <Box
                  component="img"
                  src={
                    roomDetails?.images?.[2] ||
                    nopic
                  }
                  alt={`Room ${roomDetails?.roomNumber ?? ""}`}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

    
      <Grid container spacing={2} sx={{ mt: 3 }}>
        <Grid size={{ xs: 6, md: 8 }}>
          <Stack spacing={1}>
            <Typography
              variant="body1"
              lineHeight={1.6}
              color="text.secondary"
              sx={{ fontWeight: 500, fontSize: 15 }}
            >
              Minimal techno is a minimalist subgenre of techno music. It is
              characterized by a stripped-down aesthetic that exploits the use
              of repetition and understated development. Minimal techno is
              thought to have been originally developed in the early 1990s by
              Detroit-based producers Robert Hood and Daniel Bell.
            </Typography>
            <Typography
              variant="body1"
              lineHeight={1.6}
              color="text.secondary"
              sx={{ fontWeight: 500, fontSize: 15 }}
            >
              Such trends saw the demise of the soul-infused techno that
              typified the original Detroit sound. Robert Hood has noted that he
              and Daniel Bell both realized something was missing from techno in
              the post-rave era.
            </Typography>
            <Typography
              variant="body1"
              lineHeight={1.6}
              color="text.secondary"
              sx={{ fontWeight: 500, fontSize: 15 }}
            >
              Design is a plan or specification for the construction of an
              object or system or for the implementation of an activity or
              process, or the result of that plan or specification in the form
              of a prototype, product or process. The national agency for
              design: enabling Singapore to use design for economic growth and
              to make lives better.
            </Typography>
          </Stack>

          {/* Amenities */}
          <Grid container spacing={3} sx={{ mt: 3 }}>
            <Grid size={{ xs: 6, md: 3 }}>
              <Stack alignItems="center" spacing={1.2}>
                <HotelIcon sx={{ fontSize: 26, color: "text.secondary" }} />
                <Typography variant="body2" color="text.secondary">
                  <b>5</b> bedroom
                </Typography>
              </Stack>
            </Grid>
            <Grid size={{ xs: 6, sm: 3 }}>
              <Stack alignItems="center" spacing={1.2}>
                <WeekendIcon sx={{ fontSize: 26, color: "text.secondary" }} />
                <Typography variant="body2" color="text.secondary">
                  <b>1</b> living room
                </Typography>
              </Stack>
            </Grid>
            <Grid size={{ xs: 6, sm: 3 }}>
              <Stack alignItems="center" spacing={1.2}>
                <BathtubIcon sx={{ fontSize: 26, color: "text.secondary" }} />
                <Typography variant="body2" color="text.secondary">
                  <b>3</b> bathroom
                </Typography>
              </Stack>
            </Grid>
            <Grid size={{ xs: 6, sm: 3 }}>
              <Stack alignItems="center" spacing={1.2}>
                <RestaurantIcon
                  sx={{ fontSize: 26, color: "text.secondary" }}
                />
                <Typography variant="body2" color="text.secondary">
                  <b>1</b> dining room
                </Typography>
              </Stack>
            </Grid>

            <Grid size={{ xs: 6, sm: 3 }}>
              <Stack alignItems="center" spacing={1.2}>
                <WifiIcon sx={{ fontSize: 26, color: "text.secondary" }} />
                <Typography variant="body2" color="text.secondary">
                  <b>10</b> Mbps
                </Typography>
              </Stack>
            </Grid>
            <Grid size={{ xs: 6, sm: 3 }}>
              <Stack alignItems="center" spacing={1.2}>
                <AcUnitIcon sx={{ fontSize: 26, color: "text.secondary" }} />
                <Typography variant="body2" color="text.secondary">
                  <b>7</b> unit ready
                </Typography>
              </Stack>
            </Grid>
            <Grid size={{ xs: 6, sm: 3 }}>
              <Stack alignItems="center" spacing={1.2}>
                <KitchenIcon sx={{ fontSize: 26, color: "text.secondary" }} />
                <Typography variant="body2" color="text.secondary">
                  <b>2</b> refrigerator
                </Typography>
              </Stack>
            </Grid>
            <Grid size={{ xs: 6, sm: 3 }}>
              <Stack alignItems="center" spacing={1.2}>
                <TvIcon sx={{ fontSize: 26, color: "text.secondary" }} />
                <Typography variant="body2" color="text.secondary">
                  <b>4</b> television
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        </Grid>

        <Grid size={{ xs: 6, md: 4 }}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 3,
              border: "1px solid",
              borderColor: "grey.200",
              position: { md: "sticky" },
              top: { md: 88 },
            }}
          >
            <Stack spacing={2}>
              <Typography variant="subtitle1" fontWeight={700}>
                Start Booking
              </Typography>

              <Box sx={{ display: "flex", alignItems: "baseline", gap: 1 }}>
                <Typography
                  variant="h5"
                  fontWeight={700}
                  sx={{ color: "success.main" }}
                >
                  $280
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  per night
                </Typography>
              </Box>

              <Typography
                variant="body2"
                sx={{ color: "error.main", fontWeight: 600 }}
              >
                Discount 20% Off
              </Typography>

              <Divider sx={{ my: 1 }} />

              <Typography variant="subtitle2" fontWeight={700}>
                Pick a Date
              </Typography>
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale={i18n?.language === "ar" ? "ar" : "en"} // if you have i18n
              >
                <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                  <DatePicker
                    label="Check-in"
                    value={checkIn}
                    onChange={(v) => setCheckIn(v)}
                    minDate={dayjs()} // today or later
                    slotProps={{
                      textField: { size: "small", fullWidth: true },
                    }}
                  />
                  <DatePicker
                    label="Check-out"
                    value={checkOut}
                    onChange={(v) => setCheckOut(v)}
                    minDate={checkIn || dayjs()} // cannot be before check-in
                    slotProps={{
                      textField: { size: "small", fullWidth: true },
                    }}
                  />
                </Stack>
              </LocalizationProvider>

              <Typography variant="body2" color="text.disabled">
                You will pay $480 USD per 2 Person
              </Typography>

             <Button
  variant="contained"
  size="large"
  fullWidth
  onClick={handleContinue}
  sx={{
    mt: 1,
    borderRadius: 2,
    fontWeight: 700,
    textTransform: "none",
    backgroundImage: "linear-gradient(180deg, #3D6CFF 0%, #2647D4 100%)",
    boxShadow: "0 6px 16px rgba(61,108,255,0.35)",
    "&:hover": {
      backgroundImage: "linear-gradient(180deg, #325FF5 0%, #2040C8 100%)",
      boxShadow: "0 8px 18px rgba(61,108,255,0.45)",
    },
  }}
>
  Continue Book
</Button>

            </Stack>
          </Paper>
        </Grid>
        
      </Grid>

      {localStorage.getItem("token") && loginData ? (
      <Box sx={{ mt: 9 }}>
        <Grid container alignItems="stretch" spacing={4}>
          {/* Left: Rate */}
          <Grid size={{ xs: 12, md: 5.5 }}>
            <Stack spacing={2.5} height="100%">
              <Box
                sx={{
                  minHeight: HEADER_H,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  sx={{ mb: 0.5 }}
                >
                  Rate
                </Typography>
                <Rating
                  precision={0.5}
                  value={rating}
                  onChange={(_, v) => setRating(v)}
                  sx={{ color: "#f4c430" }}
                />
              </Box>

              <Box>
                <TextField
                  value={rateMessage}
                  onChange={(e) => setRateMessage(e.target.value)}
                  placeholder="Write your message..."
                  multiline
                  minRows={4}
                  fullWidth
                  sx={textFieldSX}
                />
              </Box>

              <Box>
                <Button
                  variant="contained"
                  onClick={() => console.log({ rating, rateMessage })}
                  sx={{
                    px: 5,
                    borderRadius: 1.2,
                    backgroundColor: blue,
                    boxShadow: "0 6px 16px rgba(32,63,199,.25)",
                    textTransform: "none",
                    fontWeight: 600,
                    "&:hover": { backgroundColor: "#1a33a9" },
                  }}
                >
                  Rate
                </Button>
              </Box>
            </Stack>
          </Grid>

          {/* Vertical divider */}
          <Grid
            size={{ xs: 12, md: 1 }}
            sx={{
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
            }}
          >
            <Divider orientation="vertical" flexItem />
          </Grid>

          {/* Right: Comment */}
          <Grid size={{ xs: 12, md: 5.5 }} sx={{ mb: 8 }}>
            <Stack spacing={2.5} height="100%">
              <Box
                sx={{
                  minHeight: HEADER_H,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography variant="subtitle2" color="text.secondary">
                  Add Your Comment
                </Typography>
              </Box>

              <TextField
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Type your comment here..."
                multiline
                minRows={4}
                fullWidth
                sx={textFieldSX}
              />

              <Box>
                <Button
                  variant="contained"
                  onClick={() => console.log({ comment })}
                  sx={{
                    px: 5,
                    borderRadius: 1.2,
                    backgroundColor: blue,
                    boxShadow: "0 6px 16px rgba(32,63,199,.25)",
                    textTransform: "none",
                    fontWeight: 600,
                    "&:hover": { backgroundColor: "#1a33a9" },
                  }}
                >
                  Send
                </Button>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Box>
         ) : ( "" )}
    </Box>
  );
}
