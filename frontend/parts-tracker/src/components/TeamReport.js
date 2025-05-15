import { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { FaDownload } from "react-icons/fa";
import { getPDFReportByTeam, getReportByTeam } from "../services/reportService";
import { toast } from "react-toastify";
import { saveAs } from "file-saver";
import ReportOverview from "./ReportOverview"; // 🆕

const TeamReport = () => {
  const [userTeamId, setUserTeamId] = useState(null);
  const [reportData, setReportData] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.teamId) {
      setUserTeamId(user.teamId);
    }
  }, []);

  useEffect(() => {
    if (userTeamId) {
      fetchReport();
    }
  }, [userTeamId]);

  const fetchReport = async () => {
    try {
      const data = await getReportByTeam(userTeamId);
      setReportData(data);
    } catch (error) {
      toast.error("Failed to load report data.");
    }
  };

  const handleDownload = async () => {
    try {
      const data = await getPDFReportByTeam(userTeamId);
      saveAs(data, "storage_report.pdf");
      toast.success("Report successfully downloaded!");
    } catch (error) {
      toast.error("Failed to download report.");
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Storage Report
      </Typography>

      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<FaDownload />}
          onClick={handleDownload}
        >
          Download PDF Report
        </Button>
      </Box>

      {reportData ? (
        <ReportOverview report={reportData} />
      ) : (
        <Typography variant="body1">Loading report data...</Typography>
      )}
    </Box>
  );
};

export default TeamReport;
