import type { HeatmapActivity, HeatmapCell, HeatmapMonth } from "./types";

export function getMonthRanges(startDate: Date, endDate: Date): Array<HeatmapMonth> {
  if (startDate > endDate) {
    throw new Error("startDate must be before endDate");
  }

  const result: Array<HeatmapMonth> = [];
  const current = new Date(startDate);

  while (current <= endDate) {
    const year = current.getFullYear();
    const month = current.getMonth();
    const monthName = current.toLocaleString("default", { month: "long" });
    console.log("monthName", monthName);

    const rangeStart = result.length === 0 ? new Date(startDate) : new Date(year, month, 1);

    const isLastMonth = year === endDate.getFullYear() && month === endDate.getMonth();
    const rangeEnd = isLastMonth ? new Date(endDate) : new Date(year, month + 1, 0);

    result.push({
      name: monthName,
      start: rangeStart,
      end: rangeEnd,
    });

    current.setFullYear(year, month + 1, 1);
  }

  return result;
}

export function getHeatmapMonthData(
  activities: Array<HeatmapActivity>,
  startDate: Date,
  endDate: Date
): Array<HeatmapCell> {
  if (startDate.getFullYear() !== endDate.getFullYear() || startDate.getMonth() !== endDate.getMonth()) {
    throw new Error("startDate and endDate must be in the same month");
  }

  if (startDate > endDate) {
    throw new Error("startDate must be before endDate");
  }

  const result: Array<HeatmapCell> = [];

  const activityMap: Record<string, HeatmapActivity> = {};
  activities.forEach((a) => (activityMap[a.date] = a));

  function addInvisibleCells(count: number) {
    for (let i = 0; i < count; i++) {
      result.push("invisible");
    }
  }

  function formatDate(date: Date): string {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  }

  const current = new Date(startDate);

  addInvisibleCells(current.getDay());

  while (current <= endDate) {
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

  return result;
}
