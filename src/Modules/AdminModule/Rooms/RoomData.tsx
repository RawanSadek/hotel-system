import {
  Box,
  Button,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
  type SelectChangeEvent,
} from "@mui/material";
import { useForm } from "react-hook-form";
import {
  axiosInstance,
  FACILITIES_URLS,
  ROOMS_URLS,
} from "../../../Services/END_POINTS";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import type { AxiosError } from "axios";
import { useEffect, useState } from "react";
import UploadIcon from "@mui/icons-material/Upload";
import type {
  FacilitiesInterface,
  RoomsListInterface,
} from "../../../Services/INTERFACE";

interface RoomDataProps {
  isEdit: boolean;
}

export default function RoomData({ isEdit }: RoomDataProps) {
  // const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RoomsListInterface>();

  const navigate = useNavigate();

  const { id } = useParams();

  const onSubmit = async (data: RoomsListInterface) => {
    const formData = new FormData();

    formData.append("roomNumber", data.roomNumber);
    formData.append("price", data.price.toString());
    formData.append("capacity", data.capacity.toString());
    formData.append("discount", data.discount.toString());
    selectedFacilities.forEach((id) => {
      formData.append("facilities[]", id);
    });

    selectedFile.forEach((file) => {
      formData.append("imgs", file);
    });

    try {
      if (isEdit) {
        const response = await axiosInstance.put(
          `${ROOMS_URLS.UPDATE_ROOMS}/${id}`,
          formData
        );
        toast.success(response.data.message || "Room updated successfully");
      } else {
        const response = await axiosInstance.post(
          ROOMS_URLS.CREATE_ROOM,
          formData
        );
        toast.success(response.data.message || "Room added successfully");
      }
      reset();
      navigate("/dashboard/rooms");
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const [facilities, setFacilities] = useState<FacilitiesInterface[]>([]);

  const getFacilities = async () => {
    try {
      const response = await axiosInstance(FACILITIES_URLS.GET_ALL, {
        params: {
          page: 1,
          size: 99999,
        },
      });
      setFacilities(response?.data?.data?.facilities);
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    getFacilities();
  }, []);

  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File[]>([]);

  return (
    <>
      <Box
        sx={{
          marginTop: "50px",
          paddingX: "30px",
          width: "80%",
          marginX: "auto",
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Room Number */}
          <TextField
            type="text"
            variant="outlined"
            sx={{
              marginY: "10px",
              bgcolor: "#F7F7F7",
              borderRadius: "15px",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  border: "none",
                },
              },
            }}
            {...register("roomNumber", {
              required: "Room number is required",
            })}
            label="Room Number"
            fullWidth
            error={!!errors.roomNumber}
            helperText={errors.roomNumber?.message}
          />

          {/* Price - Capacity */}
          <Box
            sx={{ marginY: "10px" }}
            display={"flex"}
            justifyContent={"space-between"}
            alignContent={"center"}
            gap={3}
          >
            {/* Price */}
            <TextField
              type="number"
              variant="outlined"
              sx={{
                marginY: "10px",
                bgcolor: "#F7F7F7",
                borderRadius: "15px",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    border: "none",
                  },
                },
              }}
              {...register("price", {
                required: "Price is required",
                validate: (value) =>
                  !isNaN(value) && value > 0
                    ? true
                    : "Price must be a positive number",
              })}
              label="Price"
              fullWidth
              error={!!errors.price}
              helperText={errors.price?.message}
            />

            {/* Capacity */}
            <TextField
              type="number"
              variant="outlined"
              sx={{
                marginY: "10px",
                bgcolor: "#F7F7F7",
                borderRadius: "15px",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    border: "none",
                  },
                },
              }}
              {...register("capacity", {
                required: "Capacity is required",
                validate: (value) =>
                  !isNaN(value) && value > 0
                    ? true
                    : "Capacity must be a positive number",
              })}
              label="Capacity"
              fullWidth
              error={!!errors.capacity}
              helperText={errors.capacity?.message}
            />
          </Box>

          {/* Discount - Facilities */}
          <Box
            sx={{ marginY: "10px" }}
            display={"flex"}
            justifyContent={"space-between"}
            alignContent={"center"}
            gap={3}
          >
            {/* Discount */}
            <TextField
              type="number"
              variant="outlined"
              sx={{
                marginY: "10px",
                bgcolor: "#F7F7F7",
                borderRadius: "15px",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    border: "none",
                  },
                },
              }}
              {...register("discount", {
                required: "Discount is required",
                validate: (value) =>
                  !isNaN(value) && value > 0
                    ? true
                    : "Discount must be a positive number",
              })}
              label="Discount"
              fullWidth
              error={!!errors.discount}
              helperText={errors.discount?.message}
            />

            {/* Facilities */}
            <FormControl
              fullWidth
              sx={{
                marginY: "10px",
                bgcolor: "#F7F7F7",
                borderRadius: "15px",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    border: "none",
                  },
                },
              }}
            >
              <InputLabel id="demo-multiple-chip-label">Facilities</InputLabel>
              <Select<string[]>
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                multiple
                value={selectedFacilities}
                onChange={(
                  event: SelectChangeEvent<typeof selectedFacilities>
                ) => {
                  const {
                    target: { value },
                  } = event;
                  setSelectedFacilities(
                    typeof value === "string" ? value.split(",") : value
                  );
                }}
                input={
                  <OutlinedInput id="select-multiple-chip" label="Facilities" />
                }
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((id) => {
                      const facility = facilities.find((f) => f._id === id);
                      return <Chip key={id} label={facility?.name || id} />;
                    })}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {facilities.map((facility) => (
                  <MenuItem key={facility._id} value={facility._id}>
                    {facility.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {/* Images */}
          <FormControl fullWidth sx={{ marginTop: "30px" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <label htmlFor="imgs" style={{ cursor: "pointer" }}>
                {!preview ? (
                  <UploadIcon
                    color="primary"
                    sx={{ marginTop: "10px", cursor: "pointer" }}
                  />
                ) : (
                  // Preview
                  <Box mt={2}>
                    <img
                      src={preview}
                      alt="preview"
                      style={{
                        width: "80px",
                        height: "80px",
                        borderRadius: "50%",
                      }}
                    />
                  </Box>
                )}
              </label>

              <input
                type="file"
                accept="image/*"
                id="imgs"
                style={{ display: "none" }}
                {...register("imgs", {
                  required: "Image is required",
                })}
                onChange={(e) => {
                  const files = e.target.files
                    ? Array.from(e.target.files)
                    : [];
                  setSelectedFile(files);
                  if (files.length > 0) {
                    setPreview(URL.createObjectURL(files[0])); // just show first preview
                  }
                }}
              />
              {errors.imgs && (
                <Typography sx={{ color: "red" }}>
                  {errors.imgs.message as string}
                </Typography>
              )}
            </Box>
          </FormControl>

          <Button type="submit" variant="contained" disabled={isSubmitting}>
            Save
          </Button>
        </form>
      </Box>
    </>
  );
}
