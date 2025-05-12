import { useState, useEffect } from "react";
import { getTeams, getTeamById } from "../services/teamService";
import { FaPlus } from "react-icons/fa";
import TeamMembersModal from "./TeamMembersModal";
import AddTeamModal from "./AddTeamModal";
import { Button, CircularProgress, Box, Typography } from "@mui/material";
import TeamList from "./TeamList";
import PaginationControls from "./PaginationControls";

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [pagination, setPagination] = useState({
    page: 0,
    size: 5,
    totalElements: 0,
    totalPages: 1,
  });
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [openMembersModal, setOpenMembersModal] = useState(false);

  const fetchTeams = async (page = pagination.page, size = pagination.size) => {
    try {
      setLoading(true);
      const data = await getTeams(page, size);
      setTeams(data.content);
      setPagination({
        page: data.pageNumber,
        size: data.pageSize,
        totalElements: data.totalElements,
        totalPages: data.totalPages,
      });
      setError(null);
    } catch (err) {
      console.error("Error fetching teams:", err);
      setError("Failed to load teams");
      setTeams([]);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchTeams();
  }, [pagination.page, pagination.size]);

  const handleViewMembers = async (teamId) => {
    try {
      const team = await getTeamById(teamId);
      setSelectedTeam(team);
      setOpenMembersModal(true);
    } catch (err) {
      console.error("Failed to fetch team members", err);
    }
  };

  if (loading && pagination.page === 0) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        p: 3,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
          flexShrink: 0,
        }}
      >
        <Typography variant="h4">Teams ({pagination.totalElements})</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpenAddModal(true)}
          startIcon={<FaPlus />}
        >
          Add Team
        </Button>
      </Box>

      <PaginationControls
        pagination={pagination}
        onPageChange={(newPage) => setPagination(prev => ({...prev, page: newPage - 1}))}
        onSizeChange={(newSize) => setPagination(prev => ({...prev, size: newSize, page: 0}))}
      />

      <TeamList 
        teams={teams} 
        error={error} 
        onViewMembers={handleViewMembers} 
      />

      <AddTeamModal
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
        fetchTeams={() => fetchTeams(pagination.page, pagination.size)}
      />
      <TeamMembersModal
        open={openMembersModal}
        onClose={() => setOpenMembersModal(false)}
        team={selectedTeam}
      />
      <Box sx={{ height: '300px', opacity: 0 }} />
    </Box>
  );
};

export default Teams;
