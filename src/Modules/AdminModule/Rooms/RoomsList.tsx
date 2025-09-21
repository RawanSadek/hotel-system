import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useEffect, useState } from "react";
import { axiosInstance, ROOMS_URLS } from "../../../Services/END_POINTS";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import type { AxiosError } from "axios";
import type { RoomsListInterface } from "../../../Services/INTERFACES";
import noImg from "../../../Images/noImg.png";
import Box from "@mui/material/Box";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import loading from "../../../Images/loading.gif";
import TableFooter from "@mui/material/TableFooter";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default function RoomsList() {
  const { t } = useTranslation();
  const tableCols = [
    t("rooms_table_head.room_number"),
    t("rooms_table_head.image"),
    t("rooms_table_head.price"),
    t("rooms_table_head.discount"),
    t("rooms_table_head.capacity"),
    "",
  ];

  const [rooms, setrooms] = useState<RoomsListInterface[] | []>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getRooms = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance(ROOMS_URLS.GET_ALL);
      setrooms(response?.data?.data?.rooms);
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      toast.error(error.response?.data?.message || "Something went wrong");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getRooms();
  }, []);

  return (
    <>
      <TableContainer
        sx={{
          borderTopLeftRadius: "8px",
          borderTopRightRadius: "8px",
          marginTop: "30px",
        }}
      >
        <Table aria-label="rooms list">
          <TableHead sx={{ bgcolor: "#E2E5EB", borderRadius: "100px" }}>
            <TableRow>
              {tableCols.map((col) => (
                <TableCell align="center" key={col}>
                  {col}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          {isLoading && (
            <TableBody>
              <TableRow>
                <TableCell
                  colSpan={6}
                  align="center"
                  sx={{ border: "none", paddingTop: "50px" }}
                >
                  <img
                    src={loading}
                    alt="loading"
                    style={{ width: "5%", textAlign: "center" }}
                  ></img>
                </TableCell>
              </TableRow>
            </TableBody>
          )}
          {!isLoading && (
            <TableBody>
              {rooms.map((room: RoomsListInterface) => (
                <TableRow
                  key={room?._id}
                  sx={{
                    "&:nth-of-type(even)": {
                      backgroundColor: "#F8F9FB",
                    },
                    "&:nth-of-type(odd)": {
                      backgroundColor: "#ffffff",
                    },
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell
                    align="center"
                    sx={{ paddingY: "10px", border: "none" }}
                  >
                    {room.roomNumber}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      paddingY: "10px",
                      border: "none",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Box
                      width="60px"
                      height="60px"
                      borderRadius="10%"
                      overflow={"hidden"}
                    >
                      <img
                        src={room.images[0] ? room.images[0] : noImg}
                        alt="room image"
                        style={{ width: "100%", borderRadius: "10%" }}
                      />
                    </Box>
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ paddingY: "10px", border: "none" }}
                  >
                    {room.price}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ paddingY: "10px", border: "none" }}
                  >
                    {room.discount}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ paddingY: "10px", border: "none" }}
                  >
                    {room.capacity}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ paddingY: "10px", border: "none" }}
                  >
                    <MoreHorizIcon sx={{ cursor: "pointer" }} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
          <TableFooter>
            <TableRow>
              <TableCell colSpan={6}>
                <Stack spacing={2}>
                  <Pagination
                  
                    count={10}
                    renderItem={(item) => (
                      <PaginationItem sx={{marginX:'auto'}}
                        slots={{
                          previous: ArrowBackIcon,
                          next: ArrowForwardIcon,
                        }}
                        {...item}
                      />
                    )}
                  />
                </Stack>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
}
