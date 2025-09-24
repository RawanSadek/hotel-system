import React from "react";
import { Paper, Typography, styled } from "@mui/material";
import { type SvgIconComponent } from "@mui/icons-material";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#1A1B1E",
  ...theme.typography.body2,
  textAlign: "start",
  padding: theme.spacing(2),
  color: theme.palette.common.white,
  display: "flex",
  justifyContent: "space-between",
  margin: "1.5rem 0",
  borderRadius: "15px",
}));

interface CardProps {
  count: number;
  label: string;
  iconColor: string;
  Icon: SvgIconComponent;
}

const DashboardCard: React.FC<CardProps> = ({
  count,
  label,
  iconColor,
  Icon,
}) => {
  return (
    <Item
      sx={{
        padding: "2rem 4rem",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Typography variant="h4">
        {count}
        <Typography>{label}</Typography>
      </Typography>
      <Icon sx={{ color: iconColor, fontSize: 40 }} />
    </Item>
  );
};

export default DashboardCard;
