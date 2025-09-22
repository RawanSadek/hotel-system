import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useEffect, useState } from "react";
import { axiosInstance, USERDashBoard_URLS } from "../../../Services/END_POINTS";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import type { AxiosError } from "axios";
import type { UserListInterface } from "../../../Services/INTERFACES";
import noImg from "../../../Images/noImg.png";
import Box from "@mui/material/Box";
import loading from "../../../Images/loading.gif";
import TableFooter from "@mui/material/TableFooter";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {  MenuItem } from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";


export default function UserList() {
  const { t } = useTranslation();
  const tableCols = [
    t("Users_table_head.userName"),
    t("Users_table_head.image"),
    t("Users_table_head.email"),
    t("Users_table_head.role"),
    t("Users_table_head.phoneNumber"),
    "",
  ];

  const [users, setUsers] = useState<UserListInterface[] | []>([]);
  const [isLoading, setIsLoading] = useState(false);
  // const [totalRooms, setTotalRooms] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [activePage, setActivePage] = useState(1);

  const getUsers = async (pageNumber:number) => {
    try {
      setIsLoading(true);
      const response = await axiosInstance(USERDashBoard_URLS.GET_ALL, {
        params: {
          page: pageNumber,
          size: 10,
        },
      });
      setUsers(response?.data?.data?.users);
      // setTotalRooms(response.data.data.totalCount);
      setTotalPages(Math.ceil(response.data.data.totalCount / 10));
      console.log(response.data);
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      toast.error(error.response?.data?.message || "Something went wrong");
    }
    setIsLoading(false);
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    getUsers(activePage);
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
              {users.map((user: UserListInterface) => (
                <TableRow
                  key={user?._id}
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
                    {user.userName}
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
                        src={user.profileImage? user.profileImage : noImg}
                        alt="user image"
                        style={{ width: "100%", borderRadius: "10%" }}
                      />
                    </Box>
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ paddingY: "10px", border: "none" }}
                  >
                    {user.email}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ paddingY: "10px", border: "none" }}
                  >
                    {user.role}
                  </TableCell>
               <TableCell
                    align="center"
                    sx={{ paddingY: "10px", border: "none" }}
                  >
                    {user.phoneNumber}
                  </TableCell> 
                  <TableCell
                    align="center"
                    sx={{ paddingY: "10px", border: "none" }}
                  >
                     <MenuItem onClick={handleClose}>
                        <RemoveRedEyeIcon
                          sx={{
                            color: "#203FC7",
                            fontSize: "22px",
                            marginX: "10px",
                          }}
                        />{" "}
                        {/* {t("list_actions.view")} */}
                      </MenuItem>
                  
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
                        getUsers(value); 
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
    </>
  );
}

