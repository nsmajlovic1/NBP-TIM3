import React from "react";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import CarPartCard from "./CarPartCard";

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

const CarPartList = ({ carParts, error }) => {
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
          Car parts couldn't be loaded. Try again later.
        </Typography>
      ) : carParts.length === 0 ? (
        <Typography
          variant="body1"
          color="textSecondary"
          sx={{ textAlign: "center", mt: 3 }}
        >
          There are currently no car parts to display.
        </Typography>
      ) : (
        <>
          {carParts.map((carPart) => (
            <CarPartCard
              key={carPart.id}
              carPart={carPart}
            />
          ))}
        </>
      )}
      <Box sx={{ height: "70px", opacity: 0 }} />
    </ScrollableBox>
  );
};

export default React.memo(CarPartList);
