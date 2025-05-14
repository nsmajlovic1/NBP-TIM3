import React from "react";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import TeamCard from "./TeamCard";

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

const TeamList = ({ teams, error, onViewMembers }) => {
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
          Teams couldn't be loaded. Try again later.
        </Typography>
      ) : teams.length === 0 ? (
        <Typography
          variant="body1"
          color="textSecondary"
          sx={{ textAlign: "center", mt: 3 }}
        >
          There are currently no teams to display.
        </Typography>
      ) : (
        <>
          {teams.map((team) => (
            <TeamCard
              key={team.id}
              team={team}
              onViewMembers={onViewMembers}
            />
          ))}
        </>
      )}
      <Box sx={{ height: "50px", opacity: 0 }} />
    </ScrollableBox>
  );
};

export default React.memo(TeamList);
