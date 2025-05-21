import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Checkbox,
  ListItemText,
} from "@mui/material";
import { getCarParts } from "../services/carPartService";
import { createPackage } from "../services/packageService";
import { toast } from "react-toastify";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 250,
      width: 250,
    },
  },
};

const AddPackageModal = ({ open, onClose, transportId, onPackageAdded }) => {
  const [packageData, setPackageData] = useState({
    code: "",
    carParts: [],
  });

  const [carParts, setCarParts] = useState([]);
  const [loadingParts, setLoadingParts] = useState(false);

  useEffect(() => {
    if (!open) return;

    const fetchCarParts = async () => {
      setLoadingParts(true);
      try {
        const parts = await getCarParts();
        setCarParts(parts.content);
      } catch (error) {
        toast.error("Failed to load car parts");
      } finally {
        setLoadingParts(false);
      }
    };

    fetchCarParts();
  }, [open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPackageData((prev) => ({ ...prev, [name]: value }));
  };

  const cleanInput = () => {
    setPackageData({ code: "", carParts: [] });
  };

  const handleSubmit = async () => {
    if (!packageData.code.trim() || packageData.carParts.length === 0) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      await createPackage({
        code: packageData.code.trim(),
        carParts: packageData.carParts,
        transportId,
      });
      toast.success("Package added successfully!");
      onPackageAdded(); 
      cleanInput();
    } catch (error) {
      const errorMessage =
        error?.response?.data?.errors?.[0]?.message ||
        error.message ||
        "Failed to add package";
      toast.error(errorMessage);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Add New Package</DialogTitle>
      <DialogContent sx={{ minWidth: 500 }}>
        <Box component="form" sx={{ mt: 1 }}>
          <TextField
            name="code"
            label="Code"
            fullWidth
            value={packageData.code}
            onChange={handleChange}
            margin="normal"
            required
          />

          <FormControl fullWidth margin="normal" required>
            <InputLabel id="car-parts-label">Car Parts</InputLabel>
            <Select
              labelId="car-parts-label"
              name="carParts"
              multiple
              value={packageData.carParts}
              onChange={handleChange}
              label="Car Parts"
              renderValue={(selected) =>
                carParts
                  .filter((part) => selected.includes(part.id))
                  .map((part) => `${part.name} (ID: ${part.id})`)
                  .join(", ")
              }
              disabled={loadingParts}
              MenuProps={MenuProps}
            >
              {carParts.map((part) => (
                <MenuItem key={part.id} value={part.id}>
                  <Checkbox checked={packageData.carParts.indexOf(part.id) > -1} />
                  <ListItemText primary={`${part.name} (ID: ${part.id})`} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} variant="text" color="primary" sx={{ height: "40px" }}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary" sx={{ height: "40px" }}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddPackageModal;
