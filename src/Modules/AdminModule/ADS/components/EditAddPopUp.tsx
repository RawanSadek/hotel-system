import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  IconButton,
  MenuItem,
  FormHelperText,
  Box,
  Select,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  ADS_URLS,
  axiosInstance,
  ROOMS_URLS,
} from "../../../../Services/END_POINTS";
import { isAxiosError, type AxiosError } from "axios";
import { useEffect, useState } from "react";
import type {
  AddsRoom,
  IADSForm,
  IselectedAdd,
} from "../../../../Services/INTERFACE";
interface EditAddPopUpProps {
  open: boolean;
  handleClose: () => void;
  isEdit?: boolean;
  AdsData?: IselectedAdd;
  refetchData: () => void;
}

export default function EditAddPopUp({
  open,
  handleClose,
  isEdit = false,
  AdsData,
  refetchData,
}: EditAddPopUpProps) {
  const [rooms, setRooms] = useState<AddsRoom[] | []>([]);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    reset,
    setValue,
  } = useForm<IADSForm>({
    defaultValues: {
      discount: AdsData?.room.discount || 0,
      isActive: AdsData?.isActive ? "true" : "false",
    },
  });

  useEffect(() => {
    async function fetchRooms() {
      try {
        const { data } = await axiosInstance.get(ROOMS_URLS.GET_ALL);
        setRooms(data.data.rooms);
      } catch (error) {
        if (isAxiosError(error))
          toast.error(error.response?.data.message || " Some thing Go Wrong !");
      }
    }
    fetchRooms();
  }, []);

  useEffect(() => {
    if (AdsData && isEdit) {
      setValue("discount", AdsData?.room?.discount);
      setValue("isActive", AdsData?.isActive ? "true" : "false");
    }
  }, [reset, AdsData, isEdit, setValue]);
  const onSubmit = async (data: IADSForm) => {
    try {
      if (isEdit) {
        await axiosInstance.put(ADS_URLS.UPDATE_AD(AdsData?._id || ""), data);
        toast.success("ADS updated successfully");
      } else {
        await axiosInstance.post(ADS_URLS.CREATE_AD, data);
        toast.success("ADS added successfully");
      }
      refetchData();
      handleClose();
      reset();
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };
  const title = isEdit ? "Edit Ad" : "Add New Ad";
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ m: 0, p: 2 }}>
        {title}
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
          {title === "Add New Ad" && (
            <Box mb={2}>
              <Controller
                name="room"
                control={control}
                rules={{ required: "Room Number is required" }}
                render={({ field }) => (
                  <Select
                    {...field}
                    displayEmpty
                    fullWidth
                    onChange={(e) => field.onChange(e.target.value)}
                    sx={{
                      width: "100%",
                    }}
                  >
                    <MenuItem value="" disabled>
                      Select Room Number
                    </MenuItem>
                    {rooms.map((room) => (
                      <MenuItem key={room._id} value={room._id}>
                        {room.roomNumber}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              {errors.room && (
                <FormHelperText>{errors.room?.message}</FormHelperText>
              )}
            </Box>
          )}

          <Box mb={2}>
            <TextField
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: "#f0f4f8",
                  },
                },
              }}
              variant="outlined"
              placeholder="Discound"
              fullWidth
              type="number"
              {...register("discount", {
                required: "Discount Is Required",
                pattern: {
                  value: /^[1-9][0-9]?$/,
                  message: "Discount Must Be More Than 0 and 1 or 2 Character",
                },
              })}
            />
            {errors.discount && (
              <FormHelperText>{errors.discount.message}</FormHelperText>
            )}
          </Box>

          <Box mb={2}>
            <Controller
              name="isActive"
              control={control}
              rules={{ required: "Status is required" }}
              render={({ field }) => (
                <Select
                  {...field}
                  displayEmpty
                  fullWidth
                  value={field.value || ""}
                  onChange={(e) => field.onChange(e.target.value)}
                  sx={{
                    width: "100%",
                  }}
                >
                  <MenuItem value="" disabled>
                    Select Status
                  </MenuItem>
                  <MenuItem value="true">Active</MenuItem>
                  <MenuItem value="false">In Active</MenuItem>
                </Select>
              )}
            />
            {errors.isActive && (
              <FormHelperText>{errors.isActive?.message}</FormHelperText>
            )}
          </Box>
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
