export type HeatmapActivity = {
  date: string;
  count: number;
  level: number;
};

type Props = {
  activities: Array<HeatmapActivity>;
};

function getHeatmapData(activities: Array<HeatmapActivity>): Array<HeatmapActivity | undefined> {
  const result: Array<HeatmapActivity | undefined> = [];

  const activityMap: Record<string, HeatmapActivity> = {};
  activities.forEach((a) => (activityMap[a.date] = a));

  const startDate = new Date(new Date().setFullYear(new Date().getFullYear() - 1));
  const endDate = new Date();

  function addEmptyCells(count: number) {
    for (let i = 0; i < count; i++) {
      result.push(undefined);
    }
  }

  function formatDate(date: Date): string {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  }

  const current = new Date(startDate);
  while (current < endDate) {
    addEmptyCells(current.getDay());

    const temp = new Date(current);
    while (current.getMonth() === temp.getMonth() && current <= endDate) {
      const formattedCurrentDate = formatDate(current);
      if (formattedCurrentDate in activityMap) {
        result.push(activityMap[formattedCurrentDate]);
      } else {
        result.push({
          date: formattedCurrentDate,
          count: 0,
          level: 0,
        });
      }
      current.setDate(current.getDate() + 1);
    }

    if (current.getDay() !== 0) {
      addEmptyCells(7 - current.getDay());
    }
  }

  return result;
}

export const ActivityHeatmap: React.FC<Props> = ({ activities }) => {
  if (!activities) return <div>Loading...</div>;
  const heatmapData = getHeatmapData(activities);
  const colsCount = Math.ceil(heatmapData.length / 7);

  return (
    <div>
      <div className={`grid grid-flow-col grid-cols-${colsCount} grid-rows-7 gap-2`}>
        {heatmapData.map((a, i) => {
          if (a === undefined) {
            return <div key={i} className="w-4 h-4 bg-transparent" />;
          }
          return (
            <div
              key={i}
              className={`w-4 h-4 ${
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
