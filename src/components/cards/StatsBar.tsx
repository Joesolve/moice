import { BadgeCheck, Building2, Database, Users } from "lucide-react";

const stats = [
  {
    label: "Verified Data Points",
    value: "142",
    icon: BadgeCheck,
    color: "text-sl-green-600",
    bg: "bg-sl-green-50",
  },
  {
    label: "Contributing Ministries",
    value: "6",
    icon: Building2,
    color: "text-sl-blue-600",
    bg: "bg-sl-blue-50",
  },
  {
    label: "Data Categories",
    value: "6",
    icon: Database,
    color: "text-sl-green-600",
    bg: "bg-sl-green-50",
  },
  {
    label: "Citizens Served",
    value: "8M+",
    icon: Users,
    color: "text-sl-blue-600",
    bg: "bg-sl-blue-50",
  },
];

export default function StatsBar() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="flex items-center gap-3 rounded-xl border border-sl-gray-200 bg-white p-4 shadow-sm"
        >
          <div className={`rounded-lg ${stat.bg} p-2.5`}>
            <stat.icon className={`h-5 w-5 ${stat.color}`} />
          </div>
          <div>
            <p className="text-xl font-bold text-sl-gray-900">{stat.value}</p>
            <p className="text-xs text-sl-gray-500">{stat.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
