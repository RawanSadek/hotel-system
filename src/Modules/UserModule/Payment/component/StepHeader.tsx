import { Box } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

type Step = 1 | 2 ;

export default function StepHeader({ step }: { step: Step }) {
  const Dot = (n: Step) => {
    const done = n < step;          
    return (
      <Box
        sx={{
          width: 44, height: 44, borderRadius: "50%",
          bgcolor: done ? "success.main" : "grey.200",
          color: done ? "common.white" : "text.secondary",
          display: "grid", placeItems: "center", fontWeight: 600,
        }}
      >
        {done ? <CheckIcon /> : n}
      </Box>
    );
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 2.5, mb: 3 }}>
      {Dot(1)}
      <Box sx={{ width: 80, height: 2, bgcolor: "grey.300" }} />
      {Dot(2)}
     
    </Box>
  );
}