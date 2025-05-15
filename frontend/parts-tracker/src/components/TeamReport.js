import { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { FaDownload } from "react-icons/fa";
import { getReportByTeam } from "../services/reportService";
import { toast } from "react-toastify";
import { saveAs } from "file-saver";

const TeamReport = () => {
  const [userTeamId, setUserTeamId] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.teamId) {
      setUserTeamId(user.teamId);
    }
  }, []);

  const handleDownload = async () => {
    try {
      const data = await getReportByTeam(userTeamId);

      saveAs(data, "storage_report.pdf");

      toast.success("Report successfully downloaded!");
    } catch (error) {
      toast.error("Failed to download report.");
    }
  };

  return (
    <Box>
      <Typography variant="h4">Storage Report</Typography>
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
    </Box>
  );
};

export default TeamReport;
