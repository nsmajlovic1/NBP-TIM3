import { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import { toast } from "react-toastify";
import { getTransportCompanies } from "../services/transportCompanyService";
import { getStorages } from "../services/storageService";
import { createTransport } from "../services/transportService";

const formatAddress = (location) => {
  return `${location.streetName}, ${location.cityName}, ${location.countryIso}`;
};

const AddTransportModal = ({ open, onClose, onTransportAdded }) => {
  const initialData = {
    type: "",
    departureDate: "",
    arrivalDate: "",
    vehicleNumber: "",
    companyId: "",
    capacity: "",
    departureAddressId: "",
    destinationAddressId: "",
  };

  const [transportData, setTransportData] = useState(initialData);
  const [companies, setCompanies] = useState([]);
  const [storages, setStorages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    capacity: false,
    sameAddress: false,
    arrivalBeforeDeparture: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [companyRes, storageRes] = await Promise.all([
          getTransportCompanies(),
          getStorages(),
        ]);
        setCompanies(companyRes.content || []);
        setStorages(storageRes.content || []);
      } catch (err) {
        toast.error("Error fetching data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (open) {
      fetchData();
      setTransportData(initialData);
      setErrors({ capacity: false, sameAddress: false, arrivalBeforeDeparture: false });
    }
  }, [open]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setTransportData((prev) => {
      const newData = { ...prev, [name]: value };

      if (
        newData.departureDate &&
        newData.arrivalDate &&
        new Date(newData.arrivalDate) < new Date(newData.departureDate)
      ) {
        setErrors((prev) => ({
          ...prev,
          arrivalBeforeDeparture: true,
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          arrivalBeforeDeparture: false,
        }));
      }

      return newData;
    });

    if (name === "capacity") {
      const num = Number(value);
      setErrors((prev) => ({
        ...prev,
        capacity: isNaN(num) || num <= 0,
      }));
    }

    if (name === "departureAddressId" || name === "destinationAddressId") {
      const departure = name === "departureAddressId" ? value : transportData.departureAddressId;
      const destination = name === "destinationAddressId" ? value : transportData.destinationAddressId;
      setErrors((prev) => ({
        ...prev,
        sameAddress: departure && destination && departure === destination,
      }));
    }
  };

  const handleSubmit = async () => {
    if (errors.capacity || errors.sameAddress || errors.arrivalBeforeDeparture) {
      toast.error("Please fix form errors before submitting.");
      return;
    }

    try {
      const dataToSend = {
        ...transportData,
        capacity: Number(transportData.capacity),
        departureDate: `${transportData.departureDate}T00:00:00`,
        arrivalDate: `${transportData.arrivalDate}T00:00:00`,
      };
      console.log(dataToSend)
      const result = await createTransport(dataToSend);
      toast.success("Transport successfully added");
      onTransportAdded(result);
      onClose();
    } catch (err) {
      toast.error("Failed to add transport");
      onClose();
      console.error(err);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Add New Transport</DialogTitle>
      <DialogContent>
        {loading ? (
          <Box display="flex" justifyContent="center" py={4}>
            <CircularProgress />
          </Box>
        ) : (
          <Box display="flex" flexDirection="column" gap={2} mt={2}>
            <Box display="flex" gap={2}>
              <FormControl fullWidth required>
                <InputLabel>Transport Type</InputLabel>
                <Select
                  name="type"
                  value={transportData.type}
                  onChange={handleChange}
                  label="Transport Type"
                >
                  <MenuItem value="Ship">Ship</MenuItem>
                  <MenuItem value="Plane">Plane</MenuItem>
                  <MenuItem value="Truck">Truck</MenuItem>
                </Select>
              </FormControl>
              <TextField
                fullWidth
                label="Vehicle Number"
                name="vehicleNumber"
                value={transportData.vehicleNumber}
                onChange={handleChange}
                required
              />
            </Box>

            <Box display="flex" gap={2}>
              <TextField
                fullWidth
                label="Departure Date"
                type="date"
                name="departureDate"
                value={transportData.departureDate}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                required
              />
              <TextField
                fullWidth
                label="Arrival Date"
                type="date"
                name="arrivalDate"
                value={transportData.arrivalDate}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                required
                error={errors.arrivalBeforeDeparture}
                helperText={
                  errors.arrivalBeforeDeparture
                    ? "Arrival date cannot be before departure date"
                    : ""
                }
              />
            </Box>

            <Box display="flex" gap={2}>
              <FormControl fullWidth required error={errors.sameAddress}>
                <InputLabel>Departure Address</InputLabel>
                <Select
                  name="departureAddressId"
                  value={transportData.departureAddressId}
                  onChange={handleChange}
                  label="Departure Address"
                >
                  {storages.map((storage) => (
                    <MenuItem
                      key={storage.id}
                      value={storage.location.id}
                      disabled={storage.location.id === transportData.destinationAddressId}
                    >
                      {formatAddress(storage.location)}
                    </MenuItem>
                  ))}
                </Select>
                {errors.sameAddress && (
                  <Typography variant="caption" color="error">
                    Departure and destination addresses cannot be the same
                  </Typography>
                )}
              </FormControl>

              <FormControl fullWidth required error={errors.sameAddress}>
                <InputLabel>Destination Address</InputLabel>
                <Select
                  name="destinationAddressId"
                  value={transportData.destinationAddressId}
                  onChange={handleChange}
                  label="Destination Address"
                >
                  {storages.map((storage) => (
                    <MenuItem
                      key={storage.id}
                      value={storage.location.id}
                      disabled={storage.location.id === transportData.departureAddressId}
                    >
                      {formatAddress(storage.location)}
                    </MenuItem>
                  ))}
                </Select>
                {errors.sameAddress && (
                  <Typography variant="caption" color="error">
                    Departure and destination addresses cannot be the same
                  </Typography>
                )}
              </FormControl>
            </Box>

            <Box display="flex" gap={2}>
              <FormControl fullWidth required>
                <InputLabel>Company</InputLabel>
                <Select
                  name="companyId"
                  value={transportData.companyId}
                  onChange={handleChange}
                  label="Company"
                >
                  {companies.map((company) => (
                    <MenuItem key={company.id} value={company.id}>
                      {company.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                fullWidth
                label="Capacity"
                type="number"
                name="capacity"
                value={transportData.capacity}
                onChange={handleChange}
                error={errors.capacity}
                helperText={errors.capacity ? "Capacity must be greater than 0" : ""}
                inputProps={{ min: 1 }}
                required
              />
            </Box>
          </Box>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          disabled={
            !transportData.type ||
            !transportData.departureDate ||
            !transportData.arrivalDate ||
            !transportData.vehicleNumber ||
            !transportData.companyId ||
            !transportData.capacity ||
            !transportData.departureAddressId ||
            !transportData.destinationAddressId ||
            loading ||
            errors.capacity ||
            errors.sameAddress ||
            errors.arrivalBeforeDeparture
          }
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTransportModal;
