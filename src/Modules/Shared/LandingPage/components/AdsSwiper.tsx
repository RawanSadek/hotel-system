import React, { useEffect } from "react";
import { Grid, Container, Typography } from "@mui/material";
import RoomCard from "./RoomCard";
import Slider from "react-slick";
import {
  ADS_URLS,
  axiosInstance,
  ROOMS_URLS,
} from "../../../../Services/END_POINTS";
import type { RoomsListInterface } from "../../../../Services/INTERFACE";

interface Ads {
  _id: string;
  isActive: boolean;
  room?: RoomsListInterface;
}

const AdsSwiper = () => {
  const settings = {
    infinite: true,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    centerMode: true,
    centerPadding: "60px",
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "40px",
        },
      },
      {
        breakpoint: 490,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "40px",
        },
      },
    ],
  };

  const [rooms, setRooms] = React.useState<RoomsListInterface[]>([]);
  const [ads, setAds] = React.useState<Ads[]>([]);

  const getRooms = async () => {
    try {
      const response = await axiosInstance.get(ROOMS_URLS.GET_ALL);
      setRooms(response.data.data.rooms);
    } catch (error) {
      console.log(error);
    }
  };

  const getAds = async () => {
    try {
      const response = await axiosInstance.get(ADS_URLS.GET_ALL);
      setAds(response.data.data.ads);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRooms();
    getAds();
  }, []);
  return (
    <>
      <Container
        maxWidth="lg"
        sx={{
          height: "auto",
          marginBlock: "0.625rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <Typography
          sx={{
            fontSize: "1.5rem",
            color: "var(--primary-color)",
            fontWeight: "bolder",
            display: "block",
          }}
          align="left"
          gutterBottom
        >
          Popular Choice
        </Typography>

        <Slider {...settings}>
          {ads?.filter((ad) => ad.isActive).length > 0 ? (
            ads
              .filter((ad) => ad.isActive)
              .map((ad) => (
                <Grid key={ad._id} sx={{ padding: 1, margin: "0 0.625rem" }}>
                  <RoomCard
                    room={ad.room ? ad.room : ({} as RoomsListInterface)}
                  />
                </Grid>
              ))
          ) : (
            <Typography>No active ads available.</Typography>
          )}
        </Slider>
      </Container>

      <Container
        sx={{
          paddingBlock: 1,
          overflow: "hidden",
          height: "auto",
          marginTop: 5,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography
          sx={{
            fontSize: "1.5rem",
            color: "var(--primary-color)",
            fontWeight: "bolder",
          }}
          align="left"
          gutterBottom
        >
          Hotels with large living room
        </Typography>

        <Slider {...settings}>
          {rooms?.map((room) => (
            <Grid
              component="div"
              key={room._id}
              sx={{ padding: 1, margin: "0 0.625rem" }}
            >
              <RoomCard room={room ? room : ({} as RoomsListInterface)} />
            </Grid>
          ))}
        </Slider>
      </Container>
    </>
  );
};

export default AdsSwiper;
