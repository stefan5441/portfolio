import { getHeatmapData } from "./utils";
import type { HeatmapActivity } from "./types";

type Props = {
  activities: Array<HeatmapActivity>;
};

export const ActivityHeatmap: React.FC<Props> = ({ activities }) => {
  if (!activities) return <div>Loading...</div>;

  const heatmapData = getHeatmapData(activities);

  return (
    <div>
      <div className="grid grid-rows-7 grid-flow-col gap-1">
        {heatmapData.map((a, i) => {
          if (a === "invisible") {
            return <div key={i} className="w-4 h-4 bg-transparent" />;
          }
          if (a === "month-separator") {
            return <div key={i} className="w-1 h-4 bg-transparent" />;
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
    </div>
  );
};
