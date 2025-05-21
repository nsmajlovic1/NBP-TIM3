import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import theme from "../theme";
import { getTransportStatistic } from "../services/transportService";

ChartJS.register(ArcElement, Tooltip, Legend);

const TransportStatistic = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const stats = await getTransportStatistic();
        setData(stats);
      } catch (error) {
        console.error("Transport statistic fetch error:", error);
      }
    };

    fetchData();
  }, []);

  if (!data || data.length === 0) {
    return <Typography>No transport statistics available.</Typography>;
  }

  const chartData = {
    labels: data.map((item) => item.label),
    datasets: [
      {
        data: data.map((item) => item.count),
        backgroundColor: [
          "#FF6B6B", 
          "#FFD93D", 
          "#6BCB77", 
          "#4D96FF", 
          "#843b62", 
        ],

        hoverBackgroundColor: [
          "#FF4C4C", 
          "#FFC700", 
          "#51B56D", 
          "#2F80ED", 
          "#6A2E50", 
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
        Transport Status Distribution
      </Typography>
      <Pie data={chartData} options={options} />
    </Box>
  );
};

export default TransportStatistic;
