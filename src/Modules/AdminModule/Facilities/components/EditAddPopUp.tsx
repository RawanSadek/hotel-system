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
  } = useForm<IFacilityForm>({
    defaultValues: {
      name: facilityData?.name || "",
    },
  });
  const { t } = useTranslation();
  const onSubmit = async (data: IFacilityForm) => {
    try {
      if (isEdit) {
        await axiosInstance.put(
          `${FACILITIES_URLS.UPDATE_FACILITY}/${facilityData?._id}`,
          data
        );
        toast.success("Facility updated successfully");
      } else {
        await axiosInstance.post(FACILITIES_URLS.CREATE_FACILITY, data);
        toast.success("Facility added successfully");
      }
      refetchData();
      handleClose();
      reset();
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ m: 0, p: 2 }}>
        {isEdit ? "Edit" : "Add"} Facility
        <IconButton
          aria-label="close"
          onClick={handleClose}
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
            placeholder={t((isEdit ? "Edit" : "Add") + " Facility Name")}
            sx={{ marginTop: "10px", marginBottom: "10px" }}
            {...register("name", {
              required: "Facility name is required",
              minLength: {
                value: 3,
                message: "Minimum length is 3 characters",
              },
            })}
            label="Name"
            fullWidth
            error={!!errors.name}
            helperText={errors.name?.message}
            margin="normal"
          />
        </DialogContent>
        <DialogActions sx={{ padding: "20px" }}>
          <Button type="submit" variant="contained" disabled={isSubmitting}>
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
