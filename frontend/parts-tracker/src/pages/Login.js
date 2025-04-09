import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Container, TextField, Button, Typography, Paper } from "@mui/material";

const Login = () => {
  const { login } = useAuth();
  const [usernameInput, setUsername] = useState("");
  const [passwordInput, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const credentials = {
        username: usernameInput,
        password: passwordInput
      };
      await login(credentials);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ padding: 4, mt: 8 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Login
        </Typography>
        {error && (
          <Typography color="error" align="center">
            {error}
          </Typography>
        )}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            value={usernameInput}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            value={passwordInput}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Login
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;
