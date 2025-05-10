import { useState, useEffect } from "react";
import { getTeams } from "../services/teamService";
import { FaPlus } from "react-icons/fa";
import {
  Button,
  CircularProgress,
  Box,
  Typography,
  Card,
  CardContent,
  Paper,
  Pagination,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import AddTeamModal from "./AddTeamModal";

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

  const fetchTeams = async (page = 0, size = pagination.size) => {
    try {
      setLoading(true);
      const data = await getTeams(page, size);
      setTeams(data.content);
      setPagination(prev => ({
        ...prev,
        page: data.pageNumber,
        size: data.pageSize,
        totalElements: data.totalElements,
        totalPages: data.totalPages,
      }));
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
  }, []);

  const handlePageChange = (event, newPage) => {
    fetchTeams(newPage - 1); 
  };

  const handleSizeChange = (event) => {
    const newSize = event.target.value;
    setPagination(prev => ({ ...prev, size: newSize }));
    fetchTeams(0, newSize); 
  };

  if (loading && pagination.page === 0) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <CircularProgress />
      </Box>
    );
  }


  return (
    <Box sx={{ 
      p: 3, 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
    }}>
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

      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'flex-end', flexShrink: 0 }}>
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Items per page</InputLabel>
          <Select
            value={pagination.size}
            label="Items per page"
            onChange={handleSizeChange}
          >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          mb: 2,
          py: 1, 
          pr: 1,
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#f1f1f1',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#888',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#555',
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
          <Box sx={{ 
            display: "flex", 
            flexDirection: "column", 
            gap: 2,
            pb: 2 
          }}>
            {teams.map((team) => (
              <Card
                key={team.id}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  border: "1px solid #ccc",
                  minHeight: "130px",
                }}
              >
                <CardContent sx={{ p: "12px !important" }}>
                  <Box sx={{ display: "flex", mb: 1 }}>
                    <Typography
                      sx={{
                        fontSize: "14px",
                        fontWeight: "bold",
                        color: "black",
                        mr: 1,
                      }}
                    >
                      Name:
                    </Typography>
                    <Typography sx={{ fontSize: "14px", color: "black" }}>
                      {team.name}
                    </Typography>
                  </Box>

                  <Box sx={{ display: "flex", mb: 1 }}>
                    <Typography
                      sx={{
                        fontSize: "14px",
                        fontWeight: "bold",
                        color: "black",
                        mr: 1,
                      }}
                    >
                      Country:
                    </Typography>
                    <Typography sx={{ fontSize: "14px", color: "black" }}>
                      {team.countryIso}
                    </Typography>
                  </Box>

                  <Paper
                    elevation={0}
                    sx={{
                      p: 1,
                      backgroundColor: "#f5f5f5",
                      borderRadius: "4px",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "14px",
                        fontWeight: "bold",
                        color: "black",
                        mb: 0.5,
                      }}
                    >
                      Description:
                    </Typography>
                    <Typography sx={{ fontSize: "14px", color: "black" }}>
                      {team.description || "No description provided"}
                    </Typography>
                  </Paper>
                </CardContent>
              </Card>
            ))}
            <Box sx={{ height: "200px" }} />
          </Box>
        )}
      </Box>

      <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        pt: 2,
        pb: 1,
        backgroundColor: 'background.paper',
        borderTop: '1px solid',
        borderColor: 'divider',
        paddingBottom: "30px",
        paddingTop: "30px",
        zIndex: 10, 
      }}
    >
      <Pagination
        count={pagination.totalPages}
        page={pagination.page + 1}
        onChange={handlePageChange}
        color="primary"
        showFirstButton
        showLastButton
      />
    </Box>

      <AddTeamModal
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
        fetchTeams={() => fetchTeams(pagination.page, pagination.size)}
      />
    </Box>
  );
};

export default Teams;