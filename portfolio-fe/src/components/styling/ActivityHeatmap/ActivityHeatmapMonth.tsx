import type { HeatmapActivity } from "./types";
import { getHeatmapMonthData } from "./utils";

type Props = {
  month: string;
  activities: Array<HeatmapActivity>;
  monthStartDate: Date;
  monthEndDate: Date;
};

export const ActivityHeatmapMonth: React.FC<Props> = ({ activities, monthStartDate, monthEndDate }) => {
  const heatmapMonthData = getHeatmapMonthData(activities, monthStartDate, monthEndDate);

  return (
    <div className="grid grid-rows-7 grid-flow-col gap-1">
      {heatmapMonthData.map((a, i) => {
        if (a === "invisible") {
          return <div key={i} className="w-4 h-4 bg-transparent" />;
        }
        return (
          <div
            key={i}
            className={`w-4 h-4 rounded-xs ${
              a.level === 0
                ? "bg-gray-200"
                : a.level === 1
                ? "bg-green-200"
                : a.level === 2
                ? "bg-green-400"
                : a.level === 3
                ? "bg-green-600"
                : "bg-green-800"
            }`}
            title={`${a.date}: ${a.count}`}
          />
        );
      })}
    </div>
  );
};
