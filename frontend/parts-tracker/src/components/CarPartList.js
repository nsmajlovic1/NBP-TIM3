import React from "react";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import CarPartCard from "./CarPartCard";

const ScrollableBox = styled(Box)(({ theme }) => ({
   overflowY: "auto",

  "&::-webkit-scrollbar": {
    width: "0px",
    height: "0px",
  },

  "&::-webkit-scrollbar-track": {
    background: "transparent",
  },

  "&::-webkit-scrollbar-thumb": {
    background: "transparent",
  },

  scrollbarWidth: "none",
  scrollbarColor: "transparent transparent",
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
