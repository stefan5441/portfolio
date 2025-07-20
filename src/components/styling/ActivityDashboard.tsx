function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getMonthStartDay(year: number, month: number) {
  const jsDay = new Date(year, month, 1).getDay();
  return (jsDay + 6) % 7; // Monday=0
}

export const ActivityDashboard: React.FC = () => {
  return (
    <div>
      <div className="grid grid-cols-12 grid-rows-1 gap-1">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="w-24 h-36 rounded-sm grid grid-cols-5 grid-rows-7 gap-1 grid-flow-col">
            {Array.from({ length: 35 }).map((_, i) => (
              <div key={i} className="w-4 h-4 bg-green-300 rounded-sm" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
