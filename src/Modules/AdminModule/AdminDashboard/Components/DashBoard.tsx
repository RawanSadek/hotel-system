import { useEffect, useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import {
  axiosInstance,
  ROOMS_URLS,
  FACILITIES_URLS,
  ADS_URLS,
} from "../../../../Services/END_POINTS";
import BookingChart from "./BookingChart";
import UsersChart from "./UsersChart";
import DashboardCard from "./DashboardCrad";
import HomeIcon from "@mui/icons-material/Home";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import CampaignIcon from "@mui/icons-material/Campaign";

export default function DashBoard() {
  interface RoomList {
    totalCount: number;
  }

  interface FacilitiesList {
    totalCount: number;
  }

  interface AdsList {
    totalCount: number;
  }

  const [getRoomslist, setRoomsList] = useState<RoomList>();
  const [getRoomFacilitieslist, setRoomFacilitiesList] =
    useState<FacilitiesList>();
  const [getAdslist, setAdsList] = useState<AdsList>();

  const [isLoading, setIsLoading] = useState(true);

  const getRooms = async () => {
    const response = await axiosInstance.get(ROOMS_URLS.GET_ALL);
    setRoomsList(response.data.data);
  };

  const getFacilities = async () => {
    const response = await axiosInstance.get(FACILITIES_URLS.GET_ALL);
    setRoomFacilitiesList(response.data.data);
  };

  const getAds = async () => {
    const response = await axiosInstance.get(ADS_URLS.GET_ALL);
    setAdsList(response.data.data);
  };

  const totalRoomCount = getRoomslist?.totalCount || 0;
  const totalFacilities = getRoomFacilitieslist?.totalCount || 0;
  const totalAds = getAdslist?.totalCount || 0;

  useEffect(() => {
    setIsLoading(true);
    Promise.all([getRooms(), getFacilities(), getAds()])
      .then(() => setIsLoading(false))
      .catch(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 15,
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: `url("/NOt")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "black",
        textAlign: "left",
      }}
    >
      <Box component={"div"} sx={{ display: "flex", gap: 2 }}>
        <DashboardCard
          count={totalRoomCount}
          label="Rooms"
          iconColor="#203FC7"
          Icon={HomeIcon}
        />
        <DashboardCard
          count={totalFacilities}
          label="Facilities"
          iconColor="#203FC7"
          Icon={FitnessCenterIcon}
        />

        <DashboardCard
          count={totalAds}
          label="Ads"
          iconColor="#203FC7"
          Icon={CampaignIcon}
        />
      </Box>
      <Box component={"div"} sx={{ display: "flex", gap: 4 }}>
        <BookingChart />

        <UsersChart />
      </Box>
    </Box>
  );
}
