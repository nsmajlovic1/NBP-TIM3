import { useEffect, useState } from "react";
import { getReportByTeam } from "../services/reportService";
import { toast } from "react-toastify";
import ReportOverview from "./ReportOverview";

const GeneralOverview = () => {
  const [reportData, setReportData] = useState(null);

  useEffect(() => {
    const fetchGeneralReport = async () => {
      try {
        const data = await getReportByTeam(undefined); 
        setReportData(data);
      } catch (error) {
        toast.error("Failed to load general report.");
      }
    };

    fetchGeneralReport();
  }, []);

  return <ReportOverview report={reportData} />;
};

export default GeneralOverview;
