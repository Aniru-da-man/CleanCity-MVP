import { useListCameras, useListDetections } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Cctv, AlertCircle, Eye, Target, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

export function Monitoring() {
  const { data: camerasData, isLoading: loadingCameras } = useListCameras();
  const { data: detectionsData, isLoading: loadingDetections } = useListDetections();

  // Mock data fallback
  const cameras = camerasData || [
    { id: "CAM-01", name: "Downtown Square", location: "Main St & 4th Ave", status: "online", detectionsToday: 42 },
    { id: "CAM-02", name: "Cubbon Park North", location: "Cubbon Park North Entrance", status: "online", detectionsToday: 18 },
    { id: "CAM-03", name: "Transit Hub", location: "Station Sector A", status: "online", detectionsToday: 87 },
    { id: "CAM-04", name: "Industrial Zone", location: "Sector 7G", status: "offline", detectionsToday: 0 },
    { id: "CAM-05", name: "River Walk", location: "Bridge Point", status: "online", detectionsToday: 5 },
    { id: "CAM-06", name: "Commercial Block", location: "Trade Center Blvd", status: "online", detectionsToday: 23 },
  ];

  const detections = detectionsData || [
    { id: 1, cameraName: "Transit Hub", type: "Illegal Dumping", confidence: 94, severity: "high", detectedAt: "Just now" },
    { id: 2, cameraName: "Downtown Square", type: "Waste Overflow", confidence: 88, severity: "medium", detectedAt: "2m ago" },
    { id: 3, cameraName: "Commercial Block", type: "Graffiti", confidence: 97, severity: "low", detectedAt: "14m ago" },
    { id: 4, cameraName: "Transit Hub", type: "Crowd Assembly", confidence: 82, severity: "medium", detectedAt: "28m ago" },
    { id: 5, cameraName: "Central Park West", type: "Suspicious Object", confidence: 91, severity: "critical", detectedAt: "1h ago" },
  ];

  return (
    <div className="p-6 md:p-8 max-w-[1600px] mx-auto space-y-6 animate-in fade-in duration-500 h-[calc(100vh-64px)] flex flex-col">
      <div className="flex justify-between items-center shrink-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">AI Monitoring</h1>
          <p className="text-muted-foreground mt-1">Real-time computer vision feeds and automated anomaly detection.</p>
        </div>
        <div className="flex gap-4">
          <div className="glass-panel px-4 py-2 rounded-lg flex items-center gap-3">
            <Eye className="w-4 h-4 text-primary" />
            <div className="flex flex-col">
              <span className="text-[10px] uppercase text-muted-foreground leading-none">Models Active</span>
              <span className="text-sm font-bold leading-none mt-1">YOLOv8 + Custom</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-6">
        {/* Camera Grid */}
        <div className="flex-1 flex flex-col min-h-0">
          <div className="flex items-center justify-between mb-4 shrink-0">
            <h2 className="font-semibold flex items-center gap-2">
              <Cctv className="w-5 h-5" /> Live Feeds
            </h2>
            <div className="text-sm text-muted-foreground">Showing {cameras.length} cameras</div>
          </div>
          
          <div className="flex-1 overflow-y-auto pr-2 grid grid-cols-1 md:grid-cols-2 gap-4 pb-8">
            {loadingCameras ? (
              Array(6).fill(0).map((_, i) => <Skeleton key={i} className="h-48 rounded-xl bg-white/5" />)
            ) : (
              cameras.map(camera => (
                <div key={camera.id} className="glass-panel rounded-xl overflow-hidden flex flex-col group border border-white/10 hover:border-primary/50 transition-colors">
                  <div className="relative aspect-video bg-[#050812] flex items-center justify-center overflow-hidden">
                    {camera.status === 'online' ? (
                      <>
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')] bg-cover bg-center opacity-30 mix-blend-luminosity filter contrast-125" />
                        <div className="absolute inset-0 border-[0.5px] border-white/5 grid grid-cols-4 grid-rows-3">
                          {Array(12).fill(0).map((_, i) => (
                            <div key={i} className="border-[0.5px] border-white/5" />
                          ))}
                        </div>
                        {/* Simulated targeting reticle */}
                        {camera.detectionsToday > 20 && (
                          <div className="absolute w-24 h-24 border border-primary/40 rounded flex items-center justify-center animate-pulse">
                            <Target className="w-6 h-6 text-primary/60" />
                          </div>
                        )}
                        <div className="absolute top-3 right-3 flex gap-2">
                          <span className="bg-black/60 backdrop-blur-md px-2 py-1 rounded text-[10px] font-mono border border-white/10 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                            REC
                          </span>
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col items-center text-muted-foreground">
                        <AlertTriangle className="w-8 h-8 mb-2 opacity-50" />
                        <span className="text-xs uppercase tracking-wider font-mono">Signal Lost</span>
                      </div>
                    )}
                  </div>
                  <div className="p-3 flex justify-between items-center bg-black/40">
                    <div>
                      <div className="text-sm font-semibold">{camera.name}</div>
                      <div className="text-[10px] text-muted-foreground font-mono">{camera.id} • {camera.location}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-muted-foreground">Detections Today</div>
                      <div className="font-mono text-primary font-bold">{camera.detectionsToday}</div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Live Detections Feed */}
        <div className="w-full lg:w-96 flex flex-col shrink-0">
          <div className="flex items-center justify-between mb-4 shrink-0">
            <h2 className="font-semibold flex items-center gap-2">
              <AlertCircle className="w-5 h-5" /> Activity Log
            </h2>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
          </div>

          <div className="glass-panel border border-white/5 rounded-xl flex-1 overflow-hidden flex flex-col">
            <div className="p-3 border-b border-white/5 flex gap-2 bg-white/5 overflow-x-auto no-scrollbar">
              <div className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-medium border border-primary/20 whitespace-nowrap">All Events</div>
              <div className="px-3 py-1 rounded-full hover:bg-white/10 text-muted-foreground text-xs font-medium cursor-pointer transition-colors whitespace-nowrap">High Severity</div>
              <div className="px-3 py-1 rounded-full hover:bg-white/10 text-muted-foreground text-xs font-medium cursor-pointer transition-colors whitespace-nowrap">Waste</div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {loadingDetections ? (
                Array(5).fill(0).map((_, i) => <Skeleton key={i} className="h-20 rounded-lg bg-white/5" />)
              ) : (
                detections.map(det => (
                  <div key={det.id} className="p-3 rounded-lg border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors relative overflow-hidden group cursor-pointer">
                    {det.severity === 'critical' && <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500" />}
                    {det.severity === 'high' && <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-500" />}
                    
                    <div className="flex justify-between items-start mb-2 pl-2">
                      <span className="text-sm font-semibold text-white group-hover:text-primary transition-colors">{det.type}</span>
                      <span className="text-[10px] text-muted-foreground font-mono">{det.detectedAt}</span>
                    </div>
                    
                    <div className="pl-2 flex items-center justify-between mb-3">
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Cctv className="w-3 h-3" /> {det.cameraName}
                      </span>
                    </div>

                    <div className="pl-2">
                      <div className="flex justify-between text-[10px] text-muted-foreground mb-1">
                        <span>AI Confidence</span>
                        <span className="font-mono text-primary">{det.confidence}%</span>
                      </div>
                      <div className="w-full bg-black/40 rounded-full h-1.5 overflow-hidden">
                        <div 
                          className={cn("h-full", det.confidence > 90 ? "bg-primary" : "bg-accent")} 
                          style={{ width: `${det.confidence}%` }} 
                        />
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}