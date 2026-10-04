import { useEffect, useState } from "react";
import { useGetCommunityProfile, useListBadges, useGetLeaderboard } from "@workspace/api-client-react";
import {
  Trophy,
  Award,
  Star,
  Shield,
  TrendingUp,
  User,
  Medal,
  ChevronUp,
  ChevronDown,
  Gift,
  X,
  CheckCircle,
  ShoppingBag
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { getCitizenPoints, getCitizenReports } from "@/lib/citizen-reports";
import { getSession } from "@/lib/auth";

const marketplaceItems = [
  { id: 1, name: "BMTC Monthly Pass", desc: "Unlimited BMTC bus travel across Bengaluru for 30 days", cost: 2000, category: "transport", emoji: "🚌", stock: 50 },
  { id: 2, name: "CleanCity Eco Tote Bag", desc: "Premium recycled-material tote with CleanCity branding", cost: 500, category: "merchandise", emoji: "🛍️", stock: 200 },
  { id: 3, name: "Yulu 1-Month Bike Pass", desc: "Unlimited 30-min Yulu rides on city bike share network", cost: 1500, category: "transport", emoji: "🚲", stock: 100 },
  { id: 4, name: "Green Restaurant Voucher", desc: "₹500 voucher at eco-friendly partner restaurants in Bengaluru", cost: 1000, category: "dining", emoji: "🌿", stock: 75 },
  { id: 5, name: "Urban Garden Starter Kit", desc: "Balcony/window herb growing kit with seeds and soil", cost: 800, category: "lifestyle", emoji: "🌱", stock: 40 },
  { id: 6, name: "Solar Phone Charger", desc: "Portable 10,000mAh solar panel phone charger", cost: 3500, category: "tech", emoji: "☀️", stock: 20 },
  { id: 7, name: "Cubbon Park Yoga Session", desc: "Group weekend yoga class at Cubbon Park (8am, Sunday)", cost: 600, category: "wellness", emoji: "🧘", stock: 30 },
  { id: 8, name: "Insulated Steel Bottle", desc: "32oz stainless steel insulated water bottle", cost: 700, category: "lifestyle", emoji: "🧴", stock: 150 },
];

export function Community() {
  const { toast } = useToast();
  const session = getSession();
  const isCitizen = session?.role === "citizen";
  const [showMarketplace, setShowMarketplace] = useState(false);
  const [userPoints, setUserPoints] = useState<number | null>(isCitizen ? getCitizenPoints() : null);
  const [redeeming, setRedeeming] = useState<number | null>(null);

  const { data: profileData } = useGetCommunityProfile();
  const { data: badgesData } = useListBadges();
  const { data: leaderboardData } = useGetLeaderboard();

  const profile = profileData || {
    userId: "u-123",
    name: "Sarah Jenkins",
    points: 8540,
    level: "Civic Guardian",
    rank: 42,
    totalUsers: 15420,
    reportsSubmitted: 156,
    badgesEarned: 12,
    streakDays: 14,
    joinedAt: "2024-01-15T00:00:00Z",
    monthlyPoints: [
      { label: "Jan", value: 1200 },
      { label: "Feb", value: 1800 },
      { label: "Mar", value: 1400 },
      { label: "Apr", value: 2100 },
      { label: "May", value: 2040 }
    ]
  };

  const citizenProfile = isCitizen ? { ...profile, name: session?.name || profile.name, points: getCitizenPoints(), reportsSubmitted: getCitizenReports().length } : profile;
  const displayPoints = userPoints ?? citizenProfile.points;

  useEffect(() => {
    if (!isCitizen) return;
    const refreshPoints = () => setUserPoints(getCitizenPoints());
    window.addEventListener("cleancity:points-updated", refreshPoints);
    return () => window.removeEventListener("cleancity:points-updated", refreshPoints);
  }, [isCitizen]);

  const badges = badgesData || [
    { id: "b1", name: "First Report", description: "Submit your first valid incident report.", icon: "star", category: "reporting", pointsRequired: 0, rarity: "common", isEarned: true },
    { id: "b2", name: "Eagle Eye", description: "Submit 50 valid reports.", icon: "eye", category: "reporting", pointsRequired: 1000, rarity: "rare", isEarned: true },
    { id: "b3", name: "Green Thumb", description: "Report 20 environmental hazards.", icon: "leaf", category: "environmental", pointsRequired: 500, rarity: "uncommon", isEarned: true },
    { id: "b4", name: "Civic Guardian", description: "Reach Top 100 on leaderboard.", icon: "shield", category: "community", pointsRequired: 5000, rarity: "epic", isEarned: true },
    { id: "b5", name: "City Legend", description: "Reach Top 10 on leaderboard.", icon: "crown", category: "community", pointsRequired: 20000, rarity: "legendary", isEarned: false },
    { id: "b6", name: "Streak Master", description: "30 day active streak.", icon: "flame", category: "activity", pointsRequired: 3000, rarity: "rare", isEarned: false },
  ];

  const leaderboard = leaderboardData || [
    { rank: 1, userId: "u-991", name: "Marcus T.", points: 24500, level: "City Legend", badges: 24, reports: 412, change: 0 },
    { rank: 2, userId: "u-882", name: "Elena R.", points: 23100, level: "City Legend", badges: 22, reports: 389, change: 1 },
    { rank: 3, userId: "u-773", name: "David C.", points: 22800, level: "City Legend", badges: 21, reports: 360, change: -1 },
    { rank: 4, userId: "u-664", name: "Aisha M.", points: 19500, level: "Civic Guardian", badges: 18, reports: 290, change: 2 },
    { rank: 42, userId: "u-123", name: "Sarah Jenkins", points: displayPoints, level: "Civic Guardian", badges: 12, reports: 156, change: 5 },
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'from-orange-500 to-yellow-300 text-yellow-500 border-yellow-500/50 shadow-[0_0_15px_rgba(234,179,8,0.3)]';
      case 'epic': return 'from-purple-600 to-purple-400 text-purple-400 border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.3)]';
      case 'rare': return 'from-blue-600 to-blue-400 text-blue-400 border-blue-500/50';
      default: return 'from-slate-600 to-slate-400 text-slate-300 border-slate-500/30';
    }
  };

  const handleRedeem = (item: typeof marketplaceItems[0]) => {
    if (displayPoints < item.cost) {
      toast({ title: "Insufficient points", description: `You need ${(item.cost - displayPoints).toLocaleString()} more points to redeem this reward.`, variant: "destructive" });
      return;
    }
    setRedeeming(item.id);
    setTimeout(() => {
      setUserPoints(displayPoints - item.cost);
      setRedeeming(null);
      toast({ title: "🎉 Reward redeemed!", description: `${item.name} has been added to your account. Check your email for details.` });
    }, 1200);
  };

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Civic Rewards</h1>
        <p className="text-muted-foreground mt-1">Earn points for improving your city. Compete on the leaderboard and unlock perks.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Stats Card */}
        <div className="lg:col-span-1 glass-panel rounded-xl border border-white/5 p-6 relative overflow-hidden flex flex-col">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-[50px]" />

          <div className="flex items-center gap-4 mb-6 relative z-10">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-accent to-primary p-[2px]">
              <div className="w-full h-full rounded-full bg-card flex items-center justify-center overflow-hidden">
                <User className="w-8 h-8 text-muted-foreground" />
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold">{citizenProfile.name}</h2>
              <div className="text-sm text-primary font-medium flex items-center gap-1">
                <Shield className="w-3.5 h-3.5" /> {profile.level}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6 relative z-10">
            <div className="bg-black/20 p-4 rounded-lg border border-white/5 text-center">
              <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Civic Points</div>
              <div className="text-2xl font-bold font-mono text-white glow-text-cyan">{displayPoints.toLocaleString()}</div>
            </div>
            <div className="bg-black/20 p-4 rounded-lg border border-white/5 text-center">
              <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">City Rank</div>
              <div className="text-2xl font-bold font-mono text-white">#{citizenProfile.rank}</div>
            </div>
          </div>

          <div className="space-y-4 relative z-10 flex-1">
            <div className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
              <span className="text-muted-foreground">Valid Reports</span>
              <span className="font-bold">{citizenProfile.reportsSubmitted}</span>
            </div>
            <div className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
              <span className="text-muted-foreground">Badges Unlocked</span>
              <span className="font-bold">{citizenProfile.badgesEarned} / {badges.length}</span>
            </div>
            <div className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
              <span className="text-muted-foreground">Current Streak</span>
              <span className="font-bold text-orange-400 flex items-center gap-1">
                {citizenProfile.streakDays} Days <TrendingUp className="w-3 h-3" />
              </span>
            </div>
          </div>

          <button
            onClick={() => setShowMarketplace(true)}
            className="w-full mt-6 bg-primary/20 text-primary border border-primary/30 py-2.5 rounded-lg font-medium text-sm hover:bg-primary hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Gift className="w-4 h-4" /> Reward Marketplace
          </button>
        </div>

        <div className="lg:col-span-2 space-y-6 flex flex-col">
          {/* Points History Chart */}
          <div className="glass-panel rounded-xl border border-white/5 p-6 h-64 flex flex-col">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-4">Points History</h3>
            <div className="flex-1 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={citizenProfile.monthlyPoints} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorPoints" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="label" stroke="rgba(255,255,255,0.4)" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="rgba(255,255,255,0.4)" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px' }} />
                  <Area type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={3} fillOpacity={1} fill="url(#colorPoints)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Badges Grid */}
          <div className="glass-panel rounded-xl border border-white/5 p-6 flex-1">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Medal className="w-5 h-5 text-amber-500" /> Achievement Badges
              </h3>
              <span className="text-sm text-muted-foreground">{citizenProfile.badgesEarned} Unlocked</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {badges.map(badge => (
                <div key={badge.id} className={cn(
                  "p-4 rounded-xl border flex flex-col items-center text-center transition-all",
                  badge.isEarned ? "bg-white/5 border-white/10 hover:bg-white/10 cursor-default" : "bg-black/40 border-white/5 opacity-60 grayscale"
                )}>
                  <div className={cn(
                    "w-12 h-12 rounded-full mb-3 flex items-center justify-center bg-gradient-to-br border-2",
                    getRarityColor(badge.rarity)
                  )}>
                    {badge.rarity === 'legendary' ? <Star className="w-6 h-6 text-white drop-shadow-md" /> :
                      badge.rarity === 'epic' ? <Shield className="w-6 h-6 text-white" /> :
                        <Award className="w-6 h-6 text-white" />}
                  </div>
                  <h4 className="font-bold text-sm text-foreground mb-1">{badge.name}</h4>
                  <p className="text-[10px] text-muted-foreground leading-tight line-clamp-2">{badge.description}</p>
                  {badge.isEarned && <span className="mt-2 text-[9px] text-emerald-400 font-medium">✓ Earned</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Leaderboard */}
      <div className="glass-panel rounded-xl border border-white/5 overflow-hidden">
        <div className="p-6 border-b border-white/5 flex justify-between items-center bg-black/20">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-500" /> City Leaderboard
          </h3>
          <select className="bg-white/5 border border-white/10 rounded px-3 py-1 text-sm text-foreground outline-none cursor-pointer">
            <option>All Time</option>
            <option>This Month</option>
            <option>This Week</option>
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-black/40 border-b border-white/5">
              <tr>
                <th className="px-6 py-4 font-medium w-16 text-center">Rank</th>
                <th className="px-6 py-4 font-medium">Citizen</th>
                <th className="px-6 py-4 font-medium text-right">Points</th>
                <th className="px-6 py-4 font-medium">Level</th>
                <th className="px-6 py-4 font-medium text-center">Reports</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((entry) => (
                <tr key={entry.userId} className={cn(
                  "border-b border-white/5 transition-colors",
                  entry.userId === citizenProfile.userId ? "bg-primary/10 border-primary/20" : "hover:bg-white/[0.02]"
                )}>
                  <td className="px-6 py-4 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <span className={cn(
                        "font-bold text-lg font-mono",
                        entry.rank === 1 ? "text-yellow-400" :
                          entry.rank === 2 ? "text-slate-300" :
                            entry.rank === 3 ? "text-amber-600" : "text-muted-foreground"
                      )}>#{entry.rank}</span>
                      {entry.change > 0 ? <ChevronUp className="w-3 h-3 text-emerald-500" /> :
                        entry.change < 0 ? <ChevronDown className="w-3 h-3 text-red-500" /> : null}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-foreground flex items-center gap-2">
                      {entry.name}
                      {entry.userId === citizenProfile.userId && <span className="text-[10px] px-2 py-0.5 rounded bg-primary text-white uppercase tracking-wider">You</span>}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="font-mono font-bold text-primary">{entry.points.toLocaleString()}</span>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">
                    <span className="px-2 py-1 rounded-full bg-white/5 border border-white/5 text-xs">{entry.level}</span>
                  </td>
                  <td className="px-6 py-4 text-center text-muted-foreground font-mono">{entry.reports}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Marketplace Modal */}
      {showMarketplace && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setShowMarketplace(false)}>
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          <div
            className="relative glass-panel border border-white/10 rounded-2xl p-6 w-full max-w-2xl shadow-2xl max-h-[85vh] flex flex-col"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-2 shrink-0">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-primary" /> Reward Marketplace
              </h2>
              <button onClick={() => setShowMarketplace(false)} className="text-slate-400 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex items-center gap-2 mb-5 shrink-0">
              <span className="text-sm text-slate-400">Your balance:</span>
              <span className="font-bold text-primary font-mono">{displayPoints.toLocaleString()} pts</span>
            </div>
            <div className="overflow-y-auto flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {marketplaceItems.map(item => {
                  const canAfford = displayPoints >= item.cost;
                  return (
                    <div key={item.id} className={cn(
                      "bg-white/5 rounded-xl border p-4 flex flex-col gap-3 transition-all",
                      canAfford ? "border-white/10 hover:border-primary/30" : "border-white/5 opacity-60"
                    )}>
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">{item.emoji}</span>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-sm text-foreground">{item.name}</div>
                          <div className="text-xs text-slate-500 mt-0.5 leading-tight">{item.desc}</div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className={cn("font-bold font-mono text-sm", canAfford ? "text-primary" : "text-slate-500")}>
                          {item.cost.toLocaleString()} pts
                        </span>
                        <button
                          onClick={() => handleRedeem(item)}
                          disabled={redeeming === item.id || !canAfford}
                          className={cn(
                            "px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all",
                            canAfford
                              ? "bg-primary/20 text-primary border border-primary/30 hover:bg-primary hover:text-white"
                              : "bg-white/5 text-slate-600 border border-white/5 cursor-not-allowed"
                          )}
                        >
                          {redeeming === item.id ? (
                            <><div className="w-3 h-3 border-2 border-current/30 border-t-current rounded-full animate-spin" /> Redeeming...</>
                          ) : canAfford ? (
                            <><Gift className="w-3 h-3" /> Redeem</>
                          ) : (
                            "Not enough pts"
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
