import { Box, Button, Stack, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export default function RoomsHeader() {

    const navigate = useNavigate();
    const isSubmitting = false;
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
           Rooms Table Details
          </Typography>
          <Typography color="#323C47" sx={{ marginTop: "10px" }}>
            You can check all details
          </Typography>
        </Stack>

        <Button
          type="submit"
          onClick={() => navigate('/dashboard/add-room')}
          variant="contained"
          fullWidth
          sx={{
            bgcolor: "#3252DF",
            padding: "15px",
            textTransform: "capitalize",
            width: "150px",
            cursor: isSubmitting ? "not-allowed" : "pointer",
          }}
        >
          Add New Room
          
        </Button>
      </Box>
    </>
  )
}
