import { LucideIcon } from "lucide-react";

interface CardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: number;
  trendLabel?: string;
}

export default function DashboardCard({
  title,
  value,
  icon: Icon,
  trend,
  trendLabel,
}: CardProps) {
  const isPositive = trend !== undefined && trend >= 0;
  return (
    <div className="card flex items-start justify-between gap-4 w-56   ">
      {/* Title + Value */}
      <div className="flex flex-col gap-1 ">
        <p className="text-xs font-meduim text-gray-400 uppercase tracking-wide">
          {title}
        </p>
        <p className="text-2xl font-semibold text-gray-900">{value}</p>
        {trend !== undefined && (
          <p
            className={`text-xs font-medium ${isPositive ? "text-success" : "text-danger"}`}
          >
            {isPositive ? "+" : ""}
            {trend}% {trendLabel ?? "vs last month"}
          </p>
        )}
      </div>

      {/* Icon */}
      <div className="w-10 h-10  rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
        <Icon className="w-5 h-5 text-accent " />
      </div>
    </div>
  );
}
