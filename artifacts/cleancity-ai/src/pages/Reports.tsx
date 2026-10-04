import { useState } from "react";
import { useListReports } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  FileText,
  Download,
  Plus,
  BarChart2,
  Clock,
  CheckCircle2,
  AlertCircle,
  X,
  RefreshCw
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const reportTemplates = [
  { type: "environmental", label: "Environmental Impact Summary", period: "Current Month" },
  { type: "incidents", label: "Weekly Incident Resolution Rate", period: "Last 7 Days" },
  { type: "predictive", label: "Predictive Maintenance Forecast (30 Day)", period: "Next 30 Days" },
  { type: "community", label: "Community Civic Engagement Report", period: "Current Quarter" },
  { type: "ai_monitoring", label: "AI Detection Accuracy Report", period: "Last 30 Days" },
  { type: "custom", label: "Custom Municipality Brief", period: "Custom Range" },
];

export function Reports() {
  const { toast } = useToast();
  const { data, isLoading } = useListReports();
  const [showModal, setShowModal] = useState(false);
  const [localReports, setLocalReports] = useState<any[] | null>(null);
  const [selectedType, setSelectedType] = useState("environmental");
  const [generating, setGenerating] = useState(false);

  const baseReports = data || [
    { id: 1, title: "Q2 Environmental Impact Summary", type: "environmental", status: "ready", period: "2025 Q2", generatedAt: "2025-05-14T08:00:00Z", createdAt: "2025-05-14T07:55:00Z", size: "2.4 MB" },
    { id: 2, title: "Weekly Incident Resolution Rate", type: "operational", status: "ready", period: "May 6 - May 13", generatedAt: "2025-05-13T09:00:00Z", createdAt: "2025-05-13T08:58:00Z", size: "1.1 MB" },
    { id: 3, title: "Predictive Maintenance Forecast (30 Day)", type: "predictive", status: "generating", period: "Next 30 Days", generatedAt: null, createdAt: "2025-05-14T11:45:00Z", size: null },
    { id: 4, title: "Community Civic Engagement", type: "community", status: "ready", period: "April 2025", generatedAt: "2025-05-01T10:00:00Z", createdAt: "2025-05-01T09:50:00Z", size: "3.8 MB" },
    { id: 5, title: "City Council Infrastructure Brief", type: "custom", status: "failed", period: "YTD 2025", generatedAt: null, createdAt: "2025-05-12T14:00:00Z", size: null },
  ];

  const reports = localReports || baseReports;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ready': return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
      case 'generating': return <Clock className="w-4 h-4 text-amber-500 animate-spin" />;
      case 'failed': return <AlertCircle className="w-4 h-4 text-red-500" />;
      default: return null;
    }
  };

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    const template = reportTemplates.find(t => t.type === selectedType);
    if (!template) return;
    setGenerating(true);

    const newId = Math.max(...(localReports || baseReports).map(r => r.id)) + 1;
    const newReport = {
      id: newId,
      title: template.label,
      type: selectedType,
      status: "generating",
      period: template.period,
      generatedAt: null,
      createdAt: new Date().toISOString(),
      size: null
    };

    const updated = [newReport, ...(localReports || baseReports)];
    setLocalReports(updated);
    setGenerating(false);
    setShowModal(false);
    toast({ title: "Report queued", description: `"${template.label}" is being generated. It will be ready in ~30 seconds.` });

    // Simulate report completion after 5 seconds
    setTimeout(() => {
      setLocalReports(prev => (prev || updated).map(r =>
        r.id === newId
          ? { ...r, status: "ready", generatedAt: new Date().toISOString(), size: `${(Math.random() * 3 + 0.8).toFixed(1)} MB` }
          : r
      ));
      toast({ title: "Report ready!", description: `"${template.label}" has been generated and is ready to download.` });
    }, 5000);
  };

  const handleDownload = (report: any) => {
    toast({ title: "Download started", description: `Downloading "${report.title}" (${report.size})…` });
  };

  const handleRetry = (report: any) => {
    setLocalReports((localReports || baseReports).map(r =>
      r.id === report.id ? { ...r, status: "generating", generatedAt: null, size: null } : r
    ));
    toast({ title: "Report retrying", description: `Re-generating "${report.title}"…` });
    setTimeout(() => {
      setLocalReports(prev => (prev || baseReports).map(r =>
        r.id === report.id
          ? { ...r, status: "ready", generatedAt: new Date().toISOString(), size: `${(Math.random() * 2 + 0.5).toFixed(1)} MB` }
          : r
      ));
      toast({ title: "Report ready!", description: `"${report.title}" is now ready.` });
    }, 4000);
  };

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reports & Exports</h1>
          <p className="text-muted-foreground mt-1">Generate investor-grade data exports and municipal briefs.</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md font-medium text-sm flex items-center gap-2 transition-colors glow-cyan shrink-0"
        >
          <Plus className="w-4 h-4" /> Generate Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          { label: "Environmental", icon: FileText, count: 24 },
          { label: "Operational", icon: BarChart2, count: 156 },
          { label: "Predictive", icon: Clock, count: 12 },
          { label: "Custom", icon: FileText, count: 8 },
        ].map((stat, i) => (
          <div key={i} className="glass-panel p-4 rounded-xl border border-white/5 flex items-center gap-4">
            <div className="w-10 h-10 rounded bg-white/5 flex items-center justify-center border border-white/10">
              <stat.icon className="w-5 h-5 text-muted-foreground" />
            </div>
            <div>
              <div className="text-2xl font-bold">{stat.count}</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="glass-panel border border-white/5 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-white/5 bg-black/20 font-semibold text-sm">
          Recent Documents
        </div>

        <div className="divide-y divide-white/5">
          {isLoading ? (
            Array(5).fill(0).map((_, i) => (
              <div key={i} className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Skeleton className="w-10 h-10 rounded bg-white/5" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-64 bg-white/5" />
                    <Skeleton className="h-3 w-32 bg-white/5" />
                  </div>
                </div>
              </div>
            ))
          ) : (
            reports.map(report => (
              <div key={report.id} className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between hover:bg-white/[0.02] transition-colors gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-sm mb-1">{report.title}</h3>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground font-mono">
                      <span className="uppercase">{report.type}</span>
                      <span>•</span>
                      <span>Period: {report.period}</span>
                      {report.size && (
                        <>
                          <span>•</span>
                          <span>{report.size}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                  <div className="flex items-center gap-2 text-sm">
                    {getStatusIcon(report.status)}
                    <span className={cn(
                      "capitalize font-medium",
                      report.status === 'ready' ? "text-emerald-500" :
                      report.status === 'generating' ? "text-amber-500" : "text-red-500"
                    )}>{report.status}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {report.status === 'failed' && (
                      <button
                        onClick={() => handleRetry(report)}
                        className="p-2 bg-amber-500/10 border border-amber-500/20 rounded hover:bg-amber-500/20 transition-colors text-amber-400"
                        title="Retry"
                      >
                        <RefreshCw className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={() => report.status === 'ready' && handleDownload(report)}
                      disabled={report.status !== 'ready'}
                      className="p-2 bg-white/5 border border-white/10 rounded hover:bg-white/10 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-foreground"
                      title="Download"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Generate Report Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div
            className="relative glass-panel border border-white/10 rounded-2xl p-6 w-full max-w-md shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <Plus className="w-5 h-5 text-primary" /> Generate New Report
              </h2>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleGenerate} className="space-y-4">
              <div>
                <label className="text-xs text-slate-400 mb-1.5 block">Report Type</label>
                <select
                  value={selectedType}
                  onChange={e => setSelectedType(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-slate-300 focus:outline-none focus:border-primary/50 transition-colors"
                >
                  {reportTemplates.map(t => (
                    <option key={t.type} value={t.type}>{t.label}</option>
                  ))}
                </select>
              </div>
              <div className="bg-white/5 rounded-lg p-4 border border-white/5">
                <div className="text-xs text-slate-400 mb-1">Period</div>
                <div className="text-sm font-medium text-white">{reportTemplates.find(t => t.type === selectedType)?.period}</div>
                <div className="text-xs text-slate-500 mt-2">Data sourced from Bengaluru CleanCity AI network · 198 BBMP wards</div>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-white/5 border border-white/10 py-2.5 rounded-lg text-sm font-medium hover:bg-white/10 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={generating}
                  className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground py-2.5 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
                >
                  {generating
                    ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Queuing...</>
                    : <><Plus className="w-4 h-4" /> Generate</>
                  }
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
