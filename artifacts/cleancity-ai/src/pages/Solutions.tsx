import { Link } from "wouter";
import { Leaf, ArrowLeft, Trash2, Droplets, Construction, ShieldAlert, Trophy, BarChart3, CheckCircle, ArrowRight } from "lucide-react";

export function Solutions() {
  const solutions = [
    {
      icon: Trash2, color: "cyan",
      title: "Waste Management & Sanitation",
      subtitle: "End-to-End Cleanliness Operations",
      description: "CleanCity AI monitors all 12 CCTV cameras in Bengaluru for illegal dumping, overflowing bins, and littering — automatically raising incidents and routing them to the nearest available BBMP waste collection team.",
      capabilities: [
        "Real-time illegal dumping detection with 91–94% AI confidence",
        "Overflowing bin alerts before they become health hazards",
        "Route-optimized collection scheduling based on fill-level predictions",
        "Weekly ward-level waste generation reports for BBMP planning",
        "Predictive surge alerts (87% accuracy) for weekends and festivals",
        "Integration with BBMP Solid Waste Management Department workflows"
      ],
      stats: [
        { label: "Collection Efficiency", value: "87%" },
        { label: "Detection Accuracy", value: "94%" },
        { label: "Active Incidents", value: "8 today" }
      ],
      cities: "Deployed in Bengaluru · Piloting in Mysuru"
    },
    {
      icon: Droplets, color: "blue",
      title: "Drainage & Flood Management",
      subtitle: "Proactive Waterlogging Prevention",
      description: "Sensor networks and AI-powered predictive models monitor Bengaluru's storm drain capacity in real time, alerting field teams before waterlogging occurs — particularly during the Southwest monsoon season.",
      capabilities: [
        "IoT flow sensors at 18 critical drain points across Bengaluru",
        "72-hour flood risk forecasting integrated with IMD rainfall data",
        "Automated alerts to BWSSB drainage teams with GPS-optimized routing",
        "Post-event flooding hotspot analysis to prioritize drain upgrades",
        "Integration with BBMP storm water drain map for ward-level reporting",
        "Public alert system with ward-wise waterlogging risk ratings"
      ],
      stats: [
        { label: "Flood Risk Accuracy", value: "65%" },
        { label: "Active Drain Sensors", value: "18" },
        { label: "Avg. Alert Lead Time", value: "6 hours" }
      ],
      cities: "Bengaluru · Planned: Hubballi (flood-prone zones)"
    },
    {
      icon: Construction, color: "amber",
      title: "Road & Infrastructure Safety",
      subtitle: "Predictive Maintenance at Scale",
      description: "From pothole detection to streetlight failures, CleanCity AI identifies infrastructure degradation before it becomes dangerous, helping BBMP prioritize repair budgets and reduce road accidents.",
      capabilities: [
        "AI-assisted pothole and road damage detection via camera feeds",
        "Streetlight outage monitoring with ward-level outage maps",
        "Construction noise pollution monitoring with decibel thresholds",
        "Predictive failure modeling for roads based on age, traffic, and rainfall",
        "Auto-escalation to BBMP Roads Department with photo evidence",
        "Monthly infrastructure health scores per ward for budget allocation"
      ],
      stats: [
        { label: "Road Incidents Resolved", value: "2 this week" },
        { label: "Avg. Repair Time", value: "12 hours" },
        { label: "Predicted Savings", value: "₹1.2Cr/yr" }
      ],
      cities: "Bengaluru (Outer Ring Road, Whitefield, Koramangala)"
    },
    {
      icon: ShieldAlert, color: "red",
      title: "Hazardous Material Response",
      subtitle: "Critical Incident Command",
      description: "CleanCity AI's HazMat module provides real-time hazardous spill detection, exclusion zone management, KSPCB notification automation, and field team command for chemical and biological incidents.",
      capabilities: [
        "AI-powered hazardous spill detection with CAM-03 at Peenya Industrial Area",
        "Automatic KSPCB (Karnataka State Pollution Control Board) alert trigger",
        "Exclusion zone radius calculation based on substance type and wind direction",
        "HazMat team dispatch with PPE requirement checklist",
        "Incident evidence archival for legal and regulatory purposes",
        "Public advisory generation in Kannada, English, and Hindi"
      ],
      stats: [
        { label: "Active HazMat Alerts", value: "1 (Peenya)" },
        { label: "Response Time", value: "< 30 min" },
        { label: "KSPCB Integration", value: "Live" }
      ],
      cities: "Bengaluru Industrial Zones · Peenya · Whitefield EPIP"
    },
    {
      icon: Trophy, color: "violet",
      title: "Civic Engagement Platform",
      subtitle: "Citizens as Urban Guardians",
      description: "The Civic Points system transforms every Bengaluru resident into an active participant in city cleanliness — reporting incidents, earning rewards, and competing for community recognition.",
      capabilities: [
        "Mobile-friendly incident reporting with GPS auto-tagging and photo upload",
        "Civic Points awarded per verified report (base 50 pts + quality multipliers)",
        "8 achievement badges from Common to Legendary rarity levels",
        "City-wide and ward-level leaderboards updated in real-time",
        "Reward marketplace: BMTC passes, Yulu bikes, restaurant vouchers, eco-products",
        "Monthly community impact reports shared with BBMP for policy input"
      ],
      stats: [
        { label: "Active Citizens", value: "8,420" },
        { label: "Reports This Month", value: "2,184" },
        { label: "Rewards Redeemed", value: "312" }
      ],
      cities: "All 198 BBMP wards · Expanding to Mysuru"
    },
    {
      icon: BarChart3, color: "emerald",
      title: "Data & Policy Intelligence",
      subtitle: "Investor-Grade Municipal Analytics",
      description: "CleanCity AI generates comprehensive environmental, operational, and community reports that empower BBMP commissioners, smart city mission heads, and Karnataka state government to make data-driven policy decisions.",
      capabilities: [
        "Automated monthly environmental impact reports (PDF/Excel export)",
        "Weekly incident resolution scorecards per BBMP department",
        "Predictive analytics reports with 30-day and 90-day forecasts",
        "AI detection accuracy and model drift monitoring reports",
        "Civic engagement reports for community development fund applications",
        "Investment-ready smart city ROI dashboards for funding proposals"
      ],
      stats: [
        { label: "Reports Generated", value: "200+" },
        { label: "Data Points/Day", value: "4.2M" },
        { label: "Departments Covered", value: "4 (BBMP, BWSSB, BESCOM, BMP)" }
      ],
      cities: "Bengaluru · Data benchmarked against Mumbai, Pune, Hyderabad"
    }
  ];

  const colorMap: Record<string, string> = {
    cyan: "text-cyan-400 bg-cyan-400/10 border-cyan-400/20",
    blue: "text-blue-400 bg-blue-400/10 border-blue-400/20",
    amber: "text-amber-400 bg-amber-400/10 border-amber-400/20",
    red: "text-red-400 bg-red-400/10 border-red-400/20",
    violet: "text-violet-400 bg-violet-400/10 border-violet-400/20",
    emerald: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  };

  return (
    <div className="min-h-screen bg-[#050814] text-slate-50 font-sans">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[150px]" />
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
            Solutions
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Built for Every Urban Challenge</h1>
          <p className="text-slate-400 max-w-2xl mx-auto">Six domain-specific solutions, fully integrated into one platform. Deployed in Bengaluru. Scalable to every city in India.</p>
        </div>

        <div className="space-y-8">
          {solutions.map((sol, i) => (
            <div key={i} className="glass-panel rounded-2xl border border-white/5 p-8 hover:bg-white/[0.02] transition-colors">
              <div className="flex flex-col lg:flex-row gap-8">
                <div className="flex-1">
                  <div className="flex items-start gap-4 mb-6">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center border shrink-0 ${colorMap[sol.color]}`}>
                      <sol.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">{sol.title}</h2>
                      <p className={`text-sm font-medium ${colorMap[sol.color].split(' ')[0]}`}>{sol.subtitle}</p>
                    </div>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">{sol.description}</p>
                  <ul className="space-y-2">
                    {sol.capabilities.map((cap, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-slate-300">
                        <CheckCircle className={`w-4 h-4 shrink-0 mt-0.5 ${colorMap[sol.color].split(' ')[0]}`} />
                        {cap}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 text-xs text-slate-500 font-mono">{sol.cities}</div>
                </div>
                <div className="lg:w-56 space-y-3 shrink-0">
                  {sol.stats.map((stat, j) => (
                    <div key={j} className="bg-white/5 rounded-xl border border-white/5 p-4 text-center">
                      <div className={`text-2xl font-bold font-mono ${colorMap[sol.color].split(' ')[0]}`}>{stat.value}</div>
                      <div className="text-xs text-slate-500 mt-1">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/dashboard" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)]">
            See All Solutions Live <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </main>

      <footer className="relative z-10 border-t border-white/10 py-8 text-center text-slate-600 text-sm">
        <p>© 2025 Urbanova Technologies Pvt. Ltd. · CIN: U72900KA2023PTC185421</p>
      </footer>
    </div>
  );
}
