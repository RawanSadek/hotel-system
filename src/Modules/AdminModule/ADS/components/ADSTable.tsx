import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useEffect, useState } from "react";
import { axiosInstance, ADS_URLS } from "../../../../Services/END_POINTS";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import type { AxiosError } from "axios";
import type { IADS } from "../../../../Services/INTERFACES";
import loading from "./../../../../Images/loading.gif";
import TableFooter from "@mui/material/TableFooter";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteConfirmation from "./../../../Shared/DeleteConfirmation/DeleteConfirmation";
import EditAddPopUp from "./EditAddPopUp";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ADSHeader from "./ADSHeader";
const ADSTable = () => {
  const { t } = useTranslation();
  const tableCols = [
    t("ADS.ADS_table_head.room_number"),
    t("ADS.ADS_table_head.price"),
    t("ADS.ADS_table_head.discount"),
    t("ADS.ADS_table_head.capacity"),
    t("ADS.ADS_table_head.status"),
    t("ADS.ADS_table_head.date"),
    "",
  ];
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement | SVGSVGElement>(
    null
  );
  const [ADS, setADS] = useState<IADS[] | []>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedAds, setSelectedAds] = useState<string | null>(null);
  console.log(selectedAds);
  const [editAddPopUpOpen, setEditAddPopUpOpen] = useState(false);
  const handleMenuClick = (
    event: React.MouseEvent<HTMLElement | SVGSVGElement>,
    id: string
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedAds(id);
  };
  const handleOpenPopUp = () => {
    setEditAddPopUpOpen(true);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedAds(null);
  };
  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`${ADS_URLS.DELETE_AD(`${selectedAds}`)}`);
      toast.success(t("Ads deleted successfully"));
      getADS({ page: currentPage });
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      toast.error(error.response?.data?.message || t("Something went wrong"));
    }
    setDeleteDialogOpen(false);
    handleMenuClose();
  };
  const getADS = async ({ page }: { page: number }) => {
    try {
      setIsLoading(true);
      const response = await axiosInstance(ADS_URLS.GET_ALL(page));
      setADS(response?.data?.data?.ads);
      setTotalPages(Math.ceil(response?.data?.data?.totalCount / 10));
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      toast.error(error.response?.data?.message || "Something went wrong");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getADS({ page: currentPage });
  }, [currentPage]);
  return (
    <>
      <ADSHeader getAds={getADS} />
      <TableContainer
        sx={{
          borderTopLeftRadius: "8px",
          borderTopRightRadius: "8px",
          marginTop: "30px",
        }}
      >
        <Table aria-label="ADS list">
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
              {ADS?.map((Ads: IADS) => (
                <TableRow
                  key={Ads._id}
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
                    {Ads?.room?.roomNumber}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ paddingY: "10px", border: "none" }}
                  >
                    {Ads?.room?.price}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ paddingY: "10px", border: "none" }}
                  >
                    {Ads?.room?.discount}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ paddingY: "10px", border: "none" }}
                  >
                    {Ads?.room?.capacity}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ paddingY: "10px", border: "none" }}
                  >
                    {Ads?.isActive ? t("Active") : t("Inactive")}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ paddingY: "10px", border: "none" }}
                  >
                    {new Date(Ads?.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ paddingY: "10px", border: "none" }}
                  >
                    <MoreHorizIcon
                      onClick={(e) => handleMenuClick(e, Ads._id)}
                      sx={{ cursor: "pointer" }}
                    />
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
                    count={totalPages}
                    page={currentPage}
                    onChange={(_, newPage) => {
                      setCurrentPage(newPage);
                      getADS({ page: newPage });
                    }}
                    renderItem={(item) => (
                      <PaginationItem
                        sx={{ marginX: "auto" }}
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
      {/* Menu Popup */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem>
          <VisibilityIcon
            sx={{ mr: 1, color: "#203FC7", fontSize: "medium" }}
          />
          {t("View ")}
        </MenuItem>
        <MenuItem onClick={handleOpenPopUp}>
          <EditIcon sx={{ mr: 1, color: "#203FC7", fontSize: "medium" }} />
          {t("Edit")}
        </MenuItem>
        <MenuItem onClick={() => setDeleteDialogOpen(true)}>
          <DeleteIcon sx={{ mr: 1, color: "#203FC7", fontSize: "medium" }} />
          {t("Delete")}
        </MenuItem>
      </Menu>
      <EditAddPopUp
        open={editAddPopUpOpen}
        handleClose={() => setEditAddPopUpOpen(false)}
        refetchData={() => getADS({ page: currentPage })}
        ADSData={selectedAds}
      />
      {/* Delete Confirmation Dialog */}
      <DeleteConfirmation
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDelete}
      />
    </>
  );
};

export default ADSTable;
