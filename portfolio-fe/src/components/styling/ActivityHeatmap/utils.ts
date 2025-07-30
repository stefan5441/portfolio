import type { HeatmapActivity, HeatmapCell, HeatmapColor, HeatmapMonth } from "./types";

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

  function formatKey(date: Date): string {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  }

  function formatDisplay(date: Date): string {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  const current = new Date(startDate);
  addInvisibleCells(current.getDay());

  while (current <= endDate) {
    const key = formatKey(current);
    const displayDate = formatDisplay(current);

    if (key in activityMap) {
      result.push({
        ...activityMap[key],
        date: displayDate,
      });
    } else {
      result.push({
        date: displayDate,
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

export const levelToBg: Record<number, Record<HeatmapColor, string>> = {
  0: {
    red: "bg-zinc-700",
    orange: "bg-zinc-700",
    amber: "bg-zinc-700",
    yellow: "bg-zinc-700",
    lime: "bg-zinc-700",
    green: "bg-zinc-700",
    emerald: "bg-zinc-700",
    teal: "bg-zinc-700",
    cyan: "bg-zinc-700",
    sky: "bg-zinc-700",
    blue: "bg-zinc-700",
    indigo: "bg-zinc-700",
    violet: "bg-zinc-700",
    purple: "bg-zinc-700",
    fuchsia: "bg-zinc-700",
    pink: "bg-zinc-700",
    rose: "bg-zinc-700",
  },
  1: {
    red: "bg-red-900",
    orange: "bg-orange-900",
    amber: "bg-amber-900",
    yellow: "bg-yellow-900",
    lime: "bg-lime-900",
    green: "bg-green-900",
    emerald: "bg-emerald-900",
    teal: "bg-teal-900",
    cyan: "bg-cyan-900",
    sky: "bg-sky-900",
    blue: "bg-blue-900",
    indigo: "bg-indigo-900",
    violet: "bg-violet-900",
    purple: "bg-purple-900",
    fuchsia: "bg-fuchsia-900",
    pink: "bg-pink-900",
    rose: "bg-rose-900",
  },
  2: {
    red: "bg-red-700",
    orange: "bg-orange-700",
    amber: "bg-amber-700",
    yellow: "bg-yellow-700",
    lime: "bg-lime-700",
    green: "bg-green-700",
    emerald: "bg-emerald-700",
    teal: "bg-teal-700",
    cyan: "bg-cyan-700",
    sky: "bg-sky-700",
    blue: "bg-blue-700",
    indigo: "bg-indigo-700",
    violet: "bg-violet-700",
    purple: "bg-purple-700",
    fuchsia: "bg-fuchsia-700",
    pink: "bg-pink-700",
    rose: "bg-rose-700",
  },
  3: {
    red: "bg-red-500",
    orange: "bg-orange-500",
    amber: "bg-amber-500",
    yellow: "bg-yellow-500",
    lime: "bg-lime-500",
    green: "bg-green-500",
    emerald: "bg-emerald-500",
    teal: "bg-teal-500",
    cyan: "bg-cyan-500",
    sky: "bg-sky-500",
    blue: "bg-blue-500",
    indigo: "bg-indigo-500",
    violet: "bg-violet-500",
    purple: "bg-purple-500",
    fuchsia: "bg-fuchsia-500",
    pink: "bg-pink-500",
    rose: "bg-rose-500",
  },
  4: {
    red: "bg-red-300",
    orange: "bg-orange-300",
    amber: "bg-amber-300",
    yellow: "bg-yellow-300",
    lime: "bg-lime-300",
    green: "bg-green-300",
    emerald: "bg-emerald-300",
    teal: "bg-teal-300",
    cyan: "bg-cyan-300",
    sky: "bg-sky-300",
    blue: "bg-blue-300",
    indigo: "bg-indigo-300",
    violet: "bg-violet-300",
    purple: "bg-purple-300",
    fuchsia: "bg-fuchsia-300",
    pink: "bg-pink-300",
    rose: "bg-rose-300",
  },
};
