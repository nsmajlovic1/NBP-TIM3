import { useEffect, useState } from "react";
import StatisticChart from "./StatisticChart";
import { getPackagesStatistic } from "../services/packageService";

const PackageStatistic = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const stats = await getPackagesStatistic();
        setData(stats);
      } catch (error) {
        console.error("Package statistic fetch error:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <StatisticChart
      title="Package Status Distribution"
      data={data}
      backgroundColors={["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"]}
      hoverBackgroundColors={["#FF4C6D", "#1E90FF", "#FFD740", "#26C6DA", "#8C4DFF"]}
    />
  );
};

export default PackageStatistic;
