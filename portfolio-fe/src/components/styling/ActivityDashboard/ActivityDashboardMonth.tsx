type Props = {
  year: number;
  month: number; // 1 -> Jan
  day: number;
};

export const ActivityDashboardMonth: React.FC<Props> = ({ year, month, day }) => {
  return <div className={"w-4 h-4 bg-green-300 rounded-sm"} />;
};
