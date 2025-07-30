import type { HeatmapActivity, HeatmapColor } from "./types";
import { ActivityHeatmapMonth } from "./ActivityHeatmapMonth";
import { getMonthRanges } from "./utils";

type Props = {
  title: string;
  profileLink: string;
  activities: Array<HeatmapActivity>;
  color?: HeatmapColor;
};

export const ActivityHeatmap: React.FC<Props> = ({ activities, color, title, profileLink }) => {
  const monthRanges = getMonthRanges(new Date(2024, 6, 30), new Date(2025, 6, 30));

  return (
    <div className="h-44 md:h-50 lg:h-56 flex flex-col gap-1.5">
      <div className="flex justify-between items-end">
        <div className="text-md md:text-lg">{title}</div>
        <a
          href={profileLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs md:text-sm hover:text-sky-400"
        >
          View profile {">"}
        </a>
      </div>
      <div className="overflow-x-auto pb-3">
        <div className="flex gap-2 justify-center w-fit mx-auto">
          <div className="flex gap-2">
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
        </div>
      </div>
    </div>
  );
};
