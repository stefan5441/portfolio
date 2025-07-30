import type { HeatmapActivity } from "./types";
import { ActivityHeatmapMonth } from "./ActivityHeatmapMonth";
import { getMonthRanges } from "./utils";

type Props = {
  activities: Array<HeatmapActivity>;
};

export const ActivityHeatmap: React.FC<Props> = ({ activities }) => {
  if (!activities) return <div>Loading...</div>;

  const monthRanges = getMonthRanges(
    new Date(2024, 6, 30), // 30 July 2024 (month is 0-based: 6 = July)
    new Date(2025, 6, 30) // 30 July 2025
  );
  console.log(monthRanges);
  return (
    <div className="grid grid-flow-col">
      {monthRanges.map((month) => (
        <ActivityHeatmapMonth
          activities={activities}
          monthStartDate={month.start}
          monthEndDate={month.end}
          month={month.name}
        />
      ))}
    </div>
  );
};
