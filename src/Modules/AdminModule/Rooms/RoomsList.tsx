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
import type { RoomsListInterface } from "../../../Services/INTERFACE";
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
import { Button, Menu, MenuItem } from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import RoomsHeader from "./RoomsHeader";
import { useNavigate } from "react-router-dom";
import DeleteConfirmation from "../../Shared/DeleteConfirmation/DeleteConfirmation";

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

  const navigate = useNavigate();

  const [rooms, setrooms] = useState<RoomsListInterface[] | []>([]);
  const [isLoading, setIsLoading] = useState(false);
  // const [totalRooms, setTotalRooms] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [activePage, setActivePage] = useState(1);

  const getRooms = async (pageNumber: number) => {
    try {
      setIsLoading(true);
      const response = await axiosInstance(ROOMS_URLS.GET_ALL, {
        params: {
          page: pageNumber,
          size: 10,
        },
      });
      setrooms(response?.data?.data?.rooms);
      // setTotalRooms(response.data.data.totalCount);
      setTotalPages(Math.ceil(response.data.data.totalCount / 10));
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      toast.error(error.response?.data?.message || "Something went wrong");
    }
    setIsLoading(false);
  };

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const handleDelete = async () => {
      try {
        const response = await axiosInstance.delete(
          ROOMS_URLS.DELETE_ROOM(`${clickedRoom.roomId}`)
        );
        toast.success(response.data.message ||"Room deleted successfully");
        getRooms(activePage);
      } catch (err) {
        const error = err as AxiosError<{ message: string }>;
        toast.error(error.response?.data?.message || t("Something went wrong"));
      }
      setDeleteDialogOpen(false);
      handleClose();
    };

  const [clickedRoom, setClickedRoom] = useState<{ anchorEl: HTMLElement | null, roomId: string | null }>({
  anchorEl: null,
  roomId: null,
});
  const handleClick = (event: React.MouseEvent<HTMLElement>, roomId: string) => {
  setClickedRoom({ anchorEl: event.currentTarget, roomId });
};
  const handleClose = () => {
  setClickedRoom({ anchorEl: null, roomId: null });
};

const open = Boolean(clickedRoom.anchorEl);

  useEffect(() => {
    getRooms(activePage);
  }, []);

  return (
    <>
      <RoomsHeader />

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
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
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
                    <Button
                      id="basic-button"
                      aria-controls={open ? "basic-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      onClick={(e) => handleClick(e, room._id)}
                      sx={{
                        color: "black",
                        bgcolor: "transparent",
                        "&:hover": {
                          bgcolor: "#edededff",
                        },
                      }}
                    >
                      <MoreHorizIcon />
                    </Button>
                    <Menu
                      className="actionMenu"
                      id="basic-menu"
                      anchorEl={clickedRoom.anchorEl}
                      open={open}
                      onClose={handleClose}
                      slotProps={{
                        list: {
                          "aria-labelledby": "basic-button",
                        },
                      }}
                      sx={{}}
                    >
                      <MenuItem onClick={()=>navigate(`/dashboard/view-room/${clickedRoom.roomId}`)}>
                        <RemoveRedEyeIcon
                          sx={{
                            color: "#203FC7",
                            fontSize: "22px",
                            marginX: "10px",
                            marginY: "5px",
                          }}
                        />
                        {t("list_actions.view")}
                      </MenuItem>
                      <MenuItem onClick={()=>navigate(`/dashboard/edit-room/${clickedRoom.roomId}`)}>
                        <BorderColorIcon
                          sx={{
                            color: "#203FC7",
                            fontSize: "22px",
                            marginX: "10px",
                          }}
                        />
                        {t("list_actions.edit")}
                      </MenuItem>
                      <MenuItem onClick={() => setDeleteDialogOpen(true)}>
                        <DeleteOutlineIcon
                          sx={{
                            color: "#203FC7",
                            fontSize: "22px",
                            marginX: "10px",
                            marginY: "5px",
                          }}
                        />
                        {t("list_actions.delete")}
                      </MenuItem>
                    </Menu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
          <TableFooter>
            <TableRow>
              <TableCell colSpan={6}>
                <Stack spacing={2}>
                  <Box display="flex" justifyContent="flex-end">
                    <Pagination
                      count={totalPages}
                      onChange={(event, value) => {
                        setActivePage(value);
                        getRooms(value);
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
        </Table>
      </TableContainer>


      {/* Delete Confirmation Dialog */}
            <DeleteConfirmation
              open={deleteDialogOpen}
              onClose={() => setDeleteDialogOpen(false)}
              onConfirm={handleDelete}
            />
    </>
  );
}
