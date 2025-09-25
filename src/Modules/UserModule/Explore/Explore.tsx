import {
  Box,
  Breadcrumbs,
  Typography,
  Link as MuiLink,
  Grid,
  TableFooter,
  TableRow,
  TableCell,
  Stack,
  Pagination,
  PaginationItem,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import type { RoomsListInterface } from "../../../Services/INTERFACE";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { axiosInstance, ROOMPORTAL_URL } from "../../../Services/END_POINTS";
import type { AxiosError } from "axios";
import loading from "../../../Images/loading.gif";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import smallphoto2 from "../../../Images/img1.png";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import { AuthContext } from "../../../Contexts/AuthContext/AuthContext";
export default function Explore() {
  const [rooms, setRooms] = useState<RoomsListInterface[] | []>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [activePage, setActivePage] = useState(1);
  const [clickedRoom, setClickedRoom] = useState<{
    anchorEl: HTMLElement | null;
    roomId: string | null;
  }>({
    anchorEl: null,
    roomId: null,
  });
  const getAllRooms = async (pageNumber: number) => {
    try {
      setIsLoading(true);
      const response = await axiosInstance(ROOMPORTAL_URL.GET_ALL, {
        params: {
          page: pageNumber,
          size: 12,
        },
      });
      setRooms(response?.data?.data?.rooms);
      setTotalPages(Math.ceil(response.data.data.totalCount / 12));
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      toast.error(error.response?.data?.message || "Something went wrong");
      console.log(error);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    getAllRooms(activePage);
  }, []);
  const { loginData } = useContext(AuthContext);
  return (
    <>
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
            Explore
          </Typography>
        </Breadcrumbs>

        <Typography
          variant="h6"
          textAlign="start"
          fontWeight={500}
          sx={{ color: "#152C5B" }}
        >
          All Rooms
        </Typography>
        <Grid container spacing={2}>
          {isLoading && (
            <Grid size={{ xs: 12 }}>
              <img
                src={loading}
                alt="loading"
                style={{ width: "5%", textAlign: "center" }}
              ></img>
            </Grid>
          )}
          {!isLoading && rooms.length === 0 && (
            <Grid size={{ xs: 12 }}>
              <Typography color="text.secondary">No rooms found.</Typography>
            </Grid>
          )}
          {rooms.map((room) => (
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
                      to={`/room-details/${room._id}`}
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
                  <Tooltip title="Favorite">
                    <IconButton
                      onClick={(e) => {
                        e.preventDefault(); /* حطي لوجيك الفيفوريت هنا */
                      }}
                      size="small"
                      sx={{
                        pointerEvents: "auto",
                        bgcolor: "rgba(255,255,255,.95)",
                        "&:hover": { bgcolor: "rgba(255,255,255,1)" },
                        boxShadow: "0 4px 14px rgba(0,0,0,.18)",
                      }}
                    >
                      <FavoriteBorderOutlinedIcon />
                    </IconButton>
                  </Tooltip>  ) : ( "" )}
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
                    background:
                      "linear-gradient(180deg,#FF72B2 0%,#FF5A94 100%)",
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
        <TableFooter
          sx={{ display: "flex", justifyContent: "center", width: "100%" }}
        >
          <TableRow>
            <TableCell
              colSpan={6}
              align="center"
              sx={{ borderBottom: "none", py: 5, textAlign: "center" }}
            >
              <Stack spacing={2}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                  }}
                >
                  <Pagination
                    count={totalPages}
                    onChange={(event, value) => {
                      setActivePage(value);
                      getAllRooms(value);
                    }}
                    renderItem={(item) => (
                      <PaginationItem
                        slots={{
                          previous: ArrowBackIcon,
                          next: ArrowForwardIcon,
                        }}
                        {...item}
                      />
                    )}
                  />
                </Box>
              </Stack>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Box>
    </>
  );
}
