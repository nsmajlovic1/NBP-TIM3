import { useEffect, useState } from "react";
import { Box, Typography, ToggleButton, ToggleButtonGroup, Button } from "@mui/material";
import { FaDownload } from "react-icons/fa";
import { toast } from "react-toastify";
import { saveAs } from "file-saver";
import { getPDFReportByTeam } from "../services/reportService";
import GeneralOverview from "./GeneralOverview";

const AdminReport = () => {
  const [view, setView] = useState("general");
  const [selectedTeamId, setSelectedTeamId] = useState(null);

  const handleDownload = async () => {
    try {
      const data = await getPDFReportByTeam(view === "team" ? selectedTeamId : undefined);
      saveAs(data, "storage_report.pdf");
      toast.success("Report successfully downloaded!");
    } catch (error) {
      toast.error("Failed to download report.");
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom mb={4}>
        Admin Storage Report
      </Typography>

      <ToggleButtonGroup
        value={view}
        exclusive
        onChange={(e, newView) => {
          if (newView !== null) {
            setView(newView);
          }
        }}
        sx={{ mb: 4 }}
      >
        <ToggleButton value="general">General Overview</ToggleButton>
      </ToggleButtonGroup>
        <GeneralOverview />
      <Box display="flex" justifyContent="flex-end" mt={4}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<FaDownload />}
          onClick={handleDownload}
        >
          Download PDF Report
        </Button>
      </Box>
    </Box>
  );
};

export default AdminReport;
