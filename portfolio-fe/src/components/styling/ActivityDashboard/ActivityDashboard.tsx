import { ActivityDashboardMonth } from "./ActivityDashboardMonth";

export const ActivityDashboard: React.FC = () => {
  return (
    <div>
      <div className="grid grid-cols-12 grid-rows-1 gap-2">
        {months.map((month, i) => {
          return (
            <div key={i} className="w-24 h-36 rounded-xs grid grid-cols-5 grid-rows-7 gap-1 grid-flow-col">
              {Array.from({ length: 35 }).map((_, i) => (
                <ActivityDashboardMonth key={i} />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};
