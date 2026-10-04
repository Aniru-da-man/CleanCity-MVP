import { useState, useRef, useEffect } from "react";
import { Search, Bell, AlertTriangle, Info, CheckCircle2, CheckCheck, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { getSession } from "@/lib/auth";

type NotifPreview = {
  id: number;
  title: string;
  message: string;
  priority: "critical" | "high" | "medium" | "low";
  isRead: boolean;
  createdAt: string;
};

const PREVIEW_NOTIFS: NotifPreview[] = [
  { id: 1, title: "Critical AQI Alert — Peenya Zone",          message: "Peenya Industrial Zone AQI has exceeded 178. ARIA dispatching warnings.",    priority: "critical", isRead: false, createdAt: new Date(Date.now() - 1000 * 60 * 18).toISOString() },
  { id: 2, title: "AI Flood-Risk Forecast — Hebbal Lake",      message: "88% probability of drain overflow within 36 hours. Pre-dispatch advised.",   priority: "high",     isRead: false, createdAt: new Date(Date.now() - 1000 * 60 * 55).toISOString() },
  { id: 3, title: "HazMat Level 2 — Bannerghatta Road",        message: "Chemical odour detected by CAM-15. HazMat Response Team dispatched.",         priority: "critical", isRead: false, createdAt: new Date(Date.now() - 1000 * 60 * 120).toISOString() },
  { id: 4, title: "CCTV Grid Scheduled Maintenance",           message: "Cameras CAM-02 to CAM-06 offline tonight 02:00–04:00 IST.",                   priority: "medium",   isRead: true,  createdAt: new Date(Date.now() - 1000 * 60 * 90).toISOString() },
  { id: 5, title: "Report Ready — Q2 Environmental Summary",   message: "Your Q2 Environmental Impact report is ready for download (2.4 MB).",          priority: "low",      isRead: true,  createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString() },
];

export function Header() {
  const { toast } = useToast();
  const [location, navigate] = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifs, setNotifs] = useState(PREVIEW_NOTIFS);
  const [searchValue, setSearchValue] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifs.filter(n => !n.isRead).length;

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const getPageTitle = () => {
    switch (location) {
      case "/citizen":       return "Citizen home";
      case "/citizen/report":return "Reporting";
      case "/citizen/assistant": return "Citizen agent";
      case "/citizen/community": return "Community & rewards";
      case "/dashboard":    return "Overview";
      case "/monitoring":   return "Live monitoring";
      case "/incidents":    return "Issues";
      case "/environmental":return "Environment";
      case "/analytics":    return "Insights";
      case "/map":          return "The map";
      case "/community":    return "Community & rewards";
      case "/copilot":      return "AI assistant";
      case "/notifications":return "Notifications";
      case "/reports":      return "Reports";
      case "/profile":      return "Your profile";
      case "/settings":     return "Settings";
      case "/admin":        return "Administration";
      default:              return "CleanCity AI";
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "critical": return <AlertTriangle className="w-3.5 h-3.5 text-red-500" />;
      case "high":     return <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />;
      case "medium":   return <Info className="w-3.5 h-3.5 text-blue-400" />;
      default:         return <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />;
    }
  };

  const markAllRead = () => {
    setNotifs(n => n.map(x => ({ ...x, isRead: true })));
    toast({ title: "All notifications marked as read" });
  };

  const markOne = (id: number) => {
    setNotifs(n => n.map(x => x.id === id ? { ...x, isRead: true } : x));
  };

  const handleSearchKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchValue.trim()) {
      const q = searchValue.trim().toLowerCase();
      if (q.includes("incident") || q.includes("issue")) navigate("/incidents");
      else if (q.includes("camera") || q.includes("monitor") || q.includes("live")) navigate("/monitoring");
      else if (q.includes("map")) navigate("/map");
      else if (q.includes("report")) navigate(getSession()?.role === "citizen" ? "/citizen/report" : "/reports");
      else if (q.includes("env") || q.includes("aqi")) navigate("/environmental");
      else if (q.includes("analytics") || q.includes("insight") || q.includes("predict")) navigate("/analytics");
      else if (q.includes("assistant") || q.includes("copilot") || q.includes("ai")) navigate(getSession()?.role === "citizen" ? "/citizen/assistant" : "/copilot");
      else if (q.includes("community") || q.includes("reward")) navigate(getSession()?.role === "citizen" ? "/citizen/community" : "/community");
      else if (q.includes("setting")) navigate("/settings");
      else if (q.includes("profile")) navigate("/profile");
      else if (q.includes("admin")) navigate("/admin");
      else if (q.includes("notification") || q.includes("alert")) navigate("/notifications");
      else navigate("/dashboard");
      setSearchValue("");
    }
  };

  return (
    <header className="h-16 border-b border-white/5 bg-background/50 backdrop-blur-md flex items-center justify-between px-4 sm:px-6 shrink-0 sticky top-0 z-20">
      <div>
        <h2 className="text-lg font-semibold text-foreground">{getPageTitle()}</h2>
      </div>

      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative w-64 hidden sm:block">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Find a page or tool…"
            className="pl-9 bg-white/5 border-white/10 text-sm focus-visible:ring-1 focus-visible:ring-primary h-9"
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
            onKeyDown={handleSearchKey}
            aria-label="Find a page or tool"
          />
        </div>

        {/* Bell */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(o => !o)}
            className="relative p-2 text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-white/5"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-[9px] font-bold text-white">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </button>

          {/* Dropdown */}
          {dropdownOpen && (
            <div className="absolute right-0 top-12 z-50 w-[360px] glass-panel border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
              {/* Header */}
              <div className="px-4 py-3 border-b border-white/5 bg-black/30 flex items-center justify-between">
                <h3 className="font-semibold text-sm text-foreground flex items-center gap-2">
                  <Bell className="w-4 h-4 text-primary" /> Notifications
                  {unreadCount > 0 && (
                    <span className="bg-primary/20 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full border border-primary/30">
                      {unreadCount} new
                    </span>
                  )}
                </h3>
                <div className="flex items-center gap-2">
                  {unreadCount > 0 && (
                    <button onClick={markAllRead} className="text-[10px] text-primary hover:text-primary/80 flex items-center gap-1 transition-colors">
                      <CheckCheck className="w-3 h-3" /> Mark all read
                    </button>
                  )}
                  <button onClick={() => setDropdownOpen(false)} className="p-1 text-muted-foreground hover:text-white transition-colors">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Notification list */}
              <div className="max-h-80 overflow-y-auto divide-y divide-white/5">
                {notifs.map(notif => (
                  <div
                    key={notif.id}
                    onClick={() => { markOne(notif.id); }}
                    className={cn(
                      "flex gap-3 px-4 py-3 cursor-pointer transition-colors hover:bg-white/[0.03] relative",
                      !notif.isRead && "bg-primary/5"
                    )}
                  >
                    {!notif.isRead && <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary" />}
                    <div className="mt-0.5 shrink-0">{getPriorityIcon(notif.priority)}</div>
                    <div className="flex-1 min-w-0">
                      <p className={cn("text-xs font-semibold leading-snug truncate", !notif.isRead ? "text-white" : "text-slate-400")}>
                        {notif.title}
                      </p>
                      <p className="text-[11px] text-muted-foreground mt-0.5 line-clamp-2 leading-relaxed">{notif.message}</p>
                      <p className="text-[10px] text-muted-foreground/60 mt-1 font-mono">
                        {format(new Date(notif.createdAt), "MMM dd, HH:mm")}
                      </p>
                    </div>
                    {!notif.isRead && <div className="w-2 h-2 rounded-full bg-primary shrink-0 mt-1.5" />}
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="px-4 py-3 border-t border-white/5 bg-black/20">
                <button
                  onClick={() => { setDropdownOpen(false); navigate("/notifications"); }}
                  className="w-full text-center text-xs text-primary hover:text-primary/80 font-medium transition-colors py-1"
                >
                  View all notifications →
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
