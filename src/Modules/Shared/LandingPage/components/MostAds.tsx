import { Box, Container, Grid, Typography } from "@mui/material";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import FavCard from "./FavCard";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import loading from "../../../../Images/loading.gif";
import {
  axiosInstance,
  FAVOURITES_URLS,
  USER_ROOMS_URLS,
} from "../../../../Services/END_POINTS";
interface Room {
  _id: string;
  roomNumber: string;
  price: number;
  images: string[];
}
const MostAds = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const callRooms = async () => {
      try {
        const response = await axiosInstance.get(USER_ROOMS_URLS.GET_ALL);
        if (response.data.success) {
          setRooms(response.data.data.rooms);
        } else {
          console.error("Failed to fetch rooms:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    callRooms();
  }, []);

  const isLoggedIn = () => {
    return localStorage.getItem("token") !== null;
  };

  const handleImageClick = async (roomId: string) => {
    if (!isLoggedIn()) {
      toast.error(
        "You are not logged in. Please login first to continue your Add Favorite room step."
      );
      return;
    }

    try {
      setIsLoading(true);
      const response = await axiosInstance.post(FAVOURITES_URLS.ADD_FAVOURITE, { roomId });
      toast.success(response.data.message)
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      toast.error(error.response?.data?.message || "Something went wrong");
      console.log(error);
    }
    setIsLoading(false);
  };

  const handleViewClick = (id: string) => {
    navigate(`/room-details/${id}`);
  };
  return (
    <>
      {" "}
      {isLoading && (
          <Grid
            size={{ xs: 12 }}
            sx={{
              position: "fixed",
              top: "0",
              left: "0",
              height: "100%",
              zIndex: "9999",
              bgcolor: "#e5e5e573",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width:'100vw'
            }}
          >
            <img
              src={loading}
              alt="loading"
              style={{ width: "5%", textAlign: "center" }}
            ></img>
          </Grid>
        )}

      <Container sx={{ marginBottom: 5 }}>
        <Typography
          sx={{
            fontSize: "24px",
            color: "#152C5B",
            fontWeight: "bolder",
            marginBottom: 2,
          }}
          align="left"
          gutterBottom
        >
          Most Popular Ads
        </Typography>

        <Grid container spacing={3}>
          <Box component={"div"} sx={{ flex: 6, height: "71vh" }}>
            {rooms?.length > 0 && (
              <FavCard
                room={rooms[0]}
                onFavorite={()=>handleImageClick(rooms[0]._id)}
                onView={handleViewClick}
                isLarge={true}
              />
            )}
          </Box>

          <Box component={"div"} sx={{ flex: 8 }}>
            <Grid container spacing={2}>
              {rooms.slice(1, 5).map((room) => (
                <Grid item xs={6} md={4} key={room._id}>
                  <FavCard
                    room={room}
                    onFavorite={()=>handleImageClick(room._id)}
                    onView={handleViewClick}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>
      </Container>
    </>
  );
};

export default MostAds;
