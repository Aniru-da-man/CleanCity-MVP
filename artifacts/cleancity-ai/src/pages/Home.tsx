import { motion } from "framer-motion";
import { Link } from "wouter";
import { Leaf, Activity, Cctv, Wind, ChevronRight, ShieldCheck, Map as MapIcon, BarChart3, TrendingUp, TrendingDown, Bot, Trophy, ArrowRight, Zap, Globe, Users, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Fix leaflet default icon paths
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const makePinIcon = (color: string, pulse = false) =>
  L.divIcon({
    className: '',
    html: `<div style="position:relative;width:22px;height:22px;">
      ${pulse ? `<div style="position:absolute;inset:0;border-radius:50%;background:${color};opacity:0.4;animation:ping 1.4s cubic-bezier(0,0,0.2,1) infinite;"></div>` : ''}
      <div style="position:absolute;inset:3px;border-radius:50%;background:${color};border:2px solid rgba(255,255,255,0.7);box-shadow:0 0 8px ${color};"></div>
    </div>`,
    iconSize: [22, 22],
    iconAnchor: [11, 11],
    popupAnchor: [0, -12],
  });

const heroMapMarkers = [
  { lat: 13.0300, lng: 77.5200, color: "#ef4444", label: "Peenya Spill", type: "Critical", pulse: true },
  { lat: 12.9763, lng: 77.5929, color: "#f59e0b", label: "Cubbon Park", type: "High", pulse: true },
  { lat: 12.9352, lng: 77.6245, color: "#06b6d4", label: "Koramangala Sensor", type: "Sensor", pulse: false },
  { lat: 12.9698, lng: 77.7500, color: "#10b981", label: "Whitefield Sensor", type: "Sensor", pulse: false },
  { lat: 12.9102, lng: 77.5847, color: "#f59e0b", label: "JP Nagar", type: "High", pulse: false },
  { lat: 13.1005, lng: 77.5963, color: "#06b6d4", label: "Yelahanka Sensor", type: "Sensor", pulse: false },
  { lat: 13.0358, lng: 77.5970, color: "#a78bfa", label: "Hebbal", type: "Monitor", pulse: false },
  { lat: 12.8456, lng: 77.6603, color: "#ef4444", label: "Electronic City", type: "Critical", pulse: false },
];

const heroDetections = [
  { cam: "CAM-03", label: "Hazardous Spill", loc: "Peenya Industrial Area", conf: 88, severity: "critical", time: "8m ago", color: "text-red-400 bg-red-500/10" },
  { cam: "CAM-01", label: "Illegal Dumping", loc: "Vidhana Soudha Gate", conf: 94, severity: "high", time: "12m ago", color: "text-amber-400 bg-amber-500/10" },
  { cam: "CAM-07", label: "Illegal Dumping", loc: "Cubbon Park North", conf: 92, severity: "high", time: "18m ago", color: "text-amber-400 bg-amber-500/10" },
  { cam: "CAM-12", label: "Graffiti", loc: "Majestic Metro Station", conf: 97, severity: "low", time: "25m ago", color: "text-emerald-400 bg-emerald-500/10" },
];

const impactStats = [
  { label: "Incidents Resolved", value: "1,842", sub: "across 198 BBMP wards", trend: "+12% this month", up: true },
  { label: "Avg. Resolution Time", value: "4.2h", sub: "down from 9.1h in 2023", trend: "-54% improvement", up: true },
  { label: "Citizens Engaged", value: "8,420", sub: "active civic reporters", trend: "+2,100 this quarter", up: true },
  { label: "AI Detection Accuracy", value: "94%", sub: "YOLOv8 + custom model", trend: "+6% vs baseline", up: true },
  { label: "AQI Improvement", value: "12%", sub: "30-day rolling average", trend: "Bengaluru-wide", up: true },
  { label: "Cost Savings", value: "₹4.2Cr", sub: "annual municipal savings", trend: "Predictive maintenance", up: true },
];

const solutionCards = [
  {
    title: "Waste & Sanitation",
    description: "AI-powered illegal dumping detection, overflowing bin alerts, and automated waste collection scheduling optimized by route density and predictive models.",
    icon: "🗑️",
    stat: "87% collection efficiency"
  },
  {
    title: "Environmental Health",
    description: "Hyper-local AQI monitoring across 6 stations in Bengaluru. Real-time PM2.5, PM10, O₃, NO₂ tracking with public health advisories triggered automatically.",
    icon: "🌱",
    stat: "AQI monitored every 5 min"
  },
  {
    title: "Infrastructure Safety",
    description: "Pothole detection, road damage tracking, drainage monitoring, and streetlight failure alerts — all automated with predictive failure modeling.",
    icon: "🏗️",
    stat: "65% fewer road incidents"
  },
  {
    title: "Public Safety",
    description: "Computer vision monitoring for graffiti, vandalism, loitering, and hazardous materials. Instant alerts to field teams with GPS dispatch.",
    icon: "🛡️",
    stat: "4.2h avg. resolution"
  },
  {
    title: "Civic Engagement",
    description: "Gamified citizen reporting with Civic Points, achievement badges, reward marketplace, and city-wide leaderboards to drive community participation.",
    icon: "🏆",
    stat: "8,420 active reporters"
  },
  {
    title: "Predictive Intelligence",
    description: "Machine learning models trained on 18 months of historical data across Karnataka cities to forecast waste surges, flooding risks, and pollution spikes.",
    icon: "🔮",
    stat: "87% forecast accuracy"
  },
];

export function Home() {
  return (
    <div className="min-h-screen bg-[#050814] text-slate-50 overflow-hidden font-sans selection:bg-primary/30">
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[150px]" />
        <div className="absolute top-[40%] right-[-10%] w-[30%] h-[40%] rounded-full bg-accent/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[20%] w-[50%] h-[30%] rounded-full bg-violet-500/10 blur-[150px]" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CgkJPHBhdGggZD0iTTAgMGg0MHY0MEgweiIgZmlsbD0ibm9uZSIvPgoJCTxwYXRoIGQ9Ik0wIDM5LTVsNDAgLjVMNDAgNDAuNWgtNDB6TTM5LjUgMGwuNSA0MGguNWwtLjUtNDB6IiBmaWxsPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDMpIi8+Cgk8L3N2Zz4=')] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]" />
      </div>

      {/* Navigation */}
      <nav className="relative z-50 flex items-center justify-between px-6 md:px-12 py-6 border-b border-white/5 glass-panel">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center glow-cyan">
            <Leaf className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight text-white glow-text-cyan">CleanCity AI</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <a href="#platform" className="hover:text-white transition-colors">Platform</a>
          <a href="#solutions" className="hover:text-white transition-colors">Solutions</a>
          <a href="#impact" className="hover:text-white transition-colors">Impact</a>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
            Sign In
          </Link>
          <Link href="/dashboard" className="px-5 py-2.5 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-sm transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)]">
            Deploy Now
          </Link>
        </div>
      </nav>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            System Version 4.0 Now Live — Bengaluru, Karnataka
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-slate-200 to-slate-500 mb-8 max-w-4xl"
          >
            The Operating System for <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent glow-text-cyan">Smart Cities</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-400 max-w-2xl mb-12"
          >
            Real-time environmental intelligence, predictive maintenance, and AI-powered public safety command center. Turn your urban data into decisive action.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <Link href="/dashboard" className="px-8 py-4 rounded-full bg-white text-black font-bold hover:bg-slate-200 transition-colors flex items-center gap-2 text-lg w-full sm:w-auto justify-center shadow-xl">
              Access Mission Control
              <ChevronRight className="w-5 h-5" />
            </Link>
            <a href="#platform" className="px-8 py-4 rounded-full glass-panel font-medium hover:bg-white/10 transition-colors w-full sm:w-auto justify-center text-center">
              Explore Capabilities
            </a>
          </motion.div>

          {/* Hero Visual */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-20 w-full max-w-5xl relative"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#050814] via-transparent to-transparent z-10 pointer-events-none" />
            <div className="glass-panel rounded-xl border border-white/10 overflow-hidden relative shadow-2xl">
              <div className="h-12 bg-white/5 border-b border-white/10 flex items-center px-4 gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="ml-3 text-xs text-slate-500 font-mono">CleanCity AI — Command Dashboard — Bengaluru, Karnataka</span>
              </div>
              <div className="bg-[#080d1a] p-5 relative" style={{ minHeight: '460px' }}>
                <div className="grid grid-cols-3 gap-5 h-full" style={{ minHeight: '420px' }}>
                  {/* Left column — KPI cards + Map */}
                  <div className="col-span-2 flex flex-col gap-4" style={{ minHeight: '420px' }}>
                    {/* KPI row */}
                    <div className="flex gap-4">
                      <div className="flex-1 bg-[#0e1525] border border-white/10 p-4 rounded-xl flex flex-col gap-2">
                        <span className="text-slate-400 text-xs font-mono uppercase tracking-wider">Air Quality (AQI)</span>
                        <div className="text-3xl font-bold text-cyan-400">87 <span className="text-sm font-normal text-slate-400">Moderate</span></div>
                        <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden mt-1">
                          <div className="h-full bg-cyan-400 w-[58%]" />
                        </div>
                        <span className="text-[11px] text-slate-400">Peenya: 105 · Bannerghatta: 62</span>
                      </div>
                      <div className="flex-1 bg-[#0e1525] border border-white/10 p-4 rounded-xl flex flex-col gap-2">
                        <span className="text-slate-400 text-xs font-mono uppercase tracking-wider">Active Incidents</span>
                        <div className="text-3xl font-bold text-accent">8</div>
                        <div className="flex items-center gap-1 text-xs text-emerald-400">
                          <TrendingDown className="w-3 h-3" />
                          <span>2 resolved today</span>
                        </div>
                        <span className="text-[11px] text-slate-400">3 critical · 3 open · 2 resolved</span>
                      </div>
                    </div>

                    {/* Real Leaflet Map */}
                    <div className="bg-[#0e1525] border border-white/10 rounded-xl flex flex-col flex-1 overflow-hidden">
                      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10 shrink-0">
                        <span className="text-slate-300 text-xs font-mono uppercase tracking-wider font-semibold">City Map Overview — Bengaluru</span>
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse inline-block" />
                          <span className="text-[11px] text-emerald-400 font-mono font-semibold">LIVE · 198 BBMP Wards</span>
                        </div>
                      </div>
                      <div className="flex-1 relative" style={{ minHeight: '220px' }}>
                        {/* CSS for ping animation inside Leaflet DivIcons */}
                        <style>{`
                          @keyframes ping { 75%,100%{transform:scale(2);opacity:0} }
                          .leaflet-container { background: #0e1525 !important; }
                          .leaflet-tile { filter: brightness(0.85) saturate(1.1); }
                          .leaflet-control-zoom a { background:#0e1525 !important; color:#94a3b8 !important; border-color:#334155 !important; }
                          .leaflet-control-zoom a:hover { background:#1e293b !important; color:#e2e8f0 !important; }
                          .leaflet-popup-content-wrapper { background:#0e1525 !important; border:1px solid rgba(255,255,255,0.12) !important; color:#e2e8f0 !important; border-radius:8px !important; box-shadow:0 8px 32px rgba(0,0,0,0.5) !important; }
                          .leaflet-popup-tip { background:#0e1525 !important; }
                          .leaflet-popup-content { margin:10px 14px !important; font-size:12px !important; }
                          .leaflet-attribution-flag { display:none !important; }
                        `}</style>
                        <MapContainer
                          center={[12.9716, 77.5946]}
                          zoom={11}
                          zoomControl={false}
                          scrollWheelZoom={false}
                          dragging={false}
                          doubleClickZoom={false}
                          attributionControl={false}
                          style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}
                        >
                          <TileLayer
                            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                          />
                          {heroMapMarkers.map((m, i) => (
                            <Marker key={i} position={[m.lat, m.lng]} icon={makePinIcon(m.color, m.pulse)}>
                              <Popup>
                                <div className="text-xs">
                                  <div className="font-semibold text-slate-100">{m.label}</div>
                                  <div style={{ color: m.color }} className="text-[11px] mt-0.5">{m.type}</div>
                                </div>
                              </Popup>
                            </Marker>
                          ))}
                        </MapContainer>
                        {/* Legend overlay */}
                        <div className="absolute bottom-3 left-3 z-[999] flex gap-3 text-[11px] text-slate-300 bg-[#0e1525]/90 border border-white/10 rounded-lg px-3 py-2 pointer-events-none">
                          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" />Critical</span>
                          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />High</span>
                          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-cyan-400 inline-block" />Sensor</span>
                          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-violet-400 inline-block" />Monitor</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right column */}
                  <div className="flex flex-col gap-4">
                    {/* AI Detections */}
                    <div className="bg-[#0e1525] border border-white/10 rounded-xl p-4 flex flex-col gap-3 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-300 text-xs font-mono uppercase tracking-wider font-semibold">AI Detections</span>
                        <span className="text-[11px] text-emerald-400 font-mono flex items-center gap-1 font-semibold">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse inline-block" />
                          196 today
                        </span>
                      </div>
                      <div className="space-y-2 flex-1 overflow-hidden">
                        {heroDetections.map((d, i) => (
                          <div key={i} className="flex items-center gap-2 p-2.5 rounded-lg bg-white/[0.04] border border-white/8">
                            <div className={cn("w-7 h-7 rounded-lg flex items-center justify-center shrink-0", d.color)}>
                              <Cctv className="w-3.5 h-3.5" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-[11px] font-semibold text-slate-100 truncate">{d.label}</div>
                              <div className="text-[10px] text-slate-400 truncate">{d.loc}</div>
                              <div className="flex items-center gap-1 mt-1">
                                <div className="h-1 rounded-full bg-white/10 flex-1 overflow-hidden">
                                  <div className="h-full bg-cyan-400" style={{ width: `${d.conf}%` }} />
                                </div>
                                <span className="text-[10px] text-slate-300 shrink-0 font-medium">{d.conf}%</span>
                              </div>
                            </div>
                            <span className="text-[10px] text-slate-500 shrink-0">{d.time}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* ARIA Copilot */}
                    <div className="bg-[#0e1525] border border-cyan-500/30 rounded-xl p-4 flex flex-col gap-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-cyan-500/15 flex items-center justify-center">
                          <Bot className="w-4.5 h-4.5 text-cyan-400" style={{ width: 18, height: 18 }} />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-slate-100">ARIA Copilot</div>
                          <div className="flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse inline-block" />
                            <span className="text-[11px] text-emerald-400 font-semibold">Online</span>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-1.5 text-[11px] font-mono">
                        <div className="flex justify-between text-slate-300">
                          <span className="text-slate-500">Endpoints</span>
                          <span className="text-cyan-400 font-semibold">4,201</span>
                        </div>
                        <div className="flex justify-between text-slate-300">
                          <span className="text-slate-500">Model</span>
                          <span>ARIA v4.0</span>
                        </div>
                        <div className="flex justify-between text-slate-300">
                          <span className="text-slate-500">Inference</span>
                          <span className="text-emerald-400">38 ms</span>
                        </div>
                        <div className="flex justify-between text-slate-300">
                          <span className="text-slate-500">Status</span>
                          <span className="text-emerald-400">Nominal</span>
                        </div>
                      </div>
                      <div className="bg-black/40 rounded-lg p-2.5 border border-white/5">
                        <p className="text-[10px] text-cyan-300 font-mono leading-relaxed">
                          <span className="text-slate-500">› </span>Monitoring Bengaluru city grid. No anomalies. Next patrol scan in 00:47.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Platform / Features Grid */}
        <section id="platform" className="py-24 px-6 md:px-12 border-t border-white/5 bg-black/20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Complete Urban Intelligence</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">A unified platform integrating computer vision, IoT sensors, and predictive AI to manage city operations autonomously.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <FeatureCard icon={Cctv} title="AI Vision Network" description="Connect existing CCTV infrastructure to our neural network for real-time anomaly detection, traffic flow analysis, and security alerts." color="cyan" />
              <FeatureCard icon={Wind} title="Environmental Sensing" description="Hyper-local air quality monitoring, micro-climate tracking, and pollution forecasting with precision up to a 50-meter radius." color="emerald" />
              <FeatureCard icon={Activity} title="Predictive Maintenance" description="Machine learning models that predict infrastructure failures before they happen, optimizing city maintenance budgets by up to 34%." color="violet" />
              <FeatureCard icon={ShieldCheck} title="Automated Dispatch" description="Intelligent routing of municipal services based on severity, location, and real-time traffic conditions to ensure rapid response." color="amber" />
              <FeatureCard icon={BarChart3} title="Data-Driven Policy" description="Generate investor-grade reports and analyze long-term urban trends to support funding initiatives and smart policy decisions." color="rose" />
              <FeatureCard icon={Trophy} title="Civic Engagement" description="Gamified community reporting that turns citizens into active participants in maintaining neighborhood cleanliness and safety." color="cyan" />
            </div>
          </div>
        </section>

        {/* Solutions Section */}
        <section id="solutions" className="py-24 px-6 md:px-12 border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <span className="inline-block text-xs font-mono uppercase tracking-widest text-primary mb-4">Solutions</span>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Built for Every Urban Challenge</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">From garbage collection to hazardous spills — CleanCity AI handles every dimension of urban cleanliness and public safety.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {solutionCards.map((card, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  viewport={{ once: true }}
                  className="glass-panel p-6 rounded-2xl border border-white/5 hover:bg-white/[0.03] transition-colors group"
                >
                  <div className="text-3xl mb-4">{card.icon}</div>
                  <h3 className="text-lg font-semibold mb-2 text-slate-200 group-hover:text-white transition-colors">{card.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4">{card.description}</p>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium">
                    <CheckCircle className="w-3 h-3" />
                    {card.stat}
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="mt-12 text-center">
              <Link href="/dashboard" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)]">
                Explore All Solutions <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Impact Section */}
        <section id="impact" className="py-24 px-6 md:px-12 border-t border-white/5 bg-black/30">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <span className="inline-block text-xs font-mono uppercase tracking-widest text-accent mb-4">Impact</span>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Real Results Across Karnataka</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">CleanCity AI is deployed across Bengaluru with expanding presence in Mysuru, Mangaluru, and Hubballi — demonstrating measurable impact at scale.</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-16">
              {impactStats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  viewport={{ once: true }}
                  className="glass-panel p-6 rounded-2xl border border-white/5 text-center"
                >
                  <div className="text-3xl md:text-4xl font-bold font-mono text-white mb-2">{stat.value}</div>
                  <div className="text-sm font-semibold text-slate-200 mb-1">{stat.label}</div>
                  <div className="text-xs text-slate-500 mb-3">{stat.sub}</div>
                  <div className="inline-flex items-center gap-1 text-xs text-emerald-400">
                    <TrendingUp className="w-3 h-3" />
                    {stat.trend}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* City rollout */}
            <div className="glass-panel rounded-2xl border border-white/5 p-8">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Globe className="w-5 h-5 text-primary" />
                    <h3 className="text-xl font-bold">Deployed Across India</h3>
                  </div>
                  <p className="text-slate-400 text-sm max-w-lg">Starting with Bengaluru, CleanCity AI is expanding to all major Karnataka cities and demonstrating a replicable model for smart governance nationwide.</p>
                </div>
                <div className="grid grid-cols-2 gap-4 shrink-0">
                  {[
                    { city: "Bengaluru", state: "Karnataka", status: "Live", cameras: 12 },
                    { city: "Mysuru", state: "Karnataka", status: "Pilot", cameras: 4 },
                    { city: "Mangaluru", state: "Karnataka", status: "Onboarding", cameras: 0 },
                    { city: "Mumbai", state: "Maharashtra", status: "Trial", cameras: 3 },
                  ].map((city, i) => (
                    <div key={i} className="bg-white/5 rounded-lg p-3 border border-white/5">
                      <div className="font-semibold text-sm text-foreground">{city.city}</div>
                      <div className="text-xs text-slate-500 mb-2">{city.state}</div>
                      <div className={cn(
                        "inline-block text-[10px] px-2 py-0.5 rounded-full font-medium",
                        city.status === 'Live' ? "bg-emerald-500/20 text-emerald-400" :
                        city.status === 'Pilot' ? "bg-primary/20 text-primary" :
                        city.status === 'Trial' ? "bg-violet-500/20 text-violet-400" :
                        "bg-slate-500/20 text-slate-400"
                      )}>
                        {city.status}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-12 text-center">
              <Link href="/dashboard" className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/20 hover:border-white/40 text-white font-semibold transition-all hover:bg-white/5">
                <Users className="w-5 h-5" />
                Join 8,420+ Civic Champions
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-12 px-6 md:px-12 border-t border-white/10 bg-black/40 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Leaf className="w-5 h-5 text-primary" />
                <span className="font-bold text-white">CleanCity AI</span>
              </div>
              <p className="text-slate-500 text-xs leading-relaxed">The Operating System for Smart Cities. By Urbanova Technologies, Bengaluru.</p>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4">Platform</h4>
              <div className="space-y-2">
                <Link href="/platform" className="block text-sm text-slate-500 hover:text-white transition-colors">Features</Link>
                <Link href="/solutions" className="block text-sm text-slate-500 hover:text-white transition-colors">Solutions</Link>
                <Link href="/impact" className="block text-sm text-slate-500 hover:text-white transition-colors">Impact</Link>
                <Link href="/dashboard" className="block text-sm text-slate-500 hover:text-white transition-colors">Dashboard</Link>
              </div>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4">Company</h4>
              <div className="space-y-2">
                <Link href="/contact" className="block text-sm text-slate-500 hover:text-white transition-colors">Contact</Link>
                <Link href="/security" className="block text-sm text-slate-500 hover:text-white transition-colors">Security</Link>
                <a href="#impact" className="block text-sm text-slate-500 hover:text-white transition-colors">Careers</a>
              </div>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4">Legal</h4>
              <div className="space-y-2">
                <Link href="/privacy" className="block text-sm text-slate-500 hover:text-white transition-colors">Privacy Policy</Link>
                <Link href="/terms" className="block text-sm text-slate-500 hover:text-white transition-colors">Terms & Conditions</Link>
                <Link href="/security" className="block text-sm text-slate-500 hover:text-white transition-colors">Security Policy</Link>
              </div>
            </div>
          </div>
          <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <Zap className="w-3 h-3 text-primary" />
              Powered by ARIA — Adaptive Resource Intelligence v4.0
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, description, color }: { icon: any, title: string, description: string, color: 'cyan' | 'emerald' | 'violet' | 'amber' | 'rose' }) {
  const colorMap = {
    cyan: "text-cyan-400 bg-cyan-400/10",
    emerald: "text-emerald-400 bg-emerald-400/10",
    violet: "text-violet-400 bg-violet-400/10",
    amber: "text-amber-400 bg-amber-400/10",
    rose: "text-rose-400 bg-rose-400/10"
  };
  return (
    <div className="glass-panel p-8 rounded-2xl border border-white/5 hover:bg-white/[0.03] transition-colors group cursor-default">
      <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-6", colorMap[color])}>
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-xl font-semibold mb-3 group-hover:text-white text-slate-200 transition-colors">{title}</h3>
      <p className="text-slate-400 leading-relaxed text-sm">{description}</p>
    </div>
  );
}
