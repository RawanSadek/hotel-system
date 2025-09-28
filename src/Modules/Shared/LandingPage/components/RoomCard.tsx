import { Typography, IconButton, Box, Grid, Tooltip } from "@mui/material";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import smallphoto2 from "../../../../Images/img1.png";
import { Link as RouterLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../../Contexts/AuthContext/AuthContext";

interface RoomsCardProps {
  room: {
    _id: string;
    roomNumber: string;
    price: number;
    discount?: number;
    capacity: number;
    images?: string[];
    imgs?: string[];
  };
}

const RoomCard = ({ room }: RoomsCardProps) => {
  const { loginData } = useContext(AuthContext);
  return (
    <>
      {" "}
      <Grid size={{ xs: 12, sm: 6, md: 4 }} key={room?._id} sx={{ my: 2 }}>
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
            src={room?.images?.[0] || smallphoto2}
            alt={`Room ${room?.roomNumber}`}
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
              <Tooltip title="Favorite">
                <IconButton
                  onClick={(e) => {
                    e.preventDefault();
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
              (room?.price ?? 0) -
                ((room?.price ?? 0) * (room?.discount ?? 0)) / 100
            ).toFixed(1)}
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
              Room #{room?.roomNumber}
            </Typography>
            <Typography sx={{ fontSize: 12, opacity: 0.85 }}>
              Capacity: {room?.capacity} guests
            </Typography>
          </Box>
        </Box>
      </Grid>
    </>
  );
};

export default RoomCard;
