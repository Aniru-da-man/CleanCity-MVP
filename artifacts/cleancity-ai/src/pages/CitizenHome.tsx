import { useEffect, useState } from "react";
import { ArrowRight, Bot, Clock3, Leaf, Map, Megaphone, Sparkles, Trophy } from "lucide-react";
import { Link } from "wouter";
import { useGetCommunityProfile, useGetLeaderboard } from "@workspace/api-client-react";
import { getCitizenPoints, getCitizenReports, type CitizenReport } from "@/lib/citizen-reports";
import { getSession } from "@/lib/auth";

const tools = [
  { title: "Report waste", description: "Upload a photo and let Vision AI prepare the cleanup dispatch summary.", href: "/citizen/report", icon: Megaphone, accent: "text-amber-300 bg-amber-400/10" },
  { title: "Explore the city map", description: "See active cleanup issues, hotspots, and nearby civic activity in Bengaluru.", href: "/map", icon: Map, accent: "text-cyan-300 bg-cyan-400/10" },
  { title: "Community leaderboard", description: "Track your civic points, badges, streak, and rank alongside your neighbourhood.", href: "/citizen/community", icon: Trophy, accent: "text-yellow-300 bg-yellow-400/10" },
  { title: "Citizen agent", description: "Get help navigating the app, reporting an issue, or checking a report status.", href: "/citizen/assistant", icon: Bot, accent: "text-emerald-300 bg-emerald-400/10" },
];

const fallbackLeaderboard = [
  { rank: 1, userId: "u001", name: "Sarah Chen", points: 4850, level: "Civic Champion", badges: 18, reports: 142, change: 2 },
  { rank: 2, userId: "u002", name: "Marcus Johnson", points: 4320, level: "Civic Champion", badges: 15, reports: 128, change: -1 },
  { rank: 3, userId: "u003", name: "Aisha Patel", points: 3980, level: "City Guardian", badges: 12, reports: 115, change: 1 },
  { rank: 4, userId: "u004", name: "Carlos Rivera", points: 3650, level: "City Guardian", badges: 10, reports: 98, change: 0 },
  { rank: 5, userId: "u005", name: "Emily Watson", points: 3210, level: "Eco Warrior", badges: 9, reports: 87, change: 3 },
];

export function CitizenHome() {
  const session = getSession();
  const { data: profileData } = useGetCommunityProfile();
  const { data: leaderboardData } = useGetLeaderboard();
  const [points, setPoints] = useState(getCitizenPoints());
  const [reports, setReports] = useState<CitizenReport[]>(getCitizenReports());
  const leaderboard = leaderboardData || fallbackLeaderboard;
  const profile = profileData || { rank: 42, streakDays: 5, badgesEarned: 2, totalUsers: 8420 };
  const latest = reports[0];

  useEffect(() => {
    const refresh = () => { setPoints(getCitizenPoints()); setReports(getCitizenReports()); };
    window.addEventListener("cleancity:points-updated", refresh);
    window.addEventListener("cleancity:reports-updated", refresh);
    return () => { window.removeEventListener("cleancity:points-updated", refresh); window.removeEventListener("cleancity:reports-updated", refresh); };
  }, []);

  return <div className="mx-auto max-w-6xl space-y-7 p-6 md:p-10">
    <section className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/15 via-[#111b31] to-emerald-500/10 p-7 sm:p-10"><div className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl" /><div className="relative max-w-2xl"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Citizen command centre</p><h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">Good to see you, {session?.name || "Citizen"}.</h1><p className="mt-3 max-w-xl text-sm leading-7 text-slate-300">Report what you see, follow cleanup progress, and earn points for making Bengaluru cleaner.</p><div className="mt-6 flex flex-wrap gap-3"><Link href="/citizen/report" className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90">Report an issue <ArrowRight className="h-4 w-4" /></Link><Link href="/map" className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-semibold text-slate-100 hover:bg-white/10"><Map className="h-4 w-4 text-primary" /> Open city map</Link></div></div></section>

    <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"><StatCard label="Civic points" value={points.toLocaleString()} icon={Sparkles} tone="text-primary" /><StatCard label="Reports submitted" value={reports.length.toString()} icon={Megaphone} tone="text-amber-300" /><StatCard label="Current rank" value={`#${profile.rank}`} icon={Trophy} tone="text-yellow-300" /><StatCard label="Active streak" value={`${profile.streakDays} days`} icon={Leaf} tone="text-emerald-300" /></section>

    {latest?.aiAnalysis && <section className="rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.07] p-5"><div className="flex flex-wrap items-center justify-between gap-3"><div><p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300"><Sparkles className="h-4 w-4" /> Latest AI report summary</p><h2 className="mt-2 text-lg font-bold">{latest.aiAnalysis.wasteType} near {latest.location}</h2></div><span className="rounded-full border border-emerald-400/20 px-3 py-1 text-xs text-emerald-200">+{latest.aiAnalysis.points} points awarded</span></div><p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">{latest.aiAnalysis.summary}</p><div className="mt-4 flex flex-wrap gap-3 text-xs text-muted-foreground"><span className="inline-flex items-center gap-1"><Clock3 className="h-3.5 w-3.5 text-primary" /> Crew ETA: {latest.aiAnalysis.deploymentTime}</span><span>Reference {latest.id}</span></div></section>}

    <div><div className="mb-4 flex items-end justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Your civic toolkit</p><h2 className="mt-2 text-2xl font-bold">What do you need today?</h2></div><Leaf className="hidden h-7 w-7 text-primary sm:block" /></div><div className="grid gap-4 sm:grid-cols-2">{tools.map(({ title, description, href, icon: Icon, accent }) => <Link key={href} href={href} className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:bg-white/[0.06]"><div className={`flex h-11 w-11 items-center justify-center rounded-xl ${accent}`}><Icon className="h-5 w-5" /></div><h3 className="mt-5 text-base font-semibold leading-6">{title}</h3><p className="mt-2 min-h-12 text-sm leading-6 text-muted-foreground">{description}</p><span className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-primary">Open tool <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" /></span></Link>)}</div></div>

    <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-7"><div className="flex items-start justify-between gap-4"><div><p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-yellow-300"><Trophy className="h-4 w-4" /> Community momentum</p><h2 className="mt-2 text-xl font-bold">City leaderboard</h2><p className="mt-1 text-sm text-muted-foreground">Every verified report moves the city forward.</p></div><Link href="/citizen/community" className="text-xs font-semibold text-primary hover:text-cyan-300">View rewards <ArrowRight className="ml-1 inline h-3.5 w-3.5" /></Link></div><div className="mt-5 grid gap-3 md:grid-cols-5">{leaderboard.slice(0, 5).map((entry) => <div key={entry.userId} className="rounded-xl border border-white/10 bg-black/10 p-4"><p className="text-xs font-mono text-muted-foreground">#{entry.rank}</p><p className="mt-3 truncate text-sm font-semibold">{entry.name}</p><p className="mt-1 text-lg font-bold text-primary">{entry.points.toLocaleString()}</p><p className="text-[11px] text-muted-foreground">points · {entry.reports} reports</p></div>)}</div><div className="mt-4 rounded-xl border border-primary/20 bg-primary/10 px-4 py-3 text-sm"><span className="font-semibold text-primary">Your progress:</span> {points.toLocaleString()} points · rank #{profile.rank} · {profile.badgesEarned} badges unlocked</div></section>
  </div>;
}

function StatCard({ label, value, icon: Icon, tone }: { label: string; value: string; icon: typeof Leaf; tone: string }) {
  return <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"><div className={`flex items-center gap-2 text-xs uppercase tracking-wider ${tone}`}><Icon className="h-4 w-4" /> {label}</div><p className="mt-3 text-2xl font-bold tracking-tight">{value}</p></div>;
}
