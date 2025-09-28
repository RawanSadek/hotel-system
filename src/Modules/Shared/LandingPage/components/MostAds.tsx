import { Box, Container, Grid, Typography } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import FavCard from "./FavCard";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance, ROOMS_URLS } from "../../../../Services/END_POINTS";
interface Room {
  _id: string;
  roomNumber: string;
  price: number;
  images: string[];
}
const MostAds = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const callRooms = async () => {
      try {
        const response = await axiosInstance.get(ROOMS_URLS.GET_ALL);
        console.log("section");
        console.log(response.data.data.rooms);
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

  const handleImageClick = async (id: string) => {
    if (!isLoggedIn()) {
      toast.error(
        "You are not logged in. Please login first to continue your Add Favorite room step."
      );
      return;
    }

    try {
      const res = await axios.post(
        `https://upskilling-egypt.com:3000/api/v0/portal/favorite-rooms`,
        {
          roomId: id,
        },
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      );
      toast.info("response", res.data);
      navigate("/your-favorite");
      toast.success("Great choice! The room has been added to your favorites ");
    } catch (error) {
      console.error("Error sending favorite room:", error);
    }
  };

  const handleViewClick = (id: string) => {
    navigate(`/room-details/${id}`);
  };
  return (
    <>
      {" "}
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
          <Box component={"div"} sx={{ flex: 4, height: "100%" }}>
            {rooms?.length > 0 && (
              <FavCard
                room={rooms[0]}
                onFavorite={handleImageClick}
                onView={handleViewClick}
                isLarge={true}
              />
            )}
          </Box>

          <Box component={"div"} sx={{ flex: 2 }}>
            <Grid container spacing={2}>
              {rooms.slice(1, 5).map((room) => (
                <Grid item xs={6} key={room._id}>
                  <FavCard
                    room={room}
                    onFavorite={handleImageClick}
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
