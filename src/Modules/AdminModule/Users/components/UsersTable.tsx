// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import { useEffect, useState } from "react";
// import {
//   axiosInstance,
//   FACILITIES_URLS,
// } from "../../../../Services/END_POINTS";
// import { useTranslation } from "react-i18next";
// import { toast } from "react-toastify";
// import type { AxiosError } from "axios";
// import type { IFacilities } from "../../../../Services/INTERFACES";
// import loading from "./../../../../Images/loading.gif";
// import TableFooter from "@mui/material/TableFooter";
// import Stack from "@mui/material/Stack";
// import Pagination from "@mui/material/Pagination";
// import PaginationItem from "@mui/material/PaginationItem";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
// import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
// import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import DeleteConfirmation from "../../../Shared/DeleteConfirmation/DeleteConfirmation";

// import { Box, Typography } from "@mui/material";
// export default function UsersTable() {
//   const { t } = useTranslation();
//   const tableCols = [
//     t("facilities.facilities_table_head.name"),
//     t("facilities.facilities_table_head.createdAt"),
//     t("facilities.facilities_table_head.createdBy"),
//     "",
//   ];
//   const [anchorEl, setAnchorEl] = useState<null | HTMLElement | SVGSVGElement>(
//     null
//   );
//   const [facilities, setFacilities] = useState<IFacilities[] | []>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
//   const [selectedFacility, setSelectedFacility] = useState<IFacilities | null>(
//     null
//   );
//   const handleMenuClick = (
//     event: React.MouseEvent<HTMLElement | SVGSVGElement>,
//     id: string
//   ) => {
//     setAnchorEl(event.currentTarget);
//     setSelectedFacility(id);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//     setSelectedFacility(null);
//   };
//   const handleDelete = async () => {
//     try {
//       await axiosInstance.delete(
//         FACILITIES_URLS.DELETE_FACILITY(`${selectedFacility}`)
//       );
//       toast.success(t("Facility deleted successfully"));
//       getFacilities({ page: currentPage });
//     } catch (err) {
//       const error = err as AxiosError<{ message: string }>;
//       toast.error(error.response?.data?.message || t("Something went wrong"));
//     }
//     setDeleteDialogOpen(false);
//     handleMenuClose();
//   };
//   const getFacilities = async ({ page }: { page: number }) => {
//     try {
//       setIsLoading(true);
//       const response = await axiosInstance(FACILITIES_URLS.GET_ALL(page));
//       setFacilities(response?.data?.data?.facilities);
//       setTotalPages(Math.ceil(response?.data?.data?.totalCount / 10));
//     } catch (err) {
//       const error = err as AxiosError<{ message: string }>;
//       toast.error(error.response?.data?.message || "Something went wrong");
//     }
//     setIsLoading(false);
//   };

//   useEffect(() => {
//     getFacilities({ page: currentPage });
//   }, [currentPage]);

//   return (
//     <>
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           paddingTop: "20px",
//         }}
//       >
//         <Stack>
//           <Typography
//             variant="h4"
//             fontSize="24px"
//             fontWeight="bold"
//             color="#1F263E"
//           >
//             {t("Users Table Details")}
//           </Typography>
//           <Typography color="#323C47" sx={{ marginTop: "10px" }}>
//             {t("facilities.check_all_details")}
//           </Typography>
//         </Stack>
//       </Box>
//       <TableContainer
//         sx={{
//           borderTopLeftRadius: "8px",
//           borderTopRightRadius: "8px",
//           marginTop: "30px",
//         }}
//       >
//         <Table aria-label="Facilities list">
//           <TableHead sx={{ bgcolor: "#E2E5EB", borderRadius: "100px" }}>
//             <TableRow>
//               {tableCols.map((col) => (
//                 <TableCell align="center" key={col}>
//                   {col}
//                 </TableCell>
//               ))}
//             </TableRow>
//           </TableHead>

//           {isLoading && (
//             <TableBody>
//               <TableRow>
//                 <TableCell
//                   colSpan={6}
//                   align="center"
//                   sx={{ border: "none", paddingTop: "50px" }}
//                 >
//                   <img
//                     src={loading}
//                     alt="loading"
//                     style={{ width: "5%", textAlign: "center" }}
//                   ></img>
//                 </TableCell>
//               </TableRow>
//             </TableBody>
//           )}
//           {!isLoading && (
//             <TableBody>
//               {facilities.map((facility: IFacilities) => (
//                 <TableRow
//                   key={facility._id}
//                   sx={{
//                     "&:nth-of-type(even)": {
//                       backgroundColor: "#F8F9FB",
//                     },
//                     "&:nth-of-type(odd)": {
//                       backgroundColor: "#ffffff",
//                     },
//                     "&:last-child td, &:last-child th": { border: 0 },
//                   }}
//                 >
//                   <TableCell
//                     align="center"
//                     sx={{ paddingY: "10px", border: "none" }}
//                   >
//                     {facility?.name}
//                   </TableCell>
//                   <TableCell
//                     align="center"
//                     sx={{ paddingY: "10px", border: "none" }}
//                   >
//                     {new Date(facility?.createdAt).toLocaleDateString("en-US", {
//                       year: "numeric",
//                       month: "short",
//                       day: "numeric",
//                     })}
//                   </TableCell>
//                   <TableCell
//                     align="center"
//                     sx={{ paddingY: "10px", border: "none" }}
//                   >
//                     {facility?.createdBy?.userName}
//                   </TableCell>
//                   <TableCell
//                     align="center"
//                     sx={{ paddingY: "10px", border: "none" }}
//                   >
//                     <MoreHorizIcon
//                       onClick={(e) => handleMenuClick(e, facility._id)}
//                       sx={{ cursor: "pointer" }}
//                     />
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           )}
//           <TableFooter>
//             <TableRow>
//               <TableCell colSpan={6}>
//                 <Stack spacing={2}>
//                   <Pagination
//                     count={totalPages}
//                     page={currentPage}
//                     onChange={(_, newPage) => {
//                       setCurrentPage(newPage);
//                       getFacilities({ page: newPage });
//                     }}
//                     renderItem={(item) => (
//                       <PaginationItem
//                         sx={{ marginX: "auto" }}
//                         slots={{
//                           previous: ArrowBackIcon,
//                           next: ArrowForwardIcon,
//                         }}
//                         {...item}
//                       />
//                     )}
//                   />
//                 </Stack>
//               </TableCell>
//             </TableRow>
//           </TableFooter>
//         </Table>
//       </TableContainer>
//       {/* Menu Popup */}
//       <Menu
//         anchorEl={anchorEl}
//         open={Boolean(anchorEl)}
//         onClose={handleMenuClose}
//         anchorOrigin={{
//           vertical: "bottom",
//           horizontal: "right",
//         }}
//         transformOrigin={{
//           vertical: "top",
//           horizontal: "right",
//         }}
//       >
//         <MenuItem>
//           <EditIcon sx={{ mr: 1, color: "#203FC7", fontSize: "medium" }} />
//           {t("Edit")}
//         </MenuItem>
//         <MenuItem onClick={() => setDeleteDialogOpen(true)}>
//           <DeleteIcon sx={{ mr: 1, color: "#203FC7", fontSize: "medium" }} />
//           {t("Delete")}
//         </MenuItem>
//       </Menu>

//       {/* Delete Confirmation Dialog */}
//       <DeleteConfirmation
//         open={deleteDialogOpen}
//         onClose={() => setDeleteDialogOpen(false)}
//         onConfirm={handleDelete}
//       />
//     </>
//   );
// }
