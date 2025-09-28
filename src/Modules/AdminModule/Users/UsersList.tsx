import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useEffect, useState } from "react";
import {
  axiosInstance,
  USERDashBoard_URLS,
} from "../../../Services/END_POINTS";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import type { AxiosError } from "axios";

import noImg from "../../../Images/noImg.png";
import Box from "@mui/material/Box";
import loading from "../../../Images/loading.gif";
import TableFooter from "@mui/material/TableFooter";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography, Avatar, Grid, MenuItem } from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import type { UserListInterface } from "../../../Services/INTERFACE";


export default function UserList() {
  const { t } = useTranslation();
  const tableCols = [
    t("User.Users_table_head.userName"),
    t("User.Users_table_head.image"),
    t("User.Users_table_head.email"),
    t("User.Users_table_head.role"),
    t("User.Users_table_head.phoneNumber"),
    "",
  ];

  const [users, setUsers] = useState<UserListInterface[] | []>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [activePage, setActivePage] = useState(1);

  const getUsers = async (pageNumber: number) => {
    try {
      setIsLoading(true);
      const response = await axiosInstance(USERDashBoard_URLS.GET_ALL, {
        params: {
          page: pageNumber,
          size: 10,
        },
      });
      setUsers(response?.data?.data?.users);
      setTotalPages(Math.ceil(response.data.data.totalCount / 10));
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      toast.error(error.response?.data?.message || "Something went wrong");
    }
    setIsLoading(false);
  };
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserListInterface | null>(null);

  const handleOpenDetails = (user: UserListInterface) => {
    setSelectedUser(user);
    setDetailsOpen(true);
  };
  const handleCloseDetails = () => {
    setDetailsOpen(false);
    setSelectedUser(null);
  };
function DetailRow({ label, value }: { label: string; value?: string }) {
  return (
    <Box sx={{ display: "flex", gap: 1.5, mb: 0.5 }}>
      <Typography sx={{ minWidth: 120, color: "text.secondary" }}>{label}:</Typography>
      <Typography sx={{ fontWeight: 600 }}>{value || "-"}</Typography>
    </Box>
  );
}
  useEffect(() => {
    getUsers(activePage);
  }, []);

  return (

    <>
       <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingTop: "20px",
            }}
          >
            <Stack>
              <Typography
                variant="h4"
                fontSize="24px"
                fontWeight="bold"
                color="#1F263E"
              >
                {t("User.User Table Details")}
              </Typography>
              <Typography color="#323C47" sx={{ marginTop: "10px" }}>
                {t("User.You can check all details")}
              </Typography>
            </Stack>
    
          </Box> 
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
                        src={user.profileImage ? user.profileImage : noImg}
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
                     <MenuItem >
                        <RemoveRedEyeIcon
                        onClick={() => handleOpenDetails(user)}
                          sx={{
                            color: "#203FC7",
                            fontSize: "22px",
                            marginX: "10px",
                          }}
                        />{" "}
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
       <Dialog open={detailsOpen} onClose={handleCloseDetails} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 700 }}>
          {t("User.Users_table_head.userName")}: {selectedUser?.userName || "-"}
        </DialogTitle>

        <DialogContent dividers sx={{ py: 3 }}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 4  }} display="flex" justifyContent="center" alignItems="start">
              <Avatar
                src={selectedUser?.profileImage || noImg}
                alt={selectedUser?.userName || "user"}
                sx={{ width: 96, height: 96 }}
                imgProps={{
                  onError: (e) => {
                    (e.currentTarget as HTMLImageElement).src = noImg;
                  },
                }}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 8 }} >
              <Stack spacing={1}>
                <DetailRow label={t("User.Users_table_head.userName")} value={selectedUser?.userName} />
<DetailRow label={t("User.Users_table_head.email")} value={selectedUser?.email} />
<DetailRow label={t("User.Users_table_head.role")} value={selectedUser?.role} />
 <DetailRow label={t("User.Users_table_head.phoneNumber")} value={selectedUser?.phoneNumber || "-"} /> 

              </Stack>
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseDetails} variant="contained">
            {t("close") || "Close"}
          </Button>
        </DialogActions>
      </Dialog>
    </>

  );
}
