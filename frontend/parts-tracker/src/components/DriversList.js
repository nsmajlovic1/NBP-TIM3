import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import DriverCard from "./DriverCard";

const ScrollableBox = styled(Box)(({ theme }) => ({
  overflowY: "auto",
  scrollbarWidth: "thin",
  "&::-webkit-scrollbar": {
    width: "6px",
  },
  "&::-webkit-scrollbar-track": {
    background: theme.palette.grey[100],
  },
  "&::-webkit-scrollbar-thumb": {
    background: theme.palette.grey[400],
    borderRadius: "3px",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    background: theme.palette.grey[500],
  },
  scrollbarColor: "transparent transparent",
  "&:hover": {
    scrollbarColor: `${theme.palette.grey[400]} ${theme.palette.grey[100]}`,
  },
}));

const DriversList = ({ drivers }) => {
  const [error, setError] = useState(null);
  return (
    <ScrollableBox
      sx={{
        flexGrow: 1,
        pr: 1,
        "& > *:not(:last-child)": {
          mb: 2,
        },
      }}
    >
      {error ? (
        <Typography
          variant="body1"
          color="error"
          sx={{ textAlign: "center", mt: 3 }}
        >
          Drivers couldn't be loaded. Try again later.
        </Typography>
      ) : drivers.length === 0 ? (
        <Typography
          variant="body1"
          color="textSecondary"
          sx={{ textAlign: "center", mt: 3 }}
        >
          There are currently no drivers to display.
        </Typography>
      ) : (
        <>
          {drivers.map((driver) => (
            <DriverCard
              key={driver.id}
              driver={driver}
            />
          ))}
        </>
      )}
      <Box sx={{ height: "100px", opacity: 0 }} />
    </ScrollableBox>
  );
};

export default React.memo(DriversList);
