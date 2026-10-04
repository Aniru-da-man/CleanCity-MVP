import { Link } from "wouter";
import { Leaf, ArrowLeft, Cctv, Wind, Activity, BarChart3, Trophy, Bot, Map, ShieldCheck, Zap, Database, Globe } from "lucide-react";

export function Platform() {
  const modules = [
    {
      icon: Cctv, color: "cyan",
      title: "AI Vision Network",
      version: "YOLOv8 + Custom Karnataka Urban Dataset v3.1",
      features: [
        "Real-time detection across 12 CCTV cameras in Bengaluru",
        "Detection types: illegal dumping, overflowing bins, graffiti, vandalism, hazardous spills, loitering",
        "Average confidence score: 94% across all detection types",
        "Automatic incident ticket creation on high-confidence detections",
        "Evidence preservation with timestamped screenshot archival (72h raw video, 12-month metadata)"
      ],
      stat: "196 detections/day"
    },
    {
      icon: Wind, color: "emerald",
      title: "Environmental Intelligence",
      version: "6 AQI Stations · CPCB Grade A Sensors",
      features: [
        "Real-time monitoring of PM2.5, PM10, O₃, NO₂, SO₂, CO across Bengaluru",
        "Hyper-local AQI per station updated every 5 minutes",
        "30-day trend analysis and seasonal pattern modeling",
        "Automatic public health advisories when AQI exceeds 100 (USG threshold)",
        "Weather integration: temperature, humidity, wind, visibility, UV index",
        "KSPCB-integrated reporting for regulatory compliance"
      ],
      stat: "87 avg. AQI (Moderate)"
    },
    {
      icon: Activity, color: "violet",
      title: "Predictive Analytics Engine",
      version: "ML Pipeline v4.2 · 18-month training dataset",
      features: [
        "Waste surge prediction with 87% accuracy (48-hour forecast window)",
        "Flood/drainage risk modeling with 65% accuracy (72-hour window)",
        "Air quality deterioration forecasting per industrial zone",
        "Graffiti and vandalism hotspot prediction post-events",
        "Risk heatmaps updated every 6 hours across 198 BBMP wards",
        "Expanding dataset to Mumbai, Pune, Hyderabad for national benchmarking"
      ],
      stat: "87% forecast accuracy"
    },
    {
      icon: ShieldCheck, color: "amber",
      title: "Incident & Dispatch Management",
      version: "Integrated with BBMP, BWSSB, BESCOM, BMP",
      features: [
        "Full CRUD incident lifecycle: create, assign, update, resolve, archive",
        "Automatic department routing by incident type (Solid Waste → BBMP, Water → BWSSB)",
        "GPS-optimized field team dispatch with real-time tracking",
        "SLA enforcement with escalation triggers at 2h, 4h, 8h",
        "Mobile app for field agents with photo evidence capture",
        "Resolution rate tracking and weekly department scorecards"
      ],
      stat: "4.2h avg. resolution"
    },
    {
      icon: Trophy, color: "rose",
      title: "Civic Rewards Engine",
      version: "Community Platform v2.1",
      features: [
        "Civic Points earned per verified incident report",
        "Achievement badges: 8 types from Common to Legendary rarity",
        "City-wide leaderboard with weekly, monthly, and all-time rankings",
        "Reward marketplace: BMTC passes, Yulu subscriptions, restaurant vouchers, eco-products",
        "Streak system: daily reporting streaks unlock bonus multipliers",
        "Ward-level community engagement scores for government reporting"
      ],
      stat: "8,420 active citizens"
    },
    {
      icon: Bot, color: "cyan",
      title: "ARIA AI Copilot",
      version: "Intent-detection engine · 14 topic categories",
      features: [
        "Natural language interface to all city data (no SQL required)",
        "Keyword/intent detection for: incidents, AQI, garbage, flooding, potholes, rewards, dispatch, predictions, safety, municipality workflow, contact, platform usage",
        "Quick action shortcuts for common operator tasks",
        "Recent chat history with one-click reload",
        "Contextual suggestions after every response",
        "Expandable to voice interface in v5.0 roadmap"
      ],
      stat: "14 intent categories"
    },
  ];

  const colorMap: Record<string, string> = {
    cyan: "text-cyan-400 bg-cyan-400/10 border-cyan-400/20",
    emerald: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
    violet: "text-violet-400 bg-violet-400/10 border-violet-400/20",
    amber: "text-amber-400 bg-amber-400/10 border-amber-400/20",
    rose: "text-rose-400 bg-rose-400/10 border-rose-400/20",
  };

  return (
    <div className="min-h-screen bg-[#050814] text-slate-50 font-sans">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[150px]" />
        <div className="absolute top-[40%] right-[-10%] w-[30%] h-[40%] rounded-full bg-accent/10 blur-[120px]" />
      </div>

      <nav className="relative z-50 flex items-center justify-between px-6 md:px-12 py-6 border-b border-white/5 backdrop-blur-xl bg-black/20">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <Leaf className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight text-white">CleanCity AI</span>
        </Link>
        <Link href="/" className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
      </nav>

      <main className="relative z-10 max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
            <Zap className="w-4 h-4" /> Platform v4.0
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">The CleanCity AI Platform</h1>
          <p className="text-slate-400 max-w-2xl mx-auto">Six integrated modules — AI Vision, Environmental Sensing, Predictive Analytics, Incident Management, Civic Rewards, and ARIA Copilot — working as one unified OS for your city.</p>
        </div>

        {/* Stats bar */}
        <div className="glass-panel rounded-2xl border border-white/5 p-6 mb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { icon: Cctv, label: "Cameras Connected", value: "12" },
              { icon: Database, label: "Daily Data Points", value: "4.2M" },
              { icon: Globe, label: "BBMP Wards Covered", value: "198" },
              { icon: Map, label: "Cities Deployed", value: "4" },
            ].map(({ icon: Icon, label, value }, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <Icon className="w-6 h-6 text-primary opacity-60" />
                <div className="text-3xl font-bold font-mono text-white">{value}</div>
                <div className="text-xs text-slate-500 uppercase tracking-wider">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Modules */}
        <div className="space-y-6">
          {modules.map((mod, i) => (
            <div key={i} className="glass-panel rounded-2xl border border-white/5 p-8 hover:bg-white/[0.02] transition-colors">
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center border shrink-0 ${colorMap[mod.color]}`}>
                  <mod.icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center gap-2 mb-1">
                    <h2 className="text-xl font-bold">{mod.title}</h2>
                    <span className="text-xs text-slate-500 font-mono">{mod.version}</span>
                  </div>
                  <ul className="space-y-1.5 mt-4">
                    {mod.features.map((f, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-slate-400">
                        <span className={`text-xs mt-0.5 ${colorMap[mod.color].split(' ')[0]}`}>✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={`shrink-0 px-4 py-2 rounded-full border text-sm font-semibold whitespace-nowrap ${colorMap[mod.color]}`}>
                  {mod.stat}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/dashboard" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)]">
            Access Mission Control <ArrowLeft className="w-5 h-5 rotate-180" />
          </Link>
        </div>
      </main>

      <footer className="relative z-10 border-t border-white/10 py-8 text-center text-slate-600 text-sm">
        <p>© 2025 Urbanova Technologies Pvt. Ltd. · CIN: U72900KA2023PTC185421</p>
      </footer>
    </div>
  );
}
