import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  IconButton,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import type { AxiosError } from "axios";
import { axiosInstance, BOOKING_URLS } from "../../../Services/END_POINTS";
import type {
  BookingListInterface,
  BookingPopUpInterface,
} from "../../../Services/INTERFACE";
import { useEffect, useState } from "react";
import loading from "../../../Images/loading.gif";

export default function BookingData({
  open,
  handleClose,
  bookingId,
}: BookingPopUpInterface) {
  const [bookingdetails, setBookingDetails] =
    useState<BookingListInterface | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const getBookingDetails = async (id: string) => {
    try {
      setIsLoading(true);
      const response = await axiosInstance(
        BOOKING_URLS.GET_BOOking_DETAILS(id)
      );
      setBookingDetails(response?.data?.data?.booking);
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      toast.error(error.response?.data?.message || "Something went wrong");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (bookingId) getBookingDetails(bookingId);
  }, [bookingId]);

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ m: 0, p: 2 }}>
        Booking Details
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <form>
        <DialogContent dividers>
          {isLoading && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={loading}
                alt="loading"
                style={{ width: "5%", textAlign: "center" }}
              ></img>
            </Box>
          )}
          {!isLoading && (
            <Box>
              <TextField
                type="text"
                label="Room Number"
                variant="outlined"
                sx={{ marginY: "5px" }}
                fullWidth
                value={bookingdetails?.room?.roomNumber}
                disabled
              />

              <TextField
                type="text"
                label="Price"
                variant="outlined"
                sx={{ marginY: "5px" }}
                fullWidth
                value={bookingdetails?.totalPrice}
                disabled
              />

              <TextField
                type="text"
                label="Start date"
                variant="outlined"
                sx={{ marginY: "5px" }}
                fullWidth
                value={new Date(
                  bookingdetails?.startDate ?? ""
                ).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
                disabled
              />

              <TextField
                type="text"
                label="End Date"
                variant="outlined"
                sx={{ marginY: "5px" }}
                fullWidth
                value={new Date(
                  bookingdetails?.endDate ?? ""
                ).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
                disabled
              />

              <TextField
                type="text"
                label="User"
                variant="outlined"
                sx={{ marginY: "5px" }}
                fullWidth
                value={bookingdetails?.user?.userName}
                disabled
              />
            </Box>
          )}
        </DialogContent>

        <DialogActions sx={{ padding: "20px" }}>
          <Button onClick={handleClose} variant="contained">
            Close
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
