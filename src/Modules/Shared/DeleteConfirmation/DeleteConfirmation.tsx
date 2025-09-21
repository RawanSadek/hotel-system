import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import deleteImg from "../../../Images/delete.png";
import type { DeleteConfirmationProps } from "../../../Services/INTERFACES";
import { useTranslation } from "react-i18next";
export default function DeleteConfirmation({
  open,
  onClose,
  onConfirm,
  title = "Delete This item ?",
  message = "are you sure you want to delete this item ? if you are sure just click on delete it",
}: DeleteConfirmationProps) {
  const { t } = useTranslation();
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          p: 2,
        },
      }}
      aria-labelledby="delete-confirmation-dialog"
      aria-describedby="delete-confirmation-dialog-description"
    >
      <Box sx={{ display: "flex", justifyContent: "flex-end", p: 1 }}>
        <IconButton onClick={onClose} aria-label="close">
          <CloseIcon />
        </IconButton>
      </Box>
      <DialogContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: 2,
          }}
        >
          <img
            src={deleteImg}
            alt="Delete"
            style={{
              width: "100px",
              height: "100px",
              objectFit: "contain",
            }}
          />
          <Typography variant="h6" component="h2" fontWeight="bold">
            {t(title)}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {t(message)}
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center", gap: 2, pb: 3 }}>
        <Button
          variant="outlined"
          onClick={onClose}
          sx={{
            minWidth: 120,
            borderRadius: 2,
          }}
        >
          {t("Cancel")}
        </Button>
        <Button
          variant="contained"
          onClick={onConfirm}
          color="error"
          sx={{
            minWidth: 120,
            borderRadius: 2,
          }}
        >
          {t("Delete")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
