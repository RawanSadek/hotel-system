import {
  AddressElement,
  CardElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

import { Box, Typography, Grid, Stack, Divider, Button } from "@mui/material";
import { useEffect, useState, type FormEvent } from "react";
import { AxiosError } from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import StepHeader from "./component/StepHeader";
import { axiosInstance, PAYMENT_URLS } from "../../../Services/END_POINTS";
import { toast } from "react-toastify";

export default function Payment() {
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const { state } = useLocation();
  const roomId = state?.roomId;
  const chechInDate = new Date(state?.checkIn).toISOString().split("T")[0];
  const checkOutDate = new Date(state?.checkOut).toISOString().split("T")[0];
  const totalPrice = state?.totalPrice;

  const [isPaying, setIsPaying] = useState(false);
  const [idBooking, setIdBooking] = useState(null);
  //apii calling

  const creatBooking = async () => {
    try {
      const response = await axiosInstance.post(PAYMENT_URLS.CREATE_BOOKING, {
        startDate: chechInDate,
        endDate: checkOutDate,
        room: roomId,
        totalPrice: totalPrice,
      });
      setIdBooking(response?.data?.data?.booking?._id);
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      toast.error(error?.response?.data?.message || "Something went wrong");
      console.log(error);
    }
  };

  const payBooking = async (tokenId: string) => {
    try {
      await axiosInstance.post(PAYMENT_URLS.PAY(idBooking!), {
        tokenId,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handlePayment = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    if (!roomId) {
      console.error("Missing roomId");
      return;
    }

    setIsPaying(true);
    try {
      const cardElement = elements.getElement(CardElement);
      // const addressElement = elements.getElement(AddressElement);
      if (!cardElement) {
        setIsPaying(false);
        return;
      }

      // const addressValue = await addressElement?.getValue();

      const { token, error } = await stripe.createToken(cardElement);
      if (error || !token) {
        setIsPaying(false);
        return;
      }

      await payBooking(token.id);
      navigate("/payment/success");

      console.log("Paid successfully");
    } catch (err) {
      console.error(err);
    } finally {
      setIsPaying(false);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    creatBooking();
  }, []);

  return (
    <>
      <Box sx={{ maxWidth: 800, mx: "auto", px: { xs: 2, md: 4 }, py: 4 }}>
        <StepHeader step={2} />
        {/* Title */}
        <Typography
          variant="h4"
          textAlign="center"
          sx={{ fontWeight: 800, color: "#1F2B6B" }}
        >
          Payment
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          textAlign="center"
          sx={{ mt: 1, mb: 5 }}
        >
          Kindly follow the instructions below
        </Typography>

        {/* Content */}
        <Grid container spacing={4}>
          {/* Left column: bank info */}
          <Grid item xs={12} md={6}>
            <Stack spacing={2.5}>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Transfer Pembayaran:
                </Typography>
              </Box>

              <Box>
                <Typography variant="body2" color="text.secondary">
                  Tax: <b>10%</b>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Sub total: <b>$480 USD</b>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total: <b>$580 USD</b>
                </Typography>
              </Box>

              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                sx={{ mt: 1 }}
              >
                <Box
                  sx={{
                    width: 44,
                    height: 28,
                    borderRadius: 1,
                    bgcolor: "grey.200",
                    display: "grid",
                    placeItems: "center",
                    fontWeight: 800,
                    letterSpacing: 1,
                    color: "text.primary",
                  }}
                >
                  BCA
                </Box>
                <Box>
                  <Typography variant="body2" fontWeight={600}>
                    Bank Central Asia
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    display="block"
                  >
                    2208 1996
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    display="block"
                  >
                    BuildWith Angga
                  </Typography>
                </Box>
              </Stack>
            </Stack>
          </Grid>

          {/* Divider */}
          <Grid item md={0} sx={{ display: { xs: "none", md: "block" } }}>
            <Divider orientation="vertical" flexItem />
          </Grid>

          {/* Right column: form (UI only) */}
          <Grid item xs={12} md={6}>
            {" "}
            <Box component="form" onSubmit={handlePayment}>
              <Stack spacing={4}>
                <div
                  style={{
                    padding: 12,
                    border: "1px solid #e0e0e0",
                    borderRadius: 8,
                  }}
                >
                  <CardElement />
                </div>
                <AddressElement
                  options={{
                    mode: "billing",
                    fields: { phone: "always" },
                    validation: { phone: { required: "always" } },
                  }}
                />

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={isPaying}
                  sx={{ mt: 1, borderRadius: 2, fontWeight: 700 }}
                >
                  {isPaying ? "Processing..." : "Pay"}
                </Button>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
