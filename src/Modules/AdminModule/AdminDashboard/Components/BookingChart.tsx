import { useEffect, useState } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { ADMINChart, axiosInstance } from "../../../../Services/END_POINTS";
import { Box } from "@mui/material";

interface rooms {
  pending: number;
  completed: number;
}

export default function BookingChart() {
  const [rooms, setrooms] = useState<rooms>({
    pending: 0,
    completed: 0,
  });

  useEffect(() => {
    const getChartData = async () => {
      const res = await axiosInstance.get(ADMINChart.getChart);
      setrooms(res.data.data.bookings);
    };
    getChartData();
  }, []);

  return (
    <>
      <Box sx={{ color: "black" }}>
        <PieChart
          series={[
            {
              data: [
                {
                  id: 1,
                  value: rooms.pending,
                  label: "pending",
                  color: "#5368F0",
                },
                {
                  id: 2,
                  value: rooms.completed,
                  label: "completed",
                  color: "#b800d8",
                },
              ],
            },
          ]}
          width={400}
          height={200}
        />
      </Box>
    </>
  );
}
