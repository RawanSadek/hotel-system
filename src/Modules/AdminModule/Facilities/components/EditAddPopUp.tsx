import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  axiosInstance,
  FACILITIES_URLS,
} from "../../../../Services/END_POINTS";
import type { AxiosError } from "axios";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

interface EditAddPopUpProps {
  open: boolean;
  handleClose: () => void;
  isEdit?: boolean;
  facilityData?: { _id: string; name: string } | null;
  refetchData: () => void;
}

interface IFacilityForm {
  name: string;
}

export default function EditAddPopUp({
  open,
  handleClose,
  isEdit = false,
  facilityData,
  refetchData,
}: EditAddPopUpProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm<IFacilityForm>({
    defaultValues: {
      name: "",
    },
  });

  const { t } = useTranslation();

  // Reset form when modal opens/closes or when facilityData changes
  useEffect(() => {
    if (open && isEdit && facilityData) {
      setValue("name", facilityData.name);
    } else if (!open) {
      reset();
    }
  }, [open, isEdit, facilityData, setValue, reset]);

  const onSubmit = async (data: IFacilityForm) => {
    try {
      if (isEdit && facilityData?._id) {
        await axiosInstance.put(
          `${FACILITIES_URLS.UPDATE_FACILITY}/${facilityData._id}`,
          data
        );
        toast.success(t("Facility updated successfully"));
      } else {
        await axiosInstance.post(FACILITIES_URLS.CREATE_FACILITY, data);
        toast.success(t("Facility added successfully"));
      }
      refetchData();
      handleClose();
      reset();
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      toast.error(t(error.response?.data?.message || "Something went wrong"));
    }
  };

  const handleCloseDialog = () => {
    reset();
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ m: 0, p: 2 }}>
        {t(isEdit ? "Edit Facility" : "Add Facility")}
        <IconButton
          aria-label="close"
          onClick={handleCloseDialog}
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

      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent dividers>
          <TextField
            type="text"
            variant="outlined"
            placeholder={t(isEdit ? "Edit Facility Name" : "Add Facility Name")}
            sx={{ marginTop: "10px", marginBottom: "10px" }}
            {...register("name", {
              required: t("Facility name is required"),
              minLength: {
                value: 3,
                message: t("Minimum length is 3 characters"),
              },
            })}
            label={t("Name")}
            fullWidth
            error={!!errors.name}
            helperText={errors.name?.message}
            margin="normal"
          />
        </DialogContent>
        <DialogActions sx={{ padding: "20px" }}>
          <Button onClick={handleCloseDialog}>{t("Cancel")}</Button>
          <Button type="submit" variant="contained" disabled={isSubmitting}>
            {t("Save")}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
