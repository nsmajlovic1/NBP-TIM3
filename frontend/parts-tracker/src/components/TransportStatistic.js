import { useEffect, useState } from "react";
import StatisticChart from "./StatisticChart";
import { getTransportStatistic } from "../services/transportService";

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

  return (
    <StatisticChart
      title="Transport Status Distribution"
      data={data}
      backgroundColors={["#FF6B6B", "#FFD93D", "#6BCB77", "#4D96FF", "#843b62"]}
      hoverBackgroundColors={["#FF4C4C", "#FFC700", "#51B56D", "#2F80ED", "#6A2E50"]}
    />
  );
};

export default TransportStatistic;
