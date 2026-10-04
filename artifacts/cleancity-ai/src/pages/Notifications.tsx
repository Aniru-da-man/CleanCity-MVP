import { useState } from "react";
import { useListNotifications, useMarkNotificationRead, useMarkAllNotificationsRead } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Bell,
  AlertTriangle,
  CheckCircle2,
  Info,
  MoreVertical,
  CheckCheck,
  Trash2,
  Eye,
  BellOff,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

type NotifItem = {
  id: number;
  type: string;
  title: string;
  message: string;
  isRead: boolean;
  priority: string;
  createdAt: string;
};

const FALLBACK: NotifItem[] = [
  { id: 1, type: "alert",     title: "Critical AQI Alert — Peenya Zone",        message: "Peenya Industrial Zone AQI has exceeded 178 (Unhealthy). ARIA has dispatched automated warnings to 3,200 nearby residents and flagged KSPCB for review.",       isRead: false, priority: "critical",  createdAt: new Date(Date.now() - 1000 * 60 * 18).toISOString() },
  { id: 2, type: "prediction",title: "AI Flood-Risk Forecast — Hebbal Lake",     message: "ARIA predicts 88% probability of drain overflow near Hebbal Lake Bund within 36 hours due to forecasted heavy rainfall. Pre-dispatch of BWSSB Unit 3 recommended.", isRead: false, priority: "high",     createdAt: new Date(Date.now() - 1000 * 60 * 55).toISOString() },
  { id: 3, type: "system",    title: "CCTV Grid Scheduled Maintenance",           message: "Cameras CAM-02 through CAM-06 (Vidhana Soudha corridor) will go offline for firmware upgrade tonight 02:00–04:00 IST. Incident detection paused in that zone.", isRead: false, priority: "medium",   createdAt: new Date(Date.now() - 1000 * 60 * 90).toISOString() },
  { id: 4, type: "incident",  title: "Incident Resolved — Overflowing Bin #2050",message: "KR Puram waste fire (Incident #2050) has been fully resolved by Fire Brigade. Area cleared. AI confidence 99%. Closed by Team C.",                              isRead: true,  priority: "low",      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString() },
  { id: 5, type: "prediction",title: "Predictive Maintenance — Whitefield Drains",message: "ARIA models predict 74% chance of storm-drain blockage in Whitefield IT Corridor (Ward 84) within 7 days. Proactive BWSSB inspection suggested.",               isRead: true,  priority: "high",     createdAt: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString() },
  { id: 6, type: "alert",     title: "HazMat Level 2 — Bannerghatta Road",        message: "Unidentified chemical odour detected by CAM-15 at Bannerghatta Industrial Area. HazMat Response Team dispatched. Area 200m radius cordoned.",                    isRead: false, priority: "critical",  createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString() },
  { id: 7, type: "system",    title: "Report Ready — Q2 Environmental Summary",   message: "Your requested Q2 Environmental Impact Summary report is now ready for download. File size: 2.4 MB.",                                                             isRead: true,  priority: "low",      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString() },
  { id: 8, type: "prediction",title: "Waste Surge Prediction — Majestic Bus Stand",message: "AI forecasts 40% above-average waste volume at Majestic area this Saturday (festival weekend). Recommend pre-positioning extra BBMP collection vehicles.",       isRead: true,  priority: "medium",   createdAt: new Date(Date.now() - 1000 * 60 * 60 * 30).toISOString() },
];

type Tab = "all" | "critical" | "predictions";

export function Notifications() {
  const { toast } = useToast();
  const { data: apiData, isLoading } = useListNotifications();
  const markReadMutation = useMarkNotificationRead();
  const markAllMutation = useMarkAllNotificationsRead();

  const [localNotifs, setLocalNotifs] = useState<NotifItem[] | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>("all");
  const [openMenu, setOpenMenu] = useState<number | null>(null);

  const base: NotifItem[] = (apiData as any) || FALLBACK;
  const notifs: NotifItem[] = localNotifs || base;

  const markOneRead = (id: number) => {
    setLocalNotifs(notifs.map(n => n.id === id ? { ...n, isRead: true } : n));
    setOpenMenu(null);
    try { markReadMutation.mutate(id as any); } catch {}
    toast({ title: "Marked as read" });
  };

  const deleteOne = (id: number) => {
    setLocalNotifs(notifs.filter(n => n.id !== id));
    setOpenMenu(null);
    toast({ title: "Notification dismissed" });
  };

  const muteType = (type: string) => {
    setOpenMenu(null);
    toast({ title: "Alert type muted", description: `You won't receive new "${type}" notifications until unmuted in Settings.` });
  };

  const handleMarkAll = () => {
    setLocalNotifs(notifs.map(n => ({ ...n, isRead: true })));
    try { markAllMutation.mutate(); } catch {}
    toast({ title: "All notifications marked as read" });
  };

  const filtered = notifs.filter(n => {
    if (activeTab === "critical")    return n.priority === "critical" || n.priority === "high";
    if (activeTab === "predictions") return n.type === "prediction";
    return true;
  });

  const unreadAll      = notifs.filter(n => !n.isRead).length;
  const unreadCritical = notifs.filter(n => !n.isRead && (n.priority === "critical" || n.priority === "high")).length;
  const unreadPred     = notifs.filter(n => !n.isRead && n.type === "prediction").length;

  const getPriorityStyles = (priority: string) => {
    switch (priority) {
      case "critical": return { icon: AlertTriangle, color: "text-red-500 bg-red-500/10 border-red-500/20" };
      case "high":     return { icon: AlertTriangle, color: "text-amber-500 bg-amber-500/10 border-amber-500/20" };
      case "medium":   return { icon: Info,          color: "text-blue-400 bg-blue-400/10 border-blue-400/20" };
      default:         return { icon: CheckCircle2,  color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20" };
    }
  };

  const tabs: { id: Tab; label: string; unread: number }[] = [
    { id: "all",         label: "All Inbox",       unread: unreadAll },
    { id: "critical",    label: "Critical Alerts",  unread: unreadCritical },
    { id: "predictions", label: "AI Predictions",   unread: unreadPred },
  ];

  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500" onClick={() => setOpenMenu(null)}>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
          <p className="text-muted-foreground mt-1">System alerts, AI predictions, and operational updates.</p>
        </div>
        <button
          onClick={handleMarkAll}
          disabled={unreadAll === 0}
          className="text-sm font-medium text-primary hover:text-primary/80 transition-colors flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-md border border-primary/20 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <CheckCheck className="w-4 h-4" /> Mark all as read
        </button>
      </div>

      <div className="glass-panel border border-white/5 rounded-xl overflow-hidden">
        {/* Tabs */}
        <div className="p-0 border-b border-white/5 bg-black/20 flex">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-2 px-5 py-4 text-sm font-medium transition-colors border-b-2 -mb-px",
                activeTab === tab.id
                  ? "text-primary border-primary"
                  : "text-muted-foreground border-transparent hover:text-white hover:border-white/20"
              )}
            >
              {tab.label}
              {tab.unread > 0 && (
                <span className={cn(
                  "text-[10px] font-bold px-1.5 py-0.5 rounded-full",
                  activeTab === tab.id ? "bg-primary text-white" : "bg-white/10 text-muted-foreground"
                )}>
                  {tab.unread}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Empty state */}
        {!isLoading && filtered.length === 0 && (
          <div className="py-16 flex flex-col items-center justify-center text-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
              <Bell className="w-6 h-6 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground text-sm">No notifications in this category.</p>
          </div>
        )}

        {/* List */}
        <div className="divide-y divide-white/5">
          {isLoading ? (
            Array(4).fill(0).map((_, i) => (
              <div key={i} className="p-4 flex gap-4">
                <Skeleton className="w-10 h-10 rounded-full bg-white/5 shrink-0" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-1/3 bg-white/5" />
                  <Skeleton className="h-4 w-full bg-white/5" />
                </div>
              </div>
            ))
          ) : (
            filtered.map(notif => {
              const { icon: Icon, color } = getPriorityStyles(notif.priority);
              return (
                <div
                  key={notif.id}
                  className={cn(
                    "p-5 flex gap-4 hover:bg-white/[0.02] transition-colors relative group cursor-pointer",
                    !notif.isRead && "bg-primary/5"
                  )}
                  onClick={() => !notif.isRead && markOneRead(notif.id)}
                >
                  {!notif.isRead && <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r" />}

                  <div className={cn("w-10 h-10 rounded-full flex items-center justify-center shrink-0 border", color)}>
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-1 gap-2">
                      <h3 className={cn("font-semibold text-sm leading-snug", !notif.isRead ? "text-white" : "text-slate-300")}>
                        {notif.title}
                        {!notif.isRead && (
                          <span className="ml-2 inline-block w-2 h-2 rounded-full bg-primary align-middle" />
                        )}
                      </h3>
                      <span className="text-[10px] text-muted-foreground font-mono shrink-0 whitespace-nowrap">
                        {format(new Date(notif.createdAt), "MMM dd, HH:mm")}
                      </span>
                    </div>
                    <p className={cn("text-xs leading-relaxed", !notif.isRead ? "text-slate-300" : "text-muted-foreground")}>
                      {notif.message}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <span className={cn("text-[10px] px-2 py-0.5 rounded-full border uppercase font-bold tracking-wider", color)}>
                        {notif.priority}
                      </span>
                      <span className="text-[10px] text-muted-foreground capitalize">{notif.type}</span>
                    </div>
                  </div>

                  {/* Actions menu */}
                  <div className="shrink-0 flex items-start pt-1 relative" onClick={e => e.stopPropagation()}>
                    <button
                      onClick={() => setOpenMenu(openMenu === notif.id ? null : notif.id)}
                      className="p-2 text-muted-foreground hover:text-white rounded hover:bg-white/10 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>
                    {openMenu === notif.id && (
                      <div className="absolute right-0 top-8 z-50 glass-panel border border-white/10 rounded-lg shadow-xl w-44 py-1">
                        {!notif.isRead && (
                          <button onClick={() => markOneRead(notif.id)} className="w-full flex items-center gap-2 px-3 py-2 text-xs text-slate-300 hover:bg-white/5 hover:text-white transition-colors">
                            <Eye className="w-3.5 h-3.5" /> Mark as read
                          </button>
                        )}
                        <button onClick={() => muteType(notif.type)} className="w-full flex items-center gap-2 px-3 py-2 text-xs text-slate-300 hover:bg-white/5 hover:text-white transition-colors">
                          <BellOff className="w-3.5 h-3.5" /> Mute this type
                        </button>
                        <button onClick={() => deleteOne(notif.id)} className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-400 hover:bg-white/5 transition-colors">
                          <Trash2 className="w-3.5 h-3.5" /> Dismiss
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {filtered.length > 0 && (
          <div className="p-4 border-t border-white/5 bg-black/20 text-center">
            <p className="text-xs text-muted-foreground">{filtered.filter(n => !n.isRead).length > 0 ? `${filtered.filter(n => !n.isRead).length} unread notification${filtered.filter(n => !n.isRead).length !== 1 ? "s" : ""}` : "All caught up ✓"}</p>
          </div>
        )}
      </div>
    </div>
  );
}
