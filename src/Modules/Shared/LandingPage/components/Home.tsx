import {
  Box,
  Button,
  FormHelperText,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Add from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import photo from "../../../../Images/landing/home.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { type DateRange } from "@mui/x-date-pickers-pro";
const Home = () => {
  const [value, setValue] = useState<DateRange<Dayjs>>([null, null]);
  const [capacityValue, setCapacityValue] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  return (
    <Grid
      container
      spacing={2}
      justifyContent={"space-between"}
      alignItems={"center"}
      my={4}
    >
      {/* left box */}
      <Grid size={{ xs: 12, md: 5 }}>
        {/* text */}
        <Box component={"header"}>
          <Typography
            component={"p"}
            color="#152C5B"
            fontWeight={800}
            variant="h3"
          >
            Forget Busy Work, Start Next Vacation
          </Typography>

          <Typography component={"p"} color="#B0B0B0">
            We provide what you need to enjoy your holiday with family. Time to
            make another memorable moments.
          </Typography>
        </Box>

        {/* get explore data  capacity and date */}
        <Typography component={"h2"} variant="h5" fontWeight={500} mt={5}>
          {" "}
          Start Booking
        </Typography>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DateRangePicker"]}>
            <DateRangePicker
              format="YYYY-MM-DD"
              value={value}
              minDate={dayjs()}
            />
          </DemoContainer>
        </LocalizationProvider>

        <FormHelperText sx={{ textAlign: "center", fontWeight: 600 }}>
          Explore
        </FormHelperText>

        {/* capacity input */}
        <Typography component={"p"} variant="h5" mt={4}>
          Number Of Persone
        </Typography>
        <Box component={"footer"} display={"flex"} gap={1} mt={1}>
          <Button
            variant="contained"
            onClick={() => {
              setCapacityValue((current) => current - 1);
            }}
            disabled={capacityValue === 1}
            color="warning"
          >
            <RemoveIcon />
          </Button>
          <TextField
            sx={{
              "& .MuiInputBase-input": {
                textAlign: "center",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#ccc",
                },
                "&:hover fieldset": {
                  borderColor: "#1976d2",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#1976d2",
                },
              },
            }}
            fullWidth
            value={capacityValue}
          ></TextField>
          <Button
            variant="contained"
            onClick={() => setCapacityValue((current) => current + 1)}
          >
            <Add />
          </Button>
        </Box>
        <Button
          onClick={() => {
            navigate("/explore");
          }}
          variant="contained"
          loading={isLoading}
          fullWidth
          size="large"
          sx={{
            borderRadius: 1,
            textTransform: "none",
            bgcolor: "#1a73e8",
            px: 6,
            py: 1.5,
            mt: 3,
            transition: "all 0.5s ease",
            "&:hover": {
              bgcolor: "#1976d2",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
            },
          }}
        >
          Explore
        </Button>
      </Grid>

      {/* right box */}
      <Grid size={{ xs: 12, md: 5 }}>
        <Box component={"img"} src={photo} width={"100%"}></Box>
      </Grid>
    </Grid>
  );
};

export default Home;
