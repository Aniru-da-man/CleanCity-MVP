import { useState } from "react";
import { useListIncidents } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Filter,
  Plus,
  Search,
  ArrowUpDown,
  MoreVertical,
  CheckCircle2,
  Clock,
  AlertCircle,
  X,
  ChevronRight,
  UserCheck,
  PlayCircle,
  XCircle,
  CheckCheck,
  MapPin,
  Cpu,
  CalendarDays,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { DEMO_INCIDENTS } from "@/lib/demo-data";

type Incident = typeof DEMO_INCIDENTS[0] & { assignedTo: string | null };

const STATUS_CYCLE: Record<string, string> = {
  open: "in-progress",
  "in-progress": "resolved",
  resolved: "open",
};

const STATUS_LABELS: Record<string, string> = {
  open: "Open",
  "in-progress": "In Progress",
  resolved: "Resolved",
};

const ACTION_OPTIONS = [
  { id: "start",    label: "Mark In Progress", icon: PlayCircle,  toStatus: "in-progress", color: "text-amber-400"  },
  { id: "resolve",  label: "Mark Resolved",    icon: CheckCheck,  toStatus: "resolved",    color: "text-emerald-400" },
  { id: "reopen",   label: "Reopen",           icon: AlertCircle, toStatus: "open",        color: "text-blue-400"   },
  { id: "assign",   label: "Assign to Me",     icon: UserCheck,   toStatus: null,          color: "text-slate-300"  },
  { id: "reject",   label: "Reject / Dismiss", icon: XCircle,     toStatus: null,          color: "text-red-400"    },
];

export function Incidents() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [severityFilter, setSeverityFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [showSeverityMenu, setShowSeverityMenu] = useState(false);
  const [showStatusMenu, setShowStatusMenu] = useState(false);
  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [detailIncident, setDetailIncident] = useState<Incident | null>(null);
  const [localIncidents, setLocalIncidents] = useState<Incident[] | null>(null);
  const [createForm, setCreateForm] = useState({ title: "", type: "Waste", severity: "medium", location: "" });
  const [creating, setCreating] = useState(false);

  const { data: apiData, isLoading } = useListIncidents();

  const baseIncidents: Incident[] = (apiData as any) || DEMO_INCIDENTS;
  const incidents: Incident[] = localIncidents || baseIncidents;

  const updateStatus = (id: number, newStatus: string, label: string) => {
    setLocalIncidents(incidents.map(inc =>
      inc.id === id ? { ...inc, status: newStatus } : inc
    ));
    if (detailIncident?.id === id) setDetailIncident(prev => prev ? { ...prev, status: newStatus } : null);
    setOpenMenu(null);
    toast({ title: `Incident ${STATUS_LABELS[newStatus]}`, description: `#${id} — ${label}` });
  };

  const assignToMe = (id: number) => {
    setLocalIncidents(incidents.map(inc =>
      inc.id === id ? { ...inc, assignedTo: "Sarah Jenkins" } : inc
    ));
    if (detailIncident?.id === id) setDetailIncident(prev => prev ? { ...prev, assignedTo: "Sarah Jenkins" } : null);
    setOpenMenu(null);
    toast({ title: "Assigned to you", description: `Incident #${id} is now assigned to you.` });
  };

  const rejectIncident = (id: number) => {
    setLocalIncidents(incidents.filter(inc => inc.id !== id));
    if (detailIncident?.id === id) setDetailIncident(null);
    setOpenMenu(null);
    toast({ title: "Incident dismissed", description: `Incident #${id} has been removed from the queue.`, variant: "destructive" });
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!createForm.title || !createForm.location) return;
    setCreating(true);
    setTimeout(() => {
      const newInc: Incident = {
        id: Math.max(...incidents.map(i => i.id)) + 1,
        title: createForm.title,
        type: createForm.type,
        severity: createForm.severity,
        status: "open",
        location: createForm.location,
        assignedTo: null,
        createdAt: new Date().toISOString(),
        ward: "Ward —",
        aiConfidence: 0,
        lat: 12.9716,
        lng: 77.5946,
      };
      setLocalIncidents([newInc, ...incidents]);
      setCreating(false);
      setShowCreateModal(false);
      setCreateForm({ title: "", type: "Waste", severity: "medium", location: "" });
      toast({ title: "Incident created", description: `#${newInc.id} added to the queue.` });
    }, 900);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "text-red-500 bg-red-500/10 border-red-500/20";
      case "high":     return "text-amber-500 bg-amber-500/10 border-amber-500/20";
      case "medium":   return "text-blue-400 bg-blue-400/10 border-blue-400/20";
      default:         return "text-slate-400 bg-slate-400/10 border-slate-400/20";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "resolved":    return <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />;
      case "in-progress": return <Clock className="w-3.5 h-3.5 text-amber-500" />;
      default:            return <AlertCircle className="w-3.5 h-3.5 text-primary" />;
    }
  };

  const filtered = incidents.filter(inc => {
    const q = searchTerm.toLowerCase();
    const matchSearch = !q || `${inc.id} ${inc.title} ${inc.location}`.toLowerCase().includes(q);
    const matchSev = !severityFilter || inc.severity === severityFilter;
    const matchStat = !statusFilter || inc.status === statusFilter;
    return matchSearch && matchSev && matchStat;
  });

  const openCount = incidents.filter(i => i.status === "open").length;
  const inProgCount = incidents.filter(i => i.status === "in-progress").length;
  const resolvedCount = incidents.filter(i => i.status === "resolved").length;

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-500" onClick={() => { setOpenMenu(null); setShowSeverityMenu(false); setShowStatusMenu(false); }}>

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Incident Management</h1>
          <p className="text-muted-foreground mt-1">Track, assign, and resolve city infrastructure issues across 198 BBMP wards.</p>
        </div>
        <button
          onClick={e => { e.stopPropagation(); setShowCreateModal(true); }}
          className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md font-medium text-sm flex items-center gap-2 transition-colors glow-cyan shadow-lg shrink-0"
        >
          <Plus className="w-4 h-4" /> Create Incident
        </button>
      </div>

      {/* Summary chips */}
      <div className="flex gap-4 flex-wrap">
        <SummaryChip label="Open" count={openCount} color="text-primary bg-primary/10 border-primary/20" onClick={() => setStatusFilter(statusFilter === "open" ? null : "open")} active={statusFilter === "open"} />
        <SummaryChip label="In Progress" count={inProgCount} color="text-amber-500 bg-amber-500/10 border-amber-500/20" onClick={() => setStatusFilter(statusFilter === "in-progress" ? null : "in-progress")} active={statusFilter === "in-progress"} />
        <SummaryChip label="Resolved" count={resolvedCount} color="text-emerald-500 bg-emerald-500/10 border-emerald-500/20" onClick={() => setStatusFilter(statusFilter === "resolved" ? null : "resolved")} active={statusFilter === "resolved"} />
      </div>

      <div className="glass-panel border border-white/5 rounded-xl overflow-hidden flex flex-col">
        {/* Toolbar */}
        <div className="p-4 border-b border-white/5 flex flex-col sm:flex-row gap-4 items-center justify-between bg-black/20">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by ID, title, or location…"
              className="pl-9 bg-white/5 border-white/10 text-sm h-9 w-full"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              onClick={e => e.stopPropagation()}
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            {/* Severity filter */}
            <div className="relative flex-1 sm:flex-none">
              <button
                onClick={e => { e.stopPropagation(); setShowSeverityMenu(!showSeverityMenu); setShowStatusMenu(false); }}
                className={cn("w-full sm:w-auto px-3 py-1.5 border rounded-md text-sm flex items-center justify-center gap-2 hover:bg-white/10 transition-colors", severityFilter ? "bg-primary/10 border-primary/30 text-primary" : "bg-white/5 border-white/10 text-foreground")}
              >
                <Filter className="w-4 h-4 text-muted-foreground" /> {severityFilter ? `Severity: ${severityFilter}` : "Severity"}
              </button>
              {showSeverityMenu && (
                <div className="absolute top-10 left-0 z-50 glass-panel border border-white/10 rounded-lg shadow-xl w-40 py-1" onClick={e => e.stopPropagation()}>
                  {["critical","high","medium","low"].map(s => (
                    <button key={s} onClick={() => { setSeverityFilter(severityFilter === s ? null : s); setShowSeverityMenu(false); }} className={cn("w-full text-left px-3 py-2 text-xs capitalize hover:bg-white/5 transition-colors", severityFilter === s ? "text-primary" : "text-slate-300")}>
                      {s}
                    </button>
                  ))}
                  {severityFilter && <button onClick={() => { setSeverityFilter(null); setShowSeverityMenu(false); }} className="w-full text-left px-3 py-2 text-xs text-red-400 hover:bg-white/5 border-t border-white/5">Clear</button>}
                </div>
              )}
            </div>
            {/* Status filter */}
            <div className="relative flex-1 sm:flex-none">
              <button
                onClick={e => { e.stopPropagation(); setShowStatusMenu(!showStatusMenu); setShowSeverityMenu(false); }}
                className={cn("w-full sm:w-auto px-3 py-1.5 border rounded-md text-sm flex items-center justify-center gap-2 hover:bg-white/10 transition-colors", statusFilter ? "bg-primary/10 border-primary/30 text-primary" : "bg-white/5 border-white/10 text-foreground")}
              >
                <Filter className="w-4 h-4 text-muted-foreground" /> {statusFilter ? `Status: ${statusFilter}` : "Status"}
              </button>
              {showStatusMenu && (
                <div className="absolute top-10 left-0 z-50 glass-panel border border-white/10 rounded-lg shadow-xl w-40 py-1" onClick={e => e.stopPropagation()}>
                  {["open","in-progress","resolved"].map(s => (
                    <button key={s} onClick={() => { setStatusFilter(statusFilter === s ? null : s); setShowStatusMenu(false); }} className={cn("w-full text-left px-3 py-2 text-xs capitalize hover:bg-white/5 transition-colors", statusFilter === s ? "text-primary" : "text-slate-300")}>
                      {s.replace("-"," ")}
                    </button>
                  ))}
                  {statusFilter && <button onClick={() => { setStatusFilter(null); setShowStatusMenu(false); }} className="w-full text-left px-3 py-2 text-xs text-red-400 hover:bg-white/5 border-t border-white/5">Clear</button>}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-black/40 border-b border-white/5">
              <tr>
                <th className="px-4 py-3 font-medium cursor-pointer hover:text-white transition-colors group">
                  <div className="flex items-center gap-1">ID <ArrowUpDown className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" /></div>
                </th>
                <th className="px-4 py-3 font-medium">Issue</th>
                <th className="px-4 py-3 font-medium">Severity</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Location</th>
                <th className="px-4 py-3 font-medium">Assignee</th>
                <th className="px-4 py-3 font-medium">Reported</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                Array(5).fill(0).map((_, i) => (
                  <tr key={i} className="border-b border-white/5">
                    {Array(8).fill(0).map((__, j) => (
                      <td key={j} className="px-4 py-4"><Skeleton className="h-4 w-20 bg-white/5" /></td>
                    ))}
                  </tr>
                ))
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-12 text-muted-foreground text-sm">No incidents match your filters.</td>
                </tr>
              ) : (
                filtered.map(incident => (
                  <tr
                    key={incident.id}
                    className="border-b border-white/5 hover:bg-white/[0.02] transition-colors cursor-pointer group"
                    onClick={() => setDetailIncident(incident)}
                  >
                    <td className="px-4 py-4 font-mono text-muted-foreground group-hover:text-primary transition-colors">#{incident.id}</td>
                    <td className="px-4 py-4">
                      <div className="font-medium text-foreground">{incident.title}</div>
                      <div className="text-[10px] text-muted-foreground uppercase tracking-wider">{incident.type}</div>
                    </td>
                    <td className="px-4 py-4">
                      <span className={cn("px-2 py-1 rounded text-[10px] uppercase font-bold tracking-wider border", getSeverityColor(incident.severity))}>
                        {incident.severity}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(incident.status)}
                        <span className="capitalize">{incident.status.replace("-", " ")}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-muted-foreground text-xs">{incident.location}</td>
                    <td className="px-4 py-4 text-muted-foreground text-xs">
                      {incident.assignedTo || <span className="text-slate-500 italic">Unassigned</span>}
                    </td>
                    <td className="px-4 py-4 text-muted-foreground font-mono text-xs">
                      {format(new Date(incident.createdAt), "MMM dd, HH:mm")}
                    </td>
                    <td className="px-4 py-4 text-right relative" onClick={e => e.stopPropagation()}>
                      <button
                        onClick={e => { e.stopPropagation(); setOpenMenu(openMenu === incident.id ? null : incident.id); }}
                        className="text-muted-foreground hover:text-white p-1 rounded hover:bg-white/10 transition-colors"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>
                      {openMenu === incident.id && (
                        <div className="absolute right-6 top-10 z-50 glass-panel border border-white/10 rounded-lg shadow-xl w-48 py-1 text-left" onClick={e => e.stopPropagation()}>
                          {ACTION_OPTIONS.filter(a => {
                            if (a.id === "start")   return incident.status === "open";
                            if (a.id === "resolve") return incident.status === "in-progress";
                            if (a.id === "reopen")  return incident.status === "resolved";
                            return true;
                          }).map(action => (
                            <button
                              key={action.id}
                              onClick={() => {
                                if (action.id === "assign")  assignToMe(incident.id);
                                else if (action.id === "reject") rejectIncident(incident.id);
                                else if (action.toStatus)   updateStatus(incident.id, action.toStatus, incident.title);
                              }}
                              className={cn("w-full flex items-center gap-2 px-3 py-2 text-xs hover:bg-white/5 transition-colors", action.color)}
                            >
                              <action.icon className="w-3.5 h-3.5" /> {action.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-white/5 bg-black/20 flex items-center justify-between text-xs text-muted-foreground">
          <div>Showing {filtered.length} of {incidents.length} entries</div>
          <div className="flex gap-1">
            <button className="px-2 py-1 rounded border border-white/10 hover:bg-white/10 disabled:opacity-50" disabled>Prev</button>
            <button className="px-2 py-1 rounded border border-white/10 bg-primary/20 text-primary border-primary/30">1</button>
            <button className="px-2 py-1 rounded border border-white/10 hover:bg-white/10">2</button>
            <button className="px-2 py-1 rounded border border-white/10 hover:bg-white/10">3</button>
            <span className="px-2 py-1">…</span>
            <button className="px-2 py-1 rounded border border-white/10 hover:bg-white/10">Next</button>
          </div>
        </div>
      </div>

      {/* Detail Drawer */}
      {detailIncident && (
        <div className="fixed inset-0 z-50 flex" onClick={() => setDetailIncident(null)}>
          <div className="flex-1 bg-black/60 backdrop-blur-sm" />
          <div
            className="w-full max-w-md glass-panel border-l border-white/10 h-full overflow-y-auto p-6 space-y-6 animate-in slide-in-from-right duration-300"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">Incident #{detailIncident.id}</h2>
              <button onClick={() => setDetailIncident(null)} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>

            <div className="space-y-1">
              <h3 className="font-semibold text-foreground text-base">{detailIncident.title}</h3>
              <div className="flex items-center gap-2 flex-wrap">
                <span className={cn("px-2 py-0.5 rounded text-[10px] uppercase font-bold border", getSeverityColor(detailIncident.severity))}>{detailIncident.severity}</span>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">{getStatusIcon(detailIncident.status)} {detailIncident.status.replace("-"," ")}</div>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <DetailRow icon={MapPin} label="Location" value={detailIncident.location} />
              <DetailRow icon={CalendarDays} label="Reported" value={format(new Date(detailIncident.createdAt), "PPpp")} />
              <DetailRow icon={UserCheck} label="Assigned To" value={detailIncident.assignedTo || "Unassigned"} />
              {(detailIncident.aiConfidence ?? 0) > 0 && (
                <DetailRow icon={Cpu} label="AI Confidence" value={`${detailIncident.aiConfidence}%`} />
              )}
              <DetailRow icon={ChevronRight} label="Ward" value={detailIncident.ward} />
            </div>

            <div className="pt-4 border-t border-white/5 space-y-2">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">Quick Actions</p>
              {detailIncident.status === "open" && (
                <ActionBtn icon={PlayCircle} label="Mark In Progress" color="amber" onClick={() => updateStatus(detailIncident.id, "in-progress", detailIncident.title)} />
              )}
              {detailIncident.status === "in-progress" && (
                <ActionBtn icon={CheckCheck} label="Mark Resolved" color="emerald" onClick={() => updateStatus(detailIncident.id, "resolved", detailIncident.title)} />
              )}
              {detailIncident.status === "resolved" && (
                <ActionBtn icon={AlertCircle} label="Reopen Incident" color="blue" onClick={() => updateStatus(detailIncident.id, "open", detailIncident.title)} />
              )}
              {!detailIncident.assignedTo && (
                <ActionBtn icon={UserCheck} label="Assign to Me" color="slate" onClick={() => assignToMe(detailIncident.id)} />
              )}
              <ActionBtn icon={XCircle} label="Reject / Dismiss" color="red" onClick={() => { rejectIncident(detailIncident.id); setDetailIncident(null); }} />
            </div>
          </div>
        </div>
      )}

      {/* Create Incident Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setShowCreateModal(false)}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div className="relative glass-panel border border-white/10 rounded-2xl p-6 w-full max-w-md shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold flex items-center gap-2"><Plus className="w-5 h-5 text-primary" /> Create Incident</h2>
              <button onClick={() => setShowCreateModal(false)} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleCreate} className="space-y-4">
              <FormField label="Title *">
                <input
                  required value={createForm.title} onChange={e => setCreateForm(f => ({ ...f, title: e.target.value }))}
                  placeholder="e.g. Overflowing bin near KR Market"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-primary/50"
                />
              </FormField>
              <div className="grid grid-cols-2 gap-4">
                <FormField label="Type">
                  <select value={createForm.type} onChange={e => setCreateForm(f => ({ ...f, type: e.target.value }))} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-slate-300 focus:outline-none focus:border-primary/50">
                    {["Waste","Roads","Drainage","Infrastructure","HazMat","Civic"].map(t => <option key={t}>{t}</option>)}
                  </select>
                </FormField>
                <FormField label="Severity">
                  <select value={createForm.severity} onChange={e => setCreateForm(f => ({ ...f, severity: e.target.value }))} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-slate-300 focus:outline-none focus:border-primary/50">
                    {["low","medium","high","critical"].map(s => <option key={s} className="capitalize">{s}</option>)}
                  </select>
                </FormField>
              </div>
              <FormField label="Location *">
                <input
                  required value={createForm.location} onChange={e => setCreateForm(f => ({ ...f, location: e.target.value }))}
                  placeholder="e.g. Cubbon Park, Ward 76"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-primary/50"
                />
              </FormField>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowCreateModal(false)} className="flex-1 bg-white/5 border border-white/10 py-2.5 rounded-lg text-sm font-medium hover:bg-white/10 transition-colors">Cancel</button>
                <button type="submit" disabled={creating} className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground py-2.5 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-colors disabled:opacity-50">
                  {creating ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Creating…</> : <><Plus className="w-4 h-4" /> Create</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function SummaryChip({ label, count, color, onClick, active }: { label: string; count: number; color: string; onClick: () => void; active: boolean }) {
  return (
    <button onClick={onClick} className={cn("px-3 py-1.5 rounded-full border text-xs font-semibold transition-all", color, active ? "ring-2 ring-offset-1 ring-offset-background ring-current" : "opacity-80 hover:opacity-100")}>
      {count} {label}
    </button>
  );
}

function DetailRow({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
      <div>
        <div className="text-xs text-muted-foreground">{label}</div>
        <div className="font-medium text-foreground">{value}</div>
      </div>
    </div>
  );
}

function ActionBtn({ icon: Icon, label, color, onClick }: { icon: any; label: string; color: string; onClick: () => void }) {
  const colorMap: Record<string, string> = {
    amber:   "bg-amber-500/10 border-amber-500/20 text-amber-400 hover:bg-amber-500/20",
    emerald: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20",
    blue:    "bg-blue-500/10 border-blue-500/20 text-blue-400 hover:bg-blue-500/20",
    slate:   "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10",
    red:     "bg-red-500/10 border-red-500/20 text-red-400 hover:bg-red-500/20",
  };
  return (
    <button onClick={onClick} className={cn("w-full flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-medium transition-colors", colorMap[color])}>
      <Icon className="w-4 h-4" /> {label}
    </button>
  );
}

function FormField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-xs text-slate-400 mb-1.5 block">{label}</label>
      {children}
    </div>
  );
}
