import { useEffect, useState } from "react";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { getTeams } from "../services/teamService";
import { getReportByTeam } from "../services/reportService";
import { toast } from "react-toastify";
import ReportOverview from "./ReportOverview";

const TeamOverview = ({ selectedTeamId, setSelectedTeamId }) => {
  const [teams, setTeams] = useState([]);
  const [reportData, setReportData] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await getTeams();
        setTeams(response.content);
        if (response.content.length > 0 && !selectedTeamId) {
          setSelectedTeamId(response.content[0].id);
        }
      } catch (error) {
        toast.error("Failed to load teams.");
      }
    };

    fetchTeams();
  }, []);

  useEffect(() => {
    if (selectedTeamId) {
      const fetchTeamReport = async () => {
        try {
          const data = await getReportByTeam(selectedTeamId);
          setReportData(data);
        } catch (error) {
          toast.error("Failed to load team report.");
        }
      };

      fetchTeamReport();
    } else {
      setReportData(null);
    }
  }, [selectedTeamId]);

  useEffect(() => {
    if (selectedTeamId && !reportData) {
      const fetchTeamReport = async () => {
        try {
          const data = await getReportByTeam(selectedTeamId);
          setReportData(data);
        } catch (error) {
          toast.error("Failed to load team report.");
        }
      };

      fetchTeamReport();
    }
  }, [selectedTeamId, reportData]);

  return (
    <Box>
      <FormControl fullWidth sx={{ mb: 4 }}>
        <InputLabel id="team-select-label">Select Team</InputLabel>
        <Select
          labelId="team-select-label"
          value={selectedTeamId || ""}
          onChange={(e) => {
            setSelectedTeamId(e.target.value);
            setReportData(null); 
          }}
          label="Select Team"
        >
          {teams.map((team) => (
            <MenuItem key={team.id} value={team.id}>
              {team.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <ReportOverview report={reportData} />
    </Box>
  );
};

export default TeamOverview;
