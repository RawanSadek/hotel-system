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
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import type { AxiosError } from "axios";
import { useEffect, useState } from "react";
import UploadIcon from "@mui/icons-material/Upload";
import type {
  FacilitiesInterface,
  RoomsListInterface,
} from "../../../Services/INTERFACE";
import loading from "../../../Images/loading.gif";

export default function RoomData() {
  // const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RoomsListInterface>();

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const { pathname } = useLocation();
  // console.log(pathname.includes('view'));

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

    // console.log(payload);
    try {
      if (pathname.includes("edit")) {
        const response = await axiosInstance.put(
          ROOMS_URLS.UPDATE_ROOMS(id!),
          formData
        );
        toast.success(response.data.message || "Room updated successfully");
      }

      if (pathname.includes("add")) {
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

  const [roomDetails, setRoomDetails] = useState<RoomsListInterface | null>(
    null
  );
  const getRoomDetails = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance(ROOMS_URLS.GET_ROOM_DETAILS(id!));
      setRoomDetails(response.data.data.room);
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      toast.error(error.response?.data?.message || "Something went wrong");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getFacilities();
    if (!pathname.includes("add")) getRoomDetails();
  }, []);

  useEffect(() => {
    if (roomDetails && !pathname.includes("add")) {
      setSelectedFacilities(roomDetails.facilities?.map((f) => f._id) || []);
    }
  }, [roomDetails, pathname]);

  useEffect(() => {
    if (roomDetails) {
      reset(roomDetails);
    }
  }, [roomDetails, reset]);

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

  const [preview, setPreview] = useState<string[] | []>([]);
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
        {isLoading && (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <img
              src={loading}
              alt="loading"
              style={{ width: "5%", textAlign: "center" }}
            ></img>
          </Box>
        )}

        {!isLoading && (
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Room Number */}
            <TextField
              disabled={pathname.includes("view")}
              defaultValue={
                pathname.includes("add") ? "" : roomDetails?.roomNumber
              }
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
              label={pathname.includes("add") ? "Room Number" : ""}
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
                disabled={pathname.includes("view")}
                defaultValue={
                  pathname.includes("add") ? "" : roomDetails?.price
                }
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
                label={pathname.includes("add") ? "Price" : ""}
                fullWidth
                error={!!errors.price}
                helperText={errors.price?.message}
              />

              {/* Capacity */}
              <TextField
                disabled={pathname.includes("view")}
                defaultValue={
                  pathname.includes("add") ? "" : roomDetails?.capacity
                }
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
                label={pathname.includes("add") ? "Cpacity" : ""}
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
                disabled={pathname.includes("view")}
                defaultValue={
                  pathname.includes("add") ? "" : roomDetails?.discount
                }
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
                label={pathname.includes("add") ? "Discount" : ""}
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
                <InputLabel id="demo-multiple-chip-label">
                  {pathname.includes("add") ? "Facilities" : ""}
                </InputLabel>
                <Select<string[]>
                  disabled={pathname.includes("view")}
                  labelId="demo-multiple-chip-label"
                  id="demo-multiple-chip"
                  multiple
                  value={
                    pathname.includes("add")
                      ? selectedFacilities // empty initially, then user adds
                      : pathname.includes("view")
                      ? roomDetails?.facilities?.map((f) => f._id) || [] // show only existing
                      : selectedFacilities.length > 0
                      ? selectedFacilities // keep user’s current selection in edit mode
                      : roomDetails?.facilities?.map((f) => f._id) || [] // prefill from API
                  }
                  onChange={(event: SelectChangeEvent<string[]>) => {
                    const {
                      target: { value },
                    } = event;
                    setSelectedFacilities(
                      typeof value === "string" ? value.split(",") : value
                    );
                  }}
                  input={
                    <OutlinedInput
                      id="select-multiple-chip"
                      label="Facilities"
                    />
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
                <input
                  disabled={pathname.includes("view")}
                  type="file"
                  accept="image/*"
                  multiple
                  id="imgs"
                  style={{ display: "none" }}
                  {...register("imgs", {
                    required: pathname.includes("add")
                      ? "At least one image is required"
                      : false,
                  })}
                  onChange={(e) => {
                    const files = e.target.files
                      ? Array.from(e.target.files)
                      : [];

                    if (files.length > 0) {
                      // Add new files to the previously selected ones
                      const updatedFiles = [...selectedFile, ...files];
                      setSelectedFile(updatedFiles);

                      // Generate previews for all files (old + new)
                      const updatedPreviews = updatedFiles.map((file) =>
                        URL.createObjectURL(file)
                      );
                      setPreview(updatedPreviews);
                    }
                  }}
                />

                {/* Previews (default + newly uploaded) */}
                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    flexWrap: "wrap",
                    marginTop: 2,
                  }}
                >
                  {/* Default images from roomDetails */}
                  {roomDetails?.images?.map((img: string, idx: number) => (
                    <img
                      key={`default-${idx}`}
                      src={img}
                      alt={`room-${idx}`}
                      style={{
                        width: "80px",
                        height: "80px",
                        borderRadius: "10%",
                        objectFit: "cover",
                      }}
                    />
                  ))}

                  {/* Newly uploaded previews */}
                  {Array.isArray(preview) &&
                    preview.map((src, idx) => (
                      <img
                        key={`preview-${idx}`}
                        src={src}
                        alt={`preview-${idx}`}
                        style={{
                          width: "80px",
                          height: "80px",
                          borderRadius: "10%",
                          objectFit: "cover",
                        }}
                      />
                    ))}
                </Box>

                <label htmlFor="imgs" style={{ cursor: "pointer" }}>
                  {!pathname.includes("view") &&
                    preview.length + (roomDetails?.images?.length || 0) < 5 && (
                      <UploadIcon
                        color="primary"
                        sx={{ marginTop: "10px", cursor: "pointer" }}
                      />
                    )}
                </label>

                {errors.imgs && (
                  <Typography sx={{ color: "red" }}>
                    {errors.imgs.message as string}
                  </Typography>
                )}
              </Box>
            </FormControl>

            <Box sx={{ mt: "50px", display: "flex", justifyContent: "end" }}>
              <Button
                sx={{
                  paddingX: "40px",
                  marginX: "30px",
                  color: "blue",
                  bgcolor: "white",
                }}
                type="button"
                variant="contained"
                disabled={isSubmitting}
                onClick={() => navigate("/dashboard/rooms")}
              >
                Close
              </Button>

              {!pathname.includes("view") && (
                <Button
                  sx={{ paddingX: "40px" }}
                  type="submit"
                  variant="contained"
                  disabled={isSubmitting}
                >
                  Save
                </Button>
              )}
            </Box>
          </form>
        )}
      </Box>
    </>
  );
}
