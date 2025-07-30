import { Tooltip } from "../Tooltip";
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
    <div className="flex flex-col items-center gap-1">
      <div className="grid grid-rows-7 grid-flow-col gap-0.5">
        {heatmapMonthData.map((a, i) => {
          if (a === "invisible") {
            return <div key={i} className="w-3 h-3 bg-transparent" />;
          }
          return (
            <Tooltip key={i} content={`${a.count} ${a.count === 1 ? "activity" : "activities"} on ${a.date}`}>
              <div
                key={i}
                className={`w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5  hover:border-2 hover:border-sky-100 rounded-xs lg:rounded-sm ${
                  levelToBg[a.level][color ?? "green"]
                }`}
              />
            </Tooltip>
          );
        })}
      </div>
      {columnCount >= 3 && <div className="text-xs md:text-sm">{monthName.slice(0, 3)}</div>}
    </div>
  );
};
