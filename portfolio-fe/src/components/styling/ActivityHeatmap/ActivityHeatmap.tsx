import type { HeatmapActivity, HeatmapColor } from "./types";
import { ActivityHeatmapMonth } from "./ActivityHeatmapMonth";
import { getMonthRanges } from "./utils";

type Props = {
  activities: Array<HeatmapActivity>;
  color?: HeatmapColor;
};

export const ActivityHeatmap: React.FC<Props> = ({ activities, color }) => {
  if (!activities) return <div>Loading...</div>;

  const monthRanges = getMonthRanges(new Date(2024, 6, 30), new Date(2025, 6, 30));

  return (
    <div className="grid grid-flow-col gap-2">
      {monthRanges.map((month) => (
        <ActivityHeatmapMonth
          activities={activities}
          monthStartDate={month.start}
          monthEndDate={month.end}
          monthName={month.name}
          color={color}
          key={month.name + month.start.toISOString()}
        />
      ))}
    </div>
  );
};
