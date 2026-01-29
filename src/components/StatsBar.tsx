interface StatItemProps {
  label: string;
  value: string | number;
  sublabel?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

function StatItem({ label, value, sublabel, trend }: StatItemProps) {
  return (
    <div className="bg-[#0f0f0f] border border-[#1a1a1a] rounded-lg p-5">
      <p className="text-[10px] text-[#525252] font-mono tracking-wider mb-2">{label}</p>
      <div className="flex items-baseline gap-2">
        <p className="text-3xl font-mono font-medium text-white">{value}</p>
        {trend && (
          <span
            className={`text-xs font-mono ${
              trend.isPositive ? "text-emerald-400" : "text-red-400"
            }`}
          >
            {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
          </span>
        )}
      </div>
      {sublabel && <p className="text-xs text-[#525252] mt-1">{sublabel}</p>}
    </div>
  );
}

export default function StatsBar() {
  const stats: StatItemProps[] = [
    {
      label: "TOTAL EMPLOYEES",
      value: 4,
      sublabel: "Active AI team members",
    },
    {
      label: "MESSAGES THIS WEEK",
      value: 247,
      trend: { value: 12, isPositive: true },
    },
    {
      label: "TASKS COMPLETED",
      value: 38,
      trend: { value: 8, isPositive: true },
    },
    {
      label: "TIME SAVED",
      value: "24h",
      sublabel: "This week",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <StatItem key={stat.label} {...stat} />
      ))}
    </div>
  );
}
