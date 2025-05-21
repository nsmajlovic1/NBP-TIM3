import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import theme from "../theme";
import { getPackagesStatistic } from "../services/packageService";

ChartJS.register(ArcElement, Tooltip, Legend);

const PackageStatistic = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user?.teamId) return;
      try {
        const stats = await getPackagesStatistic(user.teamId);
        setData(stats);
      } catch (error) {
        console.error("Package statistic fetch error:", error);
      }
    };

    fetchData();
  }, []);

  if (!data || data.length === 0) {
    return <Typography>No package statistics available.</Typography>;
  }

  const chartData = {
    labels: data.map((item) => item.label),
    datasets: [
      {
        data: data.map((item) => item.count),
         backgroundColor: [
          "#FF6384", 
          "#36A2EB",
          "#FFCE56", 
          "#4BC0C0", 
          "#9966FF", 
        ],
        hoverBackgroundColor: [
          "#FF4C6D",
          "#1E90FF",
          "#FFD740",
          "#26C6DA",
          "#8C4DFF",
        ],
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          boxWidth: 20,
          padding: 15,
          font: { family: theme.typography.fontFamily },
          color: theme.palette.text.primary,
        },
      },
    },
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 350, p: 2 }}>
      <Typography
        variant="h6"
        sx={{
          textAlign: "center",
          mb: 2,
          fontWeight: "bold",
          color: "text.primary",
        }}
      >
        Package Status Distribution
      </Typography>
      <Pie data={chartData} options={options} />
    </Box>
  );
};

export default PackageStatistic;
