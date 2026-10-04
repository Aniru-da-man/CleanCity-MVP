import { useListPredictions, useGetPredictionHotspots, useGetWasteForecast } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";
import { BrainCircuit, AlertTriangle, TrendingUp, Calendar, Zap, Map as MapIcon } from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from "recharts";
import { cn } from "@/lib/utils";

export function Analytics() {
  const { data: predictionsData, isLoading: loadingPredictions } = useListPredictions();
  const { data: hotspotsData, isLoading: loadingHotspots } = useGetPredictionHotspots();
  const { data: forecastData, isLoading: loadingForecast } = useGetWasteForecast();

  const predictions = predictionsData || [
    { id: 1, type: "Waste Overflow", title: "Downtown Bins Capacity", description: "Public waste bins in Downtown Sq expected to overflow during weekend event.", probability: 87, timeframe: "Next 48h", severity: "high", location: "Downtown Sq" },
    { id: 2, type: "Infrastructure", title: "Streetlight Failure Risk", description: "Voltage anomalies detected on 5th Ave grid indicating impending multi-block failure.", probability: 64, timeframe: "Next 7 days", severity: "medium", location: "5th Avenue" },
    { id: 3, type: "Traffic", title: "Intersection Congestion", description: "Unplanned construction on Route 9 likely to cause severe gridlock during evening commute.", probability: 92, timeframe: "Today 16:00", severity: "critical", location: "Route 9 / Main" },
    { id: 4, type: "Air Quality", title: "Particulate Matter Spike", description: "Incoming weather system combined with industrial output points to poor AQI.", probability: 75, timeframe: "Tomorrow morning", severity: "medium", location: "Industrial Zone" }
  ];

  const hotspots = hotspotsData || [
    { id: 1, location: "Peenya Industrial Zone", riskScore: 92, type: "Environmental", predictedIncidents: 14, lat: 13.0292, lng: 77.5171 },
    { id: 2, location: "Majestic Bus Terminal", riskScore: 85, type: "Waste / Cleanliness", predictedIncidents: 28, lat: 12.9776, lng: 77.5713 },
    { id: 3, location: "Hebbal Lake", riskScore: 78, type: "Infrastructure", predictedIncidents: 6, lat: 13.0358, lng: 77.5970 },
    { id: 4, location: "Whitefield Commercial", riskScore: 65, type: "Traffic", predictedIncidents: 11, lat: 12.9698, lng: 77.7499 },
  ];

  const forecast = forecastData || Array(12).fill(0).map((_, i) => ({
    week: `W${i+1}`,
    predicted: 120 + Math.sin(i * 0.5) * 40 + i * 5,
    actual: i < 8 ? 120 + Math.sin(i * 0.5) * 40 + i * 5 + (Math.random() * 20 - 10) : null,
    baseline: 110 + i * 4
  }));

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
            Predictive Analytics
            <span className="px-2 py-0.5 rounded bg-violet-500/20 text-violet-400 text-xs font-mono uppercase border border-violet-500/30">AI Active</span>
          </h1>
          <p className="text-muted-foreground mt-1">Machine learning forecasts for proactive resource allocation.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="glass-panel p-4 rounded-xl border border-white/5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center border border-primary/30">
            <BrainCircuit className="w-6 h-6 text-primary" />
          </div>
          <div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider">Model Accuracy</div>
            <div className="text-2xl font-bold">94.2%</div>
          </div>
        </div>
        <div className="glass-panel p-4 rounded-xl border border-white/5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-violet-500/20 flex items-center justify-center border border-violet-500/30">
            <Zap className="w-6 h-6 text-violet-400" />
          </div>
          <div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider">Predictions (7d)</div>
            <div className="text-2xl font-bold">1,402</div>
          </div>
        </div>
        <div className="glass-panel p-4 rounded-xl border border-white/5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
            <TrendingUp className="w-6 h-6 text-emerald-500" />
          </div>
          <div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider">Resources Saved</div>
            <div className="text-2xl font-bold">$42.5k</div>
          </div>
        </div>
        <div className="glass-panel p-4 rounded-xl border border-white/5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-amber-500/20 flex items-center justify-center border border-amber-500/30">
            <AlertTriangle className="w-6 h-6 text-amber-500" />
          </div>
          <div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider">Averted Incidents</div>
            <div className="text-2xl font-bold">38</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Predictions Feed */}
        <div className="lg:col-span-1 space-y-4">
          <h3 className="text-lg font-semibold px-1">Critical Forecasts</h3>
          {predictions.map(pred => (
            <div key={pred.id} className="glass-panel p-5 rounded-xl border border-white/5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <BrainCircuit className="w-24 h-24 absolute -top-6 -right-6" />
              </div>
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-2">
                  <span className={cn(
                    "text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded border",
                    pred.severity === 'critical' ? 'bg-red-500/20 text-red-400 border-red-500/30' :
                    pred.severity === 'high' ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' :
                    'bg-blue-500/20 text-blue-400 border-blue-500/30'
                  )}>
                    {pred.severity} Risk
                  </span>
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground">Probability</div>
                    <div className="font-mono font-bold text-primary">{pred.probability}%</div>
                  </div>
                </div>
                <h4 className="font-semibold text-foreground mb-1">{pred.title}</h4>
                <p className="text-xs text-muted-foreground mb-4 line-clamp-2">{pred.description}</p>
                <div className="flex items-center gap-4 text-xs font-medium text-slate-300 bg-white/5 p-2 rounded">
                  <div className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {pred.timeframe}</div>
                  <div className="flex items-center gap-1.5"><MapIcon className="w-3.5 h-3.5" /> {pred.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-2 space-y-6 flex flex-col">
          {/* Chart */}
          <div className="glass-panel p-6 rounded-xl border border-white/5">
            <div className="mb-6">
              <h3 className="text-lg font-semibold">Waste Generation Forecast</h3>
              <p className="text-sm text-muted-foreground">Predicted vs actual volume (tons) for autonomous fleet routing</p>
            </div>
            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={forecast} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis dataKey="week" stroke="rgba(255,255,255,0.4)" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="rgba(255,255,255,0.4)" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}
                  />
                  <Area type="monotone" dataKey="baseline" stroke="rgba(255,255,255,0.2)" strokeDasharray="5 5" fill="none" />
                  <Area type="monotone" dataKey="predicted" stroke="hsl(var(--primary))" strokeWidth={2} fillOpacity={1} fill="url(#colorPredicted)" />
                  <Area type="monotone" dataKey="actual" stroke="hsl(var(--accent))" strokeWidth={2} fillOpacity={1} fill="url(#colorActual)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Hotspots Table */}
          <div className="glass-panel p-6 rounded-xl border border-white/5 flex-1">
            <h3 className="text-lg font-semibold mb-4">Emerging Risk Hotspots</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-muted-foreground uppercase border-b border-white/10">
                  <tr>
                    <th className="px-4 py-3 font-medium">Location Area</th>
                    <th className="px-4 py-3 font-medium">Primary Risk Vector</th>
                    <th className="px-4 py-3 font-medium">Projected Incidents</th>
                    <th className="px-4 py-3 font-medium text-right">AI Risk Score</th>
                  </tr>
                </thead>
                <tbody>
                  {hotspots.map((spot, i) => (
                    <tr key={spot.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                      <td className="px-4 py-3 font-medium text-foreground">{spot.location}</td>
                      <td className="px-4 py-3 text-muted-foreground">{spot.type}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span className="font-mono">{spot.predictedIncidents}</span>
                          <TrendingUp className="w-3 h-3 text-red-400" />
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-3">
                          <div className="w-24 bg-black/40 rounded-full h-1.5 overflow-hidden">
                            <div 
                              className={cn("h-full", spot.riskScore > 80 ? "bg-red-500" : "bg-amber-500")} 
                              style={{ width: `${spot.riskScore}%` }} 
                            />
                          </div>
                          <span className="font-mono font-bold w-6">{spot.riskScore}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}