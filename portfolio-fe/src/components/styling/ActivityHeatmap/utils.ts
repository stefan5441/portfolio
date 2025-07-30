import type { HeatmapActivity, HeatmapCell } from "./types";

export function getHeatmapData(activities: Array<HeatmapActivity>): Array<HeatmapCell> {
  const result: Array<HeatmapCell> = [];

  const activityMap: Record<string, HeatmapActivity> = {};
  activities.forEach((a) => (activityMap[a.date] = a));

  const startDate = new Date(new Date().setFullYear(new Date().getFullYear() - 1));
  const endDate = new Date();

  function addInvisibleCells(count: number) {
    for (let i = 0; i < count; i++) {
      result.push("invisible");
    }
  }

  function addMonthSeparator() {
    for (let i = 0; i < 7; i++) {
      result.push("month-separator");
    }
  }

  function formatDate(date: Date): string {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  }

  const current = new Date(startDate);
  let isFirstMonth = true;
  while (current < endDate) {
    if (!isFirstMonth) {
      addMonthSeparator();
    }
    isFirstMonth = false;

    addInvisibleCells(current.getDay());

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
      addInvisibleCells(7 - current.getDay());
    }
  }

  return result;
}
