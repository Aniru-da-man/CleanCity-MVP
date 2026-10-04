import { Link } from "wouter";
import { Leaf, ArrowLeft, TrendingUp, Users, Globe, Zap, Award, MapPin, CheckCircle, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";

export function Impact() {
  const metrics = [
    { value: "1,842", label: "Incidents Resolved", sub: "Since Jan 2024 across 198 BBMP wards", color: "text-cyan-400" },
    { value: "4.2h", label: "Avg. Resolution Time", sub: "Down from 9.1h in 2023 — 54% improvement", color: "text-emerald-400" },
    { value: "87%", label: "Waste Collection Efficiency", sub: "Up 12% from 75% pre-deployment", color: "text-primary" },
    { value: "94%", label: "AI Detection Accuracy", sub: "YOLOv8 + Custom Karnataka model", color: "text-violet-400" },
    { value: "8,420", label: "Active Civic Reporters", sub: "2,100 new in Q4 2024", color: "text-amber-400" },
    { value: "12%", label: "AQI Improvement", sub: "30-day rolling average across Bengaluru", color: "text-emerald-400" },
    { value: "₹4.2Cr", label: "Annual Cost Savings", sub: "Predictive maintenance + optimized dispatch", color: "text-cyan-400" },
    { value: "196", label: "AI Detections/Day", sub: "Across 12 active cameras in Bengaluru", color: "text-rose-400" },
  ];

  const timeline = [
    { date: "Jan 2024", event: "CleanCity AI v1.0 launched", desc: "Pilot deployment in Cubbon Park, MG Road, and Koramangala with 4 cameras", type: "launch" },
    { date: "Mar 2024", event: "BBMP Integration Go-Live", desc: "Full integration with BBMP Solid Waste, BWSSB, and BESCOM departments", type: "milestone" },
    { date: "Jun 2024", event: "Civic Points Program Launch", desc: "8,420 citizens enrolled within 90 days; 2,184 verified reports in Month 1", type: "milestone" },
    { date: "Aug 2024", event: "12 Cameras Operational", desc: "Full coverage of Central Bengaluru including Peenya Industrial Area and Whitefield", type: "expansion" },
    { date: "Oct 2024", event: "Predictive Analytics v4 Deployed", desc: "87% waste surge accuracy achieved; Koramangala flood prediction pilot begins", type: "upgrade" },
    { date: "Jan 2025", event: "Platform v4.0 & ARIA Copilot", desc: "Natural language AI copilot launched with 14 intent categories; Mysuru pilot begins", type: "launch" },
    { date: "Q2 2025", event: "Mangaluru & Hubballi Onboarding", desc: "Expanding to coastal Karnataka and North Karnataka municipalities", type: "expansion" },
    { date: "Q4 2025", event: "National Scale Target", desc: "10 cities across 5 states; partnership with SMART Cities Mission India", type: "future" },
  ];

  const testimonials = [
    {
      quote: "CleanCity AI has transformed how BBMP responds to waste incidents. What used to take us 2 days is now resolved in under 4 hours. The predictive alerts are genuinely useful for planning our collection routes.",
      name: "Joint Commissioner, BBMP Solid Waste Management",
      org: "Bruhat Bengaluru Mahanagara Palike"
    },
    {
      quote: "I submitted my first report about an illegal dump near Cubbon Park and it was cleaned up the next morning. And I got points! This is how civic participation should feel.",
      name: "Sarah Jenkins",
      org: "Civic Points Member, Rank #42 · 8,540 points"
    },
    {
      quote: "The AQI monitoring has given our public health team real-time data to issue advisories during high-pollution days. We've issued 14 targeted advisories in Q1 2025 alone, specifically for Peenya and Whitefield residents.",
      name: "Deputy Director, Karnataka State Pollution Control Board",
      org: "KSPCB, Bengaluru"
    }
  ];

  return (
    <div className="min-h-screen bg-[#050814] text-slate-50 font-sans">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[150px]" />
        <div className="absolute top-[40%] right-[-10%] w-[30%] h-[40%] rounded-full bg-emerald-500/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[20%] w-[50%] h-[30%] rounded-full bg-violet-500/10 blur-[150px]" />
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-6">
            <TrendingUp className="w-4 h-4" /> Impact Report · 2024–2025
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Measurable Change Across Karnataka</h1>
          <p className="text-slate-400 max-w-2xl mx-auto">CleanCity AI has delivered real, measurable improvements in Bengaluru's cleanliness, environmental quality, and citizen engagement since January 2024.</p>
        </div>

        {/* Key metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {metrics.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              viewport={{ once: true }}
              className="glass-panel rounded-2xl border border-white/5 p-5 text-center"
            >
              <div className={`text-3xl font-bold font-mono mb-1 ${m.color}`}>{m.value}</div>
              <div className="text-sm font-semibold text-slate-200 mb-1">{m.label}</div>
              <div className="text-xs text-slate-500 leading-tight">{m.sub}</div>
            </motion.div>
          ))}
        </div>

        {/* Timeline */}
        <div className="glass-panel rounded-2xl border border-white/5 p-8 mb-12">
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-primary" /> Platform Timeline
          </h2>
          <div className="space-y-4">
            {timeline.map((item, i) => (
              <div key={i} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className={`w-3 h-3 rounded-full shrink-0 mt-1 ${item.type === 'future' ? 'bg-slate-600' : item.type === 'launch' ? 'bg-primary' : item.type === 'expansion' ? 'bg-violet-500' : 'bg-emerald-500'}`} />
                  {i < timeline.length - 1 && <div className="w-0.5 flex-1 bg-white/5 mt-1" />}
                </div>
                <div className="pb-4 flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-xs font-mono text-slate-500">{item.date}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${item.type === 'future' ? 'bg-slate-700 text-slate-400' : item.type === 'launch' ? 'bg-primary/20 text-primary' : item.type === 'expansion' ? 'bg-violet-500/20 text-violet-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                      {item.type === 'future' ? 'Roadmap' : item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                    </span>
                  </div>
                  <div className="font-semibold text-sm text-foreground">{item.event}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* City deployment */}
        <div className="glass-panel rounded-2xl border border-white/5 p-8 mb-12">
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
            <Globe className="w-6 h-6 text-primary" /> Deployment Footprint
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { city: "Bengaluru", state: "Karnataka", status: "Live", pop: "13.2M", cameras: 12, wards: 198, color: "emerald" },
              { city: "Mysuru", state: "Karnataka", status: "Pilot", pop: "1M", cameras: 4, wards: 65, color: "cyan" },
              { city: "Mangaluru", state: "Karnataka", status: "Onboarding", pop: "0.7M", cameras: 0, wards: 60, color: "amber" },
              { city: "Mumbai", state: "Maharashtra", status: "Trial", pop: "20M", cameras: 3, wards: 227, color: "violet" },
              { city: "Hubballi-Dharwad", state: "Karnataka", status: "Planned", pop: "1.1M", cameras: 0, wards: 85, color: "slate" },
              { city: "Hyderabad", state: "Telangana", status: "Planned", pop: "10M", cameras: 0, wards: 150, color: "slate" },
            ].map((city, i) => (
              <div key={i} className="bg-white/5 rounded-xl border border-white/5 p-5 flex items-start gap-4">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold">{city.city}</span>
                    <span className="text-xs text-slate-500">{city.state}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${city.status === 'Live' ? 'bg-emerald-500/20 text-emerald-400' : city.status === 'Pilot' ? 'bg-cyan-500/20 text-cyan-400' : city.status === 'Trial' ? 'bg-violet-500/20 text-violet-400' : city.status === 'Onboarding' ? 'bg-amber-500/20 text-amber-400' : 'bg-slate-700 text-slate-400'}`}>
                      {city.status}
                    </span>
                  </div>
                  <div className="flex gap-4 text-xs text-slate-500">
                    <span>Population: {city.pop}</span>
                    <span>Cameras: {city.cameras}</span>
                    <span>Wards: {city.wards}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
            <Award className="w-6 h-6 text-amber-500" /> Voices from the Field
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="glass-panel rounded-2xl border border-white/5 p-6 flex flex-col">
                <div className="text-4xl text-primary/30 font-serif mb-4">"</div>
                <p className="text-slate-300 text-sm leading-relaxed flex-1 italic">"{t.quote}"</p>
                <div className="mt-6 pt-4 border-t border-white/5">
                  <div className="font-semibold text-sm text-foreground">{t.name}</div>
                  <div className="text-xs text-primary mt-0.5">{t.org}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <Link href="/dashboard" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)]">
            <Zap className="w-5 h-5" /> Access CleanCity AI Dashboard
          </Link>
        </div>
      </main>

      <footer className="relative z-10 border-t border-white/10 py-8 text-center text-slate-600 text-sm">
        <p>© 2025 Urbanova Technologies Pvt. Ltd. · CIN: U72900KA2023PTC185421</p>
      </footer>
    </div>
  );
}
