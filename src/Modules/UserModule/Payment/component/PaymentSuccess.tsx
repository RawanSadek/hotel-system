import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import StepHeader from "./StepHeader";
import suceesimg from "../../../../Images/complete.png"
import { useEffect } from "react";

export default function PaymentSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  },[]);

  return (
    <Box sx={{ maxWidth: 720, mx: "auto", px: 2, py: 6, textAlign: "center" }}>
      <StepHeader step={2} />

      <Typography variant="h4" sx={{ fontWeight: 800, color: "#1F2B6B", mb: 3 }}>
        Yay! Completed
      </Typography>

      <Box
        sx={{
          width: 360, height: 330, mx: "auto", mb: 2,
          border: "1px solid", borderColor: "grey.300", borderRadius: 2,
          display: "grid", placeItems: "center",
        }}
      >
       <Box component="img" src={suceesimg} alt="success" sx={{ maxWidth: "100%" }} /> 
      </Box>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
        We will inform you via email once the transaction has been accepted.
      </Typography>

      <Button variant="contained" size="large" onClick={() => navigate("/")} sx={{ minWidth: 220 }}>
        Back to Home
      </Button>
    </Box>
  );
}