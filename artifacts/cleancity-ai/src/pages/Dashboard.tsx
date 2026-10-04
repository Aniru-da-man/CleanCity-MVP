import { Link } from "wouter";
import { useGetDashboardSummary } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertTriangle,
  ArrowUpRight,
  Activity,
  CheckCircle2,
  ChevronRight,
  Wind,
} from "lucide-react";
import {
  DEMO_INCIDENTS,
} from "@/lib/demo-data";
import { cn } from "@/lib/utils";

const fallbackDashboardData = {
  totalIncidents: 124,
  resolvedToday: 45,
  activeAlerts: 12,
  avgAqi: 42,
  civicPoints: 8540,
  camerasOnline: 142,
  incidentsByType: [
    { type: "Waste Overflow", count: 45 },
    { type: "Graffiti", count: 22 },
    { type: "Pothole", count: 18 },
    { type: "Streetlight", count: 12 },
    { type: "Illegal Dumping", count: 27 },
  ],
  weeklyTrend: [
    { label: "Mon", value: 12 },
    { label: "Tue", value: 18 },
    { label: "Wed", value: 24 },
    { label: "Thu", value: 15 },
    { label: "Fri", value: 30 },
    { label: "Sat", value: 10 },
    { label: "Sun", value: 15 },
  ],
};

const priorityIssues = DEMO_INCIDENTS
  .filter((incident) => incident.severity === "critical" || incident.severity === "high")
  .slice(0, 4);

function formatStatus(status: string) {
  return status.replace("_", " ").replace("-", " ");
}

function getUrbanStatus(aqi: number) {
  if (aqi <= 50) {
    return {
      label: "Healthy",
      detail: "Cleanliness and air quality are within target range.",
      color: "text-emerald-400",
      dot: "bg-emerald-400",
      bar: "bg-emerald-400",
    };
  }

  if (aqi <= 100) {
    return {
      label: "Stable",
      detail: "Conditions are steady, with a few areas to monitor.",
      color: "text-cyan-400",
      dot: "bg-cyan-400",
      bar: "bg-cyan-400",
    };
  }

  return {
    label: "Needs attention",
    detail: "Teams should prioritise elevated pollution and issue hotspots.",
    color: "text-amber-400",
    dot: "bg-amber-400",
    bar: "bg-amber-400",
  };
}

export function Dashboard() {
  const { data, isLoading } = useGetDashboardSummary();
  const dashboardData = data || fallbackDashboardData;
  const urbanStatus = getUrbanStatus(dashboardData.avgAqi);
  const maxTrendValue = Math.max(...dashboardData.weeklyTrend.map((day) => day.value), 1);
  const resolutionRate = dashboardData.totalIncidents
    ? Math.round((dashboardData.resolvedToday / dashboardData.totalIncidents) * 100)
    : 0;

  return (
    <div className="max-w-7xl mx-auto space-y-8 p-5 sm:p-6 md:p-8 animate-in fade-in duration-500">
      <header className="flex flex-col gap-5 border-b border-white/8 pb-7 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.18em] text-primary">
            Bengaluru · Command overview
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Dashboard
          </h1>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">
            A clear view of the issues that need action today.
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className={cn("h-2 w-2 rounded-full", urbanStatus.dot)} />
          Live city data
        </div>
      </header>

      <section aria-label="Key issue metrics" className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="Total civic issues"
          value={dashboardData.totalIncidents}
          note="Reported across the city"
          icon={AlertTriangle}
          iconClass="text-amber-400"
          isLoading={isLoading}
        />
        <MetricCard
          label="Needs attention"
          value={dashboardData.activeAlerts}
          note="Open or in progress"
          icon={Activity}
          iconClass="text-rose-400"
          isLoading={isLoading}
          href="/incidents"
        />
        <MetricCard
          label="Resolved today"
          value={dashboardData.resolvedToday}
          note={`${resolutionRate}% of today's reported volume`}
          icon={CheckCircle2}
          iconClass="text-emerald-400"
          isLoading={isLoading}
          href="/incidents"
        />
        <MetricCard
          label="Average AQI"
          value={dashboardData.avgAqi}
          note="Citywide air quality index"
          icon={Wind}
          iconClass={urbanStatus.color}
          isLoading={isLoading}
          href="/environmental"
        />
      </section>

      <section className="grid grid-cols-1 gap-5 lg:grid-cols-[1.45fr_0.85fr]">
        <div className="rounded-2xl border border-white/8 bg-[#0c1322] p-5 sm:p-6">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <h2 className="text-base font-semibold text-foreground">Issue activity</h2>
              <p className="mt-1 text-sm text-muted-foreground">Reports received over the last 7 days</p>
            </div>
            <Link
              href="/analytics"
              className="hidden items-center gap-1 text-xs font-medium text-primary transition-colors hover:text-cyan-300 sm:flex"
            >
              View analytics <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="h-[220px] w-full">
            {isLoading ? (
              <Skeleton className="h-full w-full rounded-lg bg-white/5" />
            ) : (
              <div
                className="flex h-full items-end gap-2 border-b border-white/8 px-1 pb-0 sm:gap-4"
                aria-label="Seven day issue activity bar chart"
              >
                {dashboardData.weeklyTrend.map((day, index) => (
                  <div key={day.label} className="group flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-2">
                    <div className="relative flex h-full w-full items-end justify-center">
                      <span className="pointer-events-none absolute -top-5 rounded bg-[#182235] px-1.5 py-0.5 text-[10px] text-slate-200 opacity-0 transition-opacity group-hover:opacity-100">
                        {day.value}
                      </span>
                      <div
                        className={cn(
                          "w-full max-w-10 rounded-t-md transition-all group-hover:bg-primary",
                          index === dashboardData.weeklyTrend.length - 1 ? "bg-primary" : "bg-primary/35",
                        )}
                        style={{ height: `${Math.max((day.value / maxTrendValue) * 160, 8)}px` }}
                      />
                    </div>
                    <span className="text-[11px] text-muted-foreground">{day.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-primary" />
            Today
            <span className="ml-3 h-2 w-2 rounded-full bg-primary/40" />
            Previous days
          </div>
        </div>

        <div className="rounded-2xl border border-white/8 bg-[#0c1322] p-5 sm:p-6">
          <div className="mb-5">
            <h2 className="text-base font-semibold text-foreground">Urban health</h2>
            <p className="mt-1 text-sm text-muted-foreground">Current cleanliness outlook</p>
          </div>

          <div className="rounded-xl border border-white/8 bg-[#101a2b] p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className={cn("mb-1 flex items-center gap-2 text-lg font-semibold", urbanStatus.color)}>
                  <span className={cn("h-2.5 w-2.5 rounded-full", urbanStatus.dot)} />
                  {urbanStatus.label}
                </div>
                <p className="max-w-xs text-xs leading-relaxed text-muted-foreground">
                  {urbanStatus.detail}
                </p>
              </div>
              <div className="text-right">
                {isLoading ? (
                  <Skeleton className="ml-auto h-9 w-14 bg-white/10" />
                ) : (
                  <div className="text-3xl font-semibold tracking-tight text-foreground">{dashboardData.avgAqi}</div>
                )}
                <div className="text-[11px] text-muted-foreground">AQI</div>
              </div>
            </div>
            <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-white/10">
              <div
                className={cn("h-full rounded-full transition-all", urbanStatus.bar)}
                style={{ width: `${Math.min(dashboardData.avgAqi, 150) / 1.5}%` }}
              />
            </div>
            <div className="mt-2 flex justify-between text-[11px] text-muted-foreground">
              <span>Good</span>
              <span>Moderate</span>
              <span>Elevated</span>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3 border-t border-white/8 pt-5">
            <div>
              <div className="text-lg font-semibold text-foreground">
                {isLoading ? <Skeleton className="h-6 w-12 bg-white/10" /> : `${dashboardData.camerasOnline}`}
              </div>
              <div className="mt-1 text-xs text-muted-foreground">Cameras online</div>
            </div>
            <div>
              <div className="text-lg font-semibold text-foreground">198</div>
              <div className="mt-1 text-xs text-muted-foreground">Wards monitored</div>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-white/8 bg-[#0c1322]">
        <div className="flex items-center justify-between gap-4 border-b border-white/8 px-5 py-5 sm:px-6">
          <div>
            <h2 className="text-base font-semibold text-foreground">High-priority issues</h2>
            <p className="mt-1 text-sm text-muted-foreground">The issues most likely to need immediate action</p>
          </div>
          <Link
            href="/incidents"
            className="flex shrink-0 items-center gap-1 text-xs font-medium text-primary transition-colors hover:text-cyan-300"
          >
            <span className="hidden sm:inline">All issues</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="divide-y divide-white/6">
          {priorityIssues.map((issue) => (
            <Link
              key={issue.id}
              href="/incidents"
              className="group flex items-center gap-3 px-5 py-4 transition-colors hover:bg-white/[0.025] sm:gap-4 sm:px-6"
            >
              <span
                className={cn(
                  "h-2 w-2 shrink-0 rounded-full",
                  issue.severity === "critical" ? "bg-rose-400" : "bg-amber-400",
                )}
              />
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-medium text-foreground group-hover:text-primary">
                  {issue.title}
                </div>
                <div className="mt-1 truncate text-xs text-muted-foreground">
                  {issue.location}
                </div>
              </div>
              <span className="hidden text-xs capitalize text-muted-foreground md:block">
                {issue.type}
              </span>
              <span
                className={cn(
                  "rounded-full border px-2.5 py-1 text-[10px] font-medium capitalize",
                  issue.severity === "critical"
                    ? "border-rose-400/20 bg-rose-400/10 text-rose-300"
                    : "border-amber-400/20 bg-amber-400/10 text-amber-300",
                )}
              >
                {issue.severity}
              </span>
              <span className="hidden w-20 text-right text-xs capitalize text-muted-foreground sm:block">
                {formatStatus(issue.status)}
              </span>
              <ArrowUpRight className="h-4 w-4 shrink-0 text-slate-600 transition-colors group-hover:text-primary" />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

interface MetricCardProps {
  label: string;
  value: number;
  note: string;
  icon: typeof AlertTriangle;
  iconClass: string;
  isLoading: boolean;
  href?: string;
}

function MetricCard({ label, value, note, icon: Icon, iconClass, isLoading, href }: MetricCardProps) {
  const content = (
    <>
      <div className="mb-5 flex items-center justify-between gap-3">
        <span className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">{label}</span>
        <Icon className={cn("h-4 w-4", iconClass)} />
      </div>
      {isLoading ? (
        <Skeleton className="h-10 w-20 bg-white/10" />
      ) : (
        <div className="text-4xl font-semibold tracking-tight text-foreground">{value.toLocaleString()}</div>
      )}
      <div className="mt-3 text-xs text-muted-foreground">{note}</div>
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="group rounded-2xl border border-white/8 bg-[#0c1322] p-5 transition-colors hover:border-primary/30 hover:bg-[#0e1728]"
      >
        {content}
      </Link>
    );
  }

  return <div className="rounded-2xl border border-white/8 bg-[#0c1322] p-5">{content}</div>;
}