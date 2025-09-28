import {
  Breadcrumbs,
  Typography,
  Link as MuiLink,
  Grid,
  Box,
  Tooltip,
  IconButton,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import type { RoomsListInterface } from "../../../Services/INTERFACE";
import { axiosInstance, FAVOURITES_URLS } from "../../../Services/END_POINTS";
import type { AxiosError } from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../../../Contexts/AuthContext/AuthContext";
import loading from "../../../Images/loading.gif";
import smallphoto2 from "../../../Images/img1.png";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";

export default function Favourites() {
  const [favRooms, setFavRooms] = useState<RoomsListInterface[] | []>([]);
  const [isLoading, setIsLoading] = useState(false);
  const getAllFavs = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance(FAVOURITES_URLS.GET_ALL);
      setFavRooms(response?.data?.data?.favoriteRooms[0].rooms);
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      toast.error(error.response?.data?.message || "Something went wrong");
      console.log(error);
    }
    setIsLoading(false);
  };

  const removeFromFavs = async (roomId: string) => {
    try {
      const response = await axiosInstance.delete(
        FAVOURITES_URLS.REMOVE_FAVOURITE(roomId),
        { data: { roomId } }
      );
      getAllFavs();
      toast.success(response.data.message);
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      toast.error(error.response?.data?.message || "Something went wrong");
      console.log(error);
    }
  };

  useEffect(() => {
    getAllFavs();
  }, []);
  const { loginData } = useContext(AuthContext);

  return (
    <>
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
          Favourites
        </Typography>
      </Breadcrumbs>

      <Typography
        variant="h6"
        textAlign="start"
        fontWeight={500}
        sx={{
          color: "#152C5B",
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "25px",
          marginBottom: "40px",
        }}
      >
        Your Favourites
      </Typography>

      <Grid container spacing={2}>
        {isLoading && (
          <Grid
            size={{ xs: 12 }}
            sx={{
              position: "fixed",
              top: "0",
              left: "0",
              height: "100%",
              zIndex: "9999",
              bgcolor: "#dbdbdbb0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={loading}
              alt="loading"
              style={{ width: "5%", textAlign: "center" }}
            ></img>
          </Grid>
        )}
        {!isLoading && favRooms.length === 0 && (
          <Grid size={{ xs: 12 }}>
            <Typography color="text.secondary" sx={{ textAlign: "center" }}>
              No favourites found.
            </Typography>
          </Grid>
        )}
        {favRooms.map((room) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={room._id} sx={{ my: 2 }}>
            <Box
              sx={{
                position: "relative",
                height: 180,
                borderRadius: 3,
                overflow: "hidden",
                boxShadow: "0 2px 10px rgba(10,20,50,.08)",
                transition: "transform .25s, box-shadow .25s",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 8px 26px rgba(10,20,50,.18)",
                  "& img": { transform: "scale(1.04)" },
                  "&:hover .hover-actions": {
                    opacity: 1,
                    transform: "translateY(0)",
                    pointerEvents: "auto",
                  },
                },
              }}
            >
              <Box
                component="img"
                src={room.images?.[0] || room.imgs?.[0] || smallphoto2}
                alt={`Room ${room.roomNumber}`}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = smallphoto2;
                }}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform .4s",
                }}
              />
              <Box
                className="hover-actions"
                sx={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1.5,
                  opacity: 0,
                  transform: "translateY(6px)",
                  transition: "opacity .25s, transform .25s",
                  zIndex: 3,
                  pointerEvents: "none",
                }}
              >
                <Tooltip title="View">
                  <IconButton
                    component={RouterLink}
                    to={`/room-details/${room?._id}`}
                    size="small"
                    sx={{
                      pointerEvents: "auto",
                      bgcolor: "rgba(255,255,255,.95)",
                      "&:hover": { bgcolor: "rgba(255,255,255,1)" },
                      boxShadow: "0 4px 14px rgba(0,0,0,.18)",
                    }}
                  >
                    <RemoveRedEyeOutlinedIcon />
                  </IconButton>
                </Tooltip>

                {localStorage.getItem("token") && loginData ? (
                  <Tooltip title="Remove from favorites">
                    <IconButton
                      onClick={() => removeFromFavs(room?._id)}
                      size="small"
                      sx={{
                        pointerEvents: "auto",
                        bgcolor: "rgba(255,255,255,.95)",
                        "&:hover": { bgcolor: "rgba(255,255,255,1)" },
                        boxShadow: "0 4px 14px rgba(0,0,0,.18)",
                      }}
                    >
                      <FavoriteIcon />
                    </IconButton>
                  </Tooltip>
                ) : (
                  ""
                )}
              </Box>

              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  px: 2,
                  py: 1,
                  borderBottomLeftRadius: 15,
                  fontSize: 12,
                  fontWeight: 800,
                  color: "#fff",
                  background: "linear-gradient(180deg,#FF72B2 0%,#FF5A94 100%)",
                  boxShadow: "0 6px 16px rgba(255,90,148,.35)",
                }}
              >
                $
                {Math.max(
                  0,
                  (room.price ?? 0) -
                    ((room.price ?? 0) * (room.discount ?? 0)) / 100
                )}
                <Typography
                  component="span"
                  sx={{ ml: 0.5, opacity: 0.9, fontWeight: 500 }}
                >
                  per night
                </Typography>
              </Box>

              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(180deg, rgba(0,0,0,0) 55%, rgba(0,0,0,.55) 85%, rgba(0,0,0,.75) 100%)",
                  pointerEvents: "none",
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  left: 16,
                  right: 16,
                  bottom: 14,
                  color: "#fff",
                }}
              >
                <Typography sx={{ fontWeight: 800, lineHeight: 1, mb: 0.5 }}>
                  Room #{room.roomNumber}
                </Typography>
                <Typography sx={{ fontSize: 12, opacity: 0.85 }}>
                  Capacity: {room.capacity} guests
                </Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
