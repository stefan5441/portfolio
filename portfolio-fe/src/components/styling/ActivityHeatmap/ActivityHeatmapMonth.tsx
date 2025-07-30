import type { HeatmapActivity, HeatmapColor } from "./types";
import { getHeatmapMonthData, levelToBg } from "./utils";

type Props = {
  monthName: string;
  activities: Array<HeatmapActivity>;
  monthStartDate: Date;
  monthEndDate: Date;
  color?: HeatmapColor;
};

export const ActivityHeatmapMonth: React.FC<Props> = ({
  activities,
  monthStartDate,
  monthEndDate,
  monthName,
  color,
}) => {
  const heatmapMonthData = getHeatmapMonthData(activities, monthStartDate, monthEndDate);
  const columnCount = Math.ceil(heatmapMonthData.length / 7);

  return (
    <div className="flex flex-col items-center">
      <div className="grid grid-rows-7 grid-flow-col gap-1">
        {heatmapMonthData.map((a, i) => {
          if (a === "invisible") {
            return <div key={i} className="w-4 h-4 bg-transparent" />;
          }
          return (
            <div
              key={i}
              className={`w-4 h-4 rounded-xs ${levelToBg[a.level][color ?? "green"]}`}
              title={`${a.date}: ${a.count}`}
            />
          );
        })}
      </div>
      {columnCount >= 3 && <div className="mt-1">{monthName.slice(0, 3)}</div>}
    </div>
  );
};
