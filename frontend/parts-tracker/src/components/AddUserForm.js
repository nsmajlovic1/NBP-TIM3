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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted", formData);
  };

  return (
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          mt: 2,
          mx: "auto",
          maxWidth: 1100,
          px: 2, 
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
                <MenuItem value={1}>Mechanic</MenuItem>
                <MenuItem value={2}>Admin</MenuItem>
                <MenuItem value={3}>Logistic</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </Grid>

        <Grid item xs={12}>
          <Box display="flex" justifyContent="center">
            <Button variant="contained" type="submit" size="large">
              Submit
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddUserForm;
