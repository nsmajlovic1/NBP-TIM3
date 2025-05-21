import { useEffect, useState } from "react";
import StatisticChart from "./StatisticChart";
import { getCarPartsStatistic } from "../services/carPartService";

const CarPartStatistic = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const stats = await getCarPartsStatistic();
        setData(stats);
      } catch (error) {
        console.error("Car parts statistic fetch error:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <StatisticChart
      title="Car Parts Status Distribution"
      data={data}
      backgroundColors={["#FF6B6B", "#FFD93D", "#6BCB77", "#4D96FF", "#843b62"]}
      hoverBackgroundColors={["#FF4C4C", "#FFC700", "#51B56D", "#2F80ED", "#6A2E50"]}
    />
  );
};

export default CarPartStatistic;
