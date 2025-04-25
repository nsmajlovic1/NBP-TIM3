import {
  TextField,
  Button,
  Grid,
  MenuItem,
  InputLabel,
  Select,
  FormControl,
  Box,
  Stack,
} from "@mui/material";
import { useState } from "react";
import { registerUser } from "../services/userService";
import { toast } from "react-toastify";

const AddUserForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    username: "",
    phoneNumber: "",
    birthDate: "",
    roleId: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formattedBirthDate = new Date(formData.birthDate).toISOString();
    const updatedFormData = { ...formData, birthDate: formattedBirthDate };

    try {
      const response = await registerUser(updatedFormData);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        username: "",
        phoneNumber: "",
        birthDate: "",
        roleId: "",
      });

      toast.success("User added successfully!");
      console.log(response);
    } catch (err) {
      toast.error("An error occurred! Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      display="flex"
      alignItems="flex-start"
      justifyContent="center"
      minHeight="100vh"
      pt={8}
      sx={{ backgroundColor: "#f9f9f9", px: 2 }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          maxWidth: 440,
          width: "100%",
          backgroundColor: "white",
          p: 4,
          borderRadius: 1,
          boxShadow: 3,
        }}
      >
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Stack spacing={2}>
              <TextField
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                fullWidth
                required
              />
              <TextField
                label="Birth Date"
                name="birthDate"
                type="date"
                value={formData.birthDate}
                onChange={handleChange}
                fullWidth
                required
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                fullWidth
                required
              />
              <TextField
                label="Phone Number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                fullWidth
                required
              />
            </Stack>
          </Grid>

          <Grid item xs={12} md={6}>
            <Stack spacing={2}>
              <TextField
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                fullWidth
                required
              />
              <TextField
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                required
                type="email"
              />
              <TextField
                label="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                fullWidth
                required
                type="password"
              />
              <FormControl fullWidth required>
                <InputLabel>Role</InputLabel>
                <Select
                  name="roleId"
                  value={formData.roleId}
                  onChange={handleChange}
                  label="Role"
                >
                  <MenuItem value={121}>Admin</MenuItem>
                  <MenuItem value={122}>Logistic</MenuItem>
                  <MenuItem value={125}>Mechanic</MenuItem>
                </Select>
              </FormControl>
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <Box display="flex" justifyContent="center">
              <Button
                variant="contained"
                type="submit"
                size="large"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit"}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default AddUserForm;
