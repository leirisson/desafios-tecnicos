import { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: number;
  icon: LucideIcon;
  dotColor: string;
  valueColor: string;
  iconBg: string;
}

export default function StatCard({
  label,
  value,
  icon: Icon,
  dotColor,
  valueColor,
  iconBg,
}: StatCardProps) {
  return (
    <div className="flex flex-1 items-start justify-between rounded-xl border border-border bg-surface p-6 shadow-[var(--shadow-card)]">
      <div>
        <div className="flex items-center gap-2">
          <span className={`h-2.5 w-2.5 rounded-full ${dotColor}`} />
          <span className="text-xs font-semibold uppercase tracking-wide text-text-tertiary">
            {label}
          </span>
        </div>
        <p className={`mt-4 text-4xl font-bold ${valueColor}`}>{value}</p>
      </div>
      <span className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full ${iconBg}`}>
        <Icon className={`h-7 w-7 ${valueColor}`} />
      </span>
    </div>
  );
}
