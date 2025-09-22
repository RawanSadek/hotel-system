import { Box, Button, Typography } from "@mui/material";
import loading from "./../../../../Images/loading.gif";
import { useTranslation } from "react-i18next";
import Stack from "@mui/material/Stack";
import EditAddPopUp from "./EditAddPopUp";
import { useState } from "react";
interface IFacilitiesHeaerProp {
  getFacilities: React.FC<1>;
}

const FacilitiesHeader = ({ getFacilities }: IFacilitiesHeaerProp) => {
  const { t } = useTranslation();
  const [openPopup, setOpenPopup] = useState(false);
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
            {t("facilities.facilities_table_details")}
          </Typography>
          <Typography color="#323C47" sx={{ marginTop: "10px" }}>
            {t("facilities.check_all_details")}
          </Typography>
        </Stack>

        <Button
          type="submit"
          onClick={() => setOpenPopup(true)}
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
          {t("facilities.add_new_facility")}
          <img
            hidden={!isSubmitting}
            src={loading}
            alt="loading"
            className="loading-icon"
          />
        </Button>
      </Box>
      <EditAddPopUp
        open={openPopup}
        handleClose={() => setOpenPopup(false)}
        isEdit={false}
        refetchData={getFacilities}
      />
    </>
  );
};

export default FacilitiesHeader;
