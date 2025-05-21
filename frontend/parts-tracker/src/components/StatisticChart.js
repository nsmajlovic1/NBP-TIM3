import { Box, Typography } from "@mui/material";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import theme from "../theme";

ChartJS.register(ArcElement, Tooltip, Legend);

const StatisticChart = ({ title, data, backgroundColors, hoverBackgroundColors }) => {
  if (!data || data.length === 0) {
    return <Typography>No data available.</Typography>;
  }

  const chartData = {
    labels: data.map((item) => item.label),
    datasets: [
      {
        data: data.map((item) => item.count),
        backgroundColor: backgroundColors,
        hoverBackgroundColor: hoverBackgroundColors,
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
        {title}
      </Typography>
      <Pie data={chartData} options={options} />
    </Box>
  );
};

export default StatisticChart;
