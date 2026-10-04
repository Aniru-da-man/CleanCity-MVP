import { useState, useRef, useEffect } from "react";
import { Bot, Send, User, Sparkles, AlertTriangle, Wind, Map as MapIcon, Loader2, Trash2, Droplets, ShieldAlert } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  role: 'user' | 'ai';
  content: string;
  timestamp: string;
  suggestions?: string[];
}

function getARIAResponse(input: string): { content: string; suggestions: string[] } {
  const lower = input.toLowerCase();

  if (/^(hi|hello|hey|good morning|good afternoon|good evening|namaste|howdy)/i.test(lower.trim())) {
    return {
      content: "Hello! I'm ARIA — your Adaptive Resource Intelligence Assistant for Bengaluru's CleanCity AI platform. I'm currently monitoring 4,201 endpoints across the city network. All systems are nominal, though I've detected a new dumping incident near Cubbon Park that needs attention. How can I assist you today?",
      suggestions: ["Show active incidents", "Check AQI status", "Generate daily summary"]
    };
  }

  if (/garbage|waste|collection|bin|dumping|litter|trash|solid waste/i.test(lower)) {
    return {
      content: "Garbage & waste analysis for Bengaluru:\n\n• City generates ~5,200 tonnes/day across 198 BBMP wards\n• 8 active illegal dumping incidents — 3 in progress, 3 open\n• High-risk zones: Peenya Industrial Area (risk score 9.4), Cubbon Park North (6.8), Yelahanka (7.2)\n• Collection efficiency: 87% this week (+3% from last week)\n• Recommendation: Dispatch Waste Removal Team B to Peenya Industrial Area immediately for the hazardous spill",
      suggestions: ["Dispatch Team B to Peenya", "View waste hotspot map", "Generate waste forecast"]
    };
  }

  if (/pothole|road damage|road repair|crater|road|infrastructure|street/i.test(lower)) {
    return {
      content: "Road infrastructure analysis:\n\n• 3 road damage incidents recorded this week\n• Resolved: Outer Ring Road pothole at Marathahalli (Road Repair Crew 4, 12h ago)\n• Active: Whitefield Construction noise complaint open\n• Predictive model: 65% probability of new pothole formation on Whitefield Main Road due to recent 85mm rainfall\n• Road Repair Crew 4 is currently returning to base — available for redeployment in ~45 minutes",
      suggestions: ["View road damage incidents", "Request inspection", "Generate infrastructure brief"]
    };
  }

  if (/drain|flood|water|storm|sewage|pipe|waterlog/i.test(lower)) {
    return {
      content: "Drainage & flooding status:\n\n• Active: Street flooding on 80 Feet Rd, Koramangala 4th Block — Drainage Crew Alpha en route (ETA 18 min)\n• Sensor alert: 3 storm drain sensors near Hebbal Lake showing elevated flow rates\n• Predictive risk: 65% probability of storm drain overload in Koramangala within 72h (heavy rainfall forecasted)\n• Recommendation: Pre-position 2 portable pumping units at Sony World Junction and Forum Mall intersection before tonight",
      suggestions: ["Track Drainage Crew Alpha", "View flood risk map", "Issue weather advisory"]
    };
  }

  if (/complaint|status|incident|ticket|open|resolved|progress/i.test(lower)) {
    return {
      content: "Incident management summary:\n\n• Total active: 8 incidents (3 in progress, 3 open, 2 resolved today)\n• 🔴 Critical: Hazardous chemical spill, Peenya Industrial Area — HazMat on site\n• 🟠 High: Illegal dumping, Cubbon Park — unassigned\n• 🟡 Medium: Overflowing bin, MG Road & Brigade Road — unassigned\n• Resolution rate: 85% (↑6% from last week)\n• Avg. resolution time: 4.2 hours\n• Oldest open ticket: 10 hours (noise complaint, Whitefield)",
      suggestions: ["View all incidents", "Filter critical only", "Show resolution trends"]
    };
  }

  if (/reward|point|badge|leaderboard|civic|community|citizen|gamif/i.test(lower)) {
    return {
      content: "Community Rewards — Bengaluru CleanCity:\n\n• 8,420 active citizens enrolled in Civic Points program\n• This week's top reporter: Marcus T. (412 reports, 24,500 pts)\n• You're ranked #42 with 8,540 points — only 960 pts from top 10!\n• Recycling engagement up 8% this quarter in Electronic City\n• Most redeemed rewards: BMTC monthly passes (↑23%) and Yulu bike subscriptions\n• 3 new badges unlocked in the city today\n• Tip: Submit 3 more verified reports to unlock the 'Eagle Eye' badge",
      suggestions: ["View leaderboard", "Check my badges", "Browse reward marketplace"]
    };
  }

  if (/dashboard|overview|summary|how to use|guide|tutorial|navigate/i.test(lower)) {
    return {
      content: "Platform navigation guide:\n\n• 📊 Dashboard — Real-time city KPIs, incident frequency chart, distribution breakdown\n• 📷 AI Monitoring — Live CCTV feeds from 12 cameras, detection activity log\n• ⚠️ Incidents — Full case management with status tracking and CRUD operations\n• 🌱 Environmental — AQI data from 6 stations, PM2.5/PM10 trends, weather\n• 📈 Analytics — Predictive hotspots, waste forecast, risk probability models\n• 🗺️ Map — Interactive OpenStreetMap with all incident, camera, and AQI markers\n• 🏆 Community — Civic Points, leaderboard, badges, and reward marketplace\n• 🤖 AI Copilot — That's me! Ask anything about city data",
      suggestions: ["Open dashboard", "How do AI detections work?", "Explain predictive models"]
    };
  }

  if (/feature|platform|capability|what can you|what do you|aria|ai model|system/i.test(lower)) {
    return {
      content: "CleanCity AI platform capabilities:\n\n1. 🎥 AI Vision Network — 12 CCTV cameras + YOLOv8 detection models (94% avg. confidence)\n2. 🌬️ Environmental Sensing — 6 AQI stations with PM2.5, PM10, O₃, NO₂, SO₂, CO\n3. 🔮 Predictive Analytics — 87% accuracy on waste surge forecasts (18-month training data)\n4. 🚨 Automated Dispatch — Average 4.2h resolution time across 198 BBMP wards\n5. 🏆 Civic Rewards — 8,420 engaged citizens, gamified reporting system\n6. 🤖 ARIA Copilot (me) — Natural language interface across all city data\n7. 📄 Report Engine — Investor-grade PDF/Excel exports for municipality briefs",
      suggestions: ["Show AI detection accuracy", "View environmental data", "Explore predictive models"]
    };
  }

  if (/municipality|municipal|workflow|process|department|government|bbmp|ward|bwssb|bescom/i.test(lower)) {
    return {
      content: "BBMP Municipality Workflow on CleanCity AI:\n\n1. AI camera detects anomaly → confidence score calculated\n2. Alert routed to department head (auto-assigned by incident type)\n3. Field crew dispatched via CleanCity mobile app with GPS routing\n4. Supervisor confirms resolution with photo evidence\n5. Citizen notified + Civic Points awarded if citizen-reported\n\nIntegrated departments: BBMP (Solid Waste), BWSSB (Water & Sewerage), BESCOM (Power), BMP (Traffic & Parking)\n\nWard-level dashboards available for all 198 BBMP wards. Avg. cross-department handoff: 22 minutes.",
      suggestions: ["View ward-level map", "Track department KPIs", "Generate municipality report"]
    };
  }

  if (/safety|safe|hazard|chemical|spill|precaution|emergency|danger/i.test(lower)) {
    return {
      content: "⚠️ SAFETY ALERT — Active Hazardous Incident:\n\nLocation: Peenya Industrial Area, Warehouse District (CAM-03)\nStatus: HazMat Response Unit on site\nExclusion zone: 200m radius enforced\n\nProtocol:\n• Do NOT allow unauthorized personnel near the zone\n• PPE Level B required for any inspection\n• All CAM-03 footage archived as legal evidence\n• KSPCB (Karnataka State Pollution Control Board) notified\n\nEmergency contacts:\n• BBMP Helpline: 1533\n• Emergency: 112\n• KSPCB: 080-22259490",
      suggestions: ["View hazardous incident", "Contact HazMat team", "Issue public safety alert"]
    };
  }

  if (/contact|help|support|phone|email|call|reach|who do i/i.test(lower)) {
    return {
      content: "CleanCity AI — Contact & Support:\n\n• 📧 Platform Support: support@cleancity.ai\n• 📞 Helpline: +91 80 4567 8901\n• 🚨 Emergency Dispatch: dispatch@cleancity.ai | BBMP: 1533\n• 🛠️ Technical Issues: tech@cleancity.ai\n• 🏛️ Municipal Escalation: bbmp.cleancity@karnataka.gov.in\n\nUrbanova Technologies HQ\n4th Floor, Salarpuria Towers\nMG Road, Bengaluru — 560001, Karnataka\n\nBusiness hours: Mon–Sat, 9am–7pm IST",
      suggestions: ["Report a bug", "Request a feature", "Schedule platform training"]
    };
  }

  if (/aqi|air quality|pollution|pm2\.?5|pm10|environment|weather|temperature|humidity/i.test(lower)) {
    return {
      content: "Environmental status — Bengaluru (live):\n\n• Overall AQI: 87 — Moderate ⚠️\n• Worst zone: Peenya (AQI 105 — Unhealthy for Sensitive Groups)\n• Best zone: Bannerghatta (AQI 62 — Good)\n• PM2.5: 24.3 µg/m³ (above WHO 15 µg/m³ safe limit)\n• PM10: 48.7 µg/m³\n• Temperature: 26°C, Feels like 28°C\n• Wind: 14.2 km/h SE | Humidity: 65%\n• 30-day trend: AQI improved 12%\n• Advisory: Sensitive groups should limit outdoor exposure in Peenya and Whitefield zones",
      suggestions: ["View AQI trends chart", "Check all 6 stations", "Set AQI alert threshold"]
    };
  }

  if (/predict|forecast|probability|risk|model|surge|hotspot/i.test(lower)) {
    return {
      content: "Predictive Intelligence Summary — Bengaluru:\n\n• 🔴 87% — Waste surge in Central Bengaluru this weekend (event-based + historical pattern)\n• 🔴 73% — PM2.5 spike in Peenya Industrial Zone within 24h\n• 🟠 65% — Flooding risk in Koramangala within 72h (85mm rainfall forecasted)\n• 🟠 79% — Illegal dumping spike during upcoming holiday weekend (industrial zones)\n• 🟡 58% — Graffiti surge in Indiranagar following youth events\n\nModels trained on 18 months of data across 198 BBMP wards + 3 other cities (Mumbai, Pune, Hyderabad) for nationwide benchmarking.",
      suggestions: ["View all predictions", "See hotspot map", "Schedule preventive deployment"]
    };
  }

  if (/dispatch|deploy|send|assign|team|crew/i.test(lower)) {
    return {
      content: "Field Team Status — Bengaluru:\n\n• ✅ Team Alpha (6 personnel) — Idle, Central Bengaluru — Available immediately\n• 🔄 Team Bravo (4 personnel) — En route to Koramangala flooding, ETA 18 min\n• ⚠️ HazMat Unit — On site at Peenya, return in ~2h\n• 🔄 Road Repair Crew 4 — Returning to base (ORR pothole resolved)\n• 🔧 Drainage Crew Alpha — Active at Koramangala\n\nRecommendation: Deploy Team Alpha to Cubbon Park illegal dumping incident (CAM-07). Estimated resolution: 45 minutes.",
      suggestions: ["Dispatch Team Alpha now", "View all field teams", "Create dispatch order"]
    };
  }

  if (/camera|cctv|detection|surveillance|monitor/i.test(lower)) {
    return {
      content: "AI Surveillance Network — Bengaluru:\n\n• 12 cameras total: 10 online, 1 offline (Lalbagh West Gate), 1 maintenance (Ulsoor Lake East)\n• Most active: Peenya Industrial Camera — 45 detections today\n• Total detections today: 196 across all cameras\n• Detection types: illegal dumping (42%), overflowing bins (28%), graffiti (18%), vandalism (8%), other (4%)\n• Avg. AI confidence: 0.87\n• Model: YOLOv8 + Custom Karnataka Urban Dataset v3.1\n• Uptime: 98.5% across all cameras",
      suggestions: ["View live camera feeds", "See detection log", "Adjust detection thresholds"]
    };
  }

  return {
    content: `I've analyzed your query about "${input.length > 60 ? input.slice(0, 60) + '…' : input}".\n\nBased on current city data, I can assist with:\n• 🗂️ Incident management & complaint status\n• 🌱 Environmental monitoring & AQI\n• 🔮 Predictive analytics & risk forecasts\n• 🚚 Field team dispatch & tracking\n• 🏆 Civic rewards & community engagement\n• 🏛️ Municipality workflows & BBMP integration\n• ℹ️ Platform usage guidance\n\nCurrently tracking: 8 active incidents, AQI 87, 196 AI detections today across Bengaluru. What specific aspect would you like me to investigate?`,
    suggestions: ["Show active incidents", "Check environmental data", "View AI detections"]
  };
}

export function Copilot() {
  const { toast } = useToast();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: 'ai',
      content: "Hello Sarah. I'm ARIA, your Adaptive Resource Intelligence Assistant. I'm monitoring 4,201 endpoints across the city network. Everything is nominal, though I've detected a new illegal dumping incident near Cubbon Park (CAM-07, 2h ago) that needs attention. How can I assist you today?",
      timestamp: new Date(Date.now() - 60000).toISOString(),
      suggestions: [
        "Show me the Cubbon Park incident",
        "Generate a daily summary",
        "Check overall AQI status"
      ]
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (text: string) => {
    if (!text.trim() || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    const delay = 800 + Math.random() * 700;
    setTimeout(() => {
      const { content, suggestions } = getARIAResponse(text);
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        content,
        timestamp: new Date().toISOString(),
        suggestions
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, delay);
  };

  const recentChats = [
    { label: "Cubbon Park dumping dispatch", query: "What's the status of the Cubbon Park illegal dumping incident?" },
    { label: "Weekend event waste prep", query: "Predict waste generation this weekend for Central Bengaluru" },
    { label: "Peenya AQI anomaly check", query: "Explain the AQI anomaly in Peenya" },
  ];

  const quickActions = [
    { icon: AlertTriangle, label: "Analyze Critical Incidents", color: "text-red-400", query: "Show me all critical and high priority incidents right now" },
    { icon: Wind, label: "Environmental Forecast", color: "text-emerald-400", query: "What is the air quality forecast for Bengaluru in the next 24 hours?" },
    { icon: MapIcon, label: "Generate Heatmap", color: "text-amber-400", query: "Show me the risk hotspot predictions across Bengaluru" },
    { icon: Trash2, label: "Waste Collection Status", color: "text-cyan-400", query: "What is the current garbage collection status across Bengaluru wards?" },
    { icon: Droplets, label: "Flood Risk Assessment", color: "text-blue-400", query: "Is there any flood or drainage risk in Bengaluru right now?" },
    { icon: ShieldAlert, label: "Safety Briefing", color: "text-orange-400", query: "Give me the latest safety alerts and hazardous incidents" },
  ];

  return (
    <div className="flex h-[calc(100vh-64px)] w-full">
      {/* Sidebar */}
      <div className="w-72 border-r border-white/5 bg-black/20 flex-col hidden md:flex shrink-0">
        <div className="p-4 border-b border-white/5 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center border border-primary/30 relative">
            <Bot className="w-6 h-6 text-primary" />
            <div className="absolute top-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-background" />
          </div>
          <div>
            <h2 className="font-bold text-foreground">ARIA Copilot</h2>
            <p className="text-xs text-muted-foreground">Online & Monitoring</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3 px-2">Quick Actions</h3>
            <div className="space-y-1">
              {quickActions.map((action, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(action.query)}
                  disabled={isTyping}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 transition-colors group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className={cn("w-8 h-8 rounded bg-black/40 flex items-center justify-center border border-white/5 group-hover:border-white/10 transition-colors", action.color)}>
                    <action.icon className="w-4 h-4" />
                  </div>
                  <span className="text-sm text-slate-300 group-hover:text-white transition-colors text-left leading-tight">{action.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3 px-2">Recent Chats</h3>
            <div className="space-y-1">
              {recentChats.map((chat, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(chat.query)}
                  disabled={isTyping}
                  className="w-full text-left px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-white/5 hover:text-white transition-colors truncate disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {chat.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-white/5">
          <button
            onClick={() => {
              setMessages([{
                id: Date.now().toString(),
                role: 'ai',
                content: "New session started. I'm ARIA, monitoring 4,201 city endpoints. How can I assist you?",
                timestamp: new Date().toISOString(),
                suggestions: ["Show active incidents", "Check AQI", "View predictions"]
              }]);
              toast({ title: "New session started", description: "Chat history cleared." });
            }}
            className="w-full text-xs text-muted-foreground hover:text-white py-2 px-3 rounded hover:bg-white/5 transition-colors text-center"
          >
            + New Chat
          </button>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-[#050812] relative min-w-0">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CgkJPHBhdGggZD0iTTAgMGg0MHY0MEgweiIgZmlsbD0ibm9uZSIvPgoJCTxwYXRoIGQ9Ik0wIDM5LTVsNDAgLjVMNDAgNDAuNWgtNDB6TTM5LjUgMGwuNSA0MGguNWwtLjUtNDB6IiBmaWxsPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDIpIi8+Cgk8L3N2Zz4=')] pointer-events-none opacity-50" />

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((msg) => (
            <div key={msg.id} className={cn(
              "flex gap-4 max-w-3xl",
              msg.role === 'user' ? "ml-auto flex-row-reverse" : ""
            )}>
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1",
                msg.role === 'user' ? "bg-white/10" : "bg-primary/20 border border-primary/30"
              )}>
                {msg.role === 'user' ? <User className="w-4 h-4 text-slate-300" /> : <Bot className="w-4 h-4 text-primary" />}
              </div>

              <div className={cn(
                "flex flex-col gap-2",
                msg.role === 'user' ? "items-end" : "items-start"
              )}>
                <div className={cn(
                  "px-5 py-3.5 rounded-2xl text-sm leading-relaxed backdrop-blur-md whitespace-pre-line",
                  msg.role === 'user'
                    ? "bg-primary text-primary-foreground rounded-tr-sm"
                    : "glass-panel border border-white/10 text-slate-200 rounded-tl-sm shadow-xl"
                )}>
                  {msg.content}
                </div>

                {msg.suggestions && msg.suggestions.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {msg.suggestions.map((suggestion, i) => (
                      <button
                        key={i}
                        onClick={() => handleSend(suggestion)}
                        disabled={isTyping}
                        className="text-xs px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary hover:bg-primary/20 transition-colors flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Sparkles className="w-3 h-3" />
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-4 max-w-3xl">
              <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center shrink-0 mt-1">
                <Bot className="w-4 h-4 text-primary" />
              </div>
              <div className="glass-panel px-5 py-3.5 rounded-2xl rounded-tl-sm flex items-center gap-1 w-16">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className="p-6 bg-gradient-to-t from-[#050812] to-transparent relative z-10 shrink-0">
          <div className="max-w-4xl mx-auto relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-accent/30 rounded-xl blur opacity-25 group-focus-within:opacity-50 transition duration-1000 group-hover:duration-200" />
            <form
              onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
              className="relative flex items-center glass-panel rounded-xl overflow-hidden border border-white/10 bg-black/60"
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask ARIA about incidents, AQI, dispatch, predictions, rewards..."
                className="flex-1 bg-transparent border-none text-base h-14 px-6 focus-visible:ring-0 placeholder:text-slate-500"
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="h-14 px-6 bg-primary text-white font-medium flex items-center gap-2 hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isTyping ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
              </button>
            </form>
          </div>
          <div className="text-center mt-3 text-[10px] text-muted-foreground uppercase tracking-widest font-mono">
            ARIA models may produce inaccurate predictions. Always verify critical dispatch orders.
          </div>
        </div>
      </div>
    </div>
  );
}
