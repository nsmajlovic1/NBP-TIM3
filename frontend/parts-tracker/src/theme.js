import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#003366", 
    },
    secondary: {
      main: "#1976D2",
    },
    background: {
      default: "#080808", 
      paper: "#ffffff",
    },
    text: {
      primary: "#B0B0B0", 
      secondary: "#808080",
    },
  },
  typography: {
    fontFamily: "'Roboto', 'Arial', sans-serif", 
  },
});

export default theme;
