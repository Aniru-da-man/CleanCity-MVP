import { Link, useLocation } from "wouter";
import {
  Activity,
  AlertTriangle,
  Bell,
  Bot,
  Cctv,
  ChevronDown,
  FileText,
  LayoutDashboard,
  Leaf,
  LogOut,
  Map as MapIcon,
  Menu,
  Moon,
  Settings,
  ShieldAlert,
  Sun,
  Trophy,
  User,
  Wind,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useGetProfile } from "@workspace/api-client-react";
import { clearSession, getSession, ROLE_LABELS } from "@/lib/auth";

type NavigationItem = {
  label: string;
  icon: typeof LayoutDashboard;
  href: string;
  badge?: number;
};

const citizenItems: NavigationItem[] = [
  { label: "Reporting", icon: AlertTriangle, href: "/citizen/report" },
  { label: "The map", icon: MapIcon, href: "/map" },
  { label: "Community & rewards", icon: Trophy, href: "/citizen/community" },
  { label: "Citizen agent", icon: Bot, href: "/citizen/assistant" },
];

const municipalPrimaryItems: NavigationItem[] = [
  { label: "Overview", icon: LayoutDashboard, href: "/dashboard" },
  { label: "Issues", icon: AlertTriangle, href: "/incidents" },
  { label: "Live monitoring", icon: Cctv, href: "/monitoring" },
  { label: "Environment", icon: Wind, href: "/environmental" },
  { label: "City map", icon: MapIcon, href: "/map" },
];

const municipalWorkspaceItems: NavigationItem[] = [
  { label: "Insights", icon: Activity, href: "/analytics" },
  { label: "Reports", icon: FileText, href: "/reports" },
  { label: "AI assistant", icon: Bot, href: "/copilot" },
  { label: "Community & rewards", icon: Trophy, href: "/community" },
  { label: "Notifications", icon: Bell, href: "/notifications", badge: 3 },
];

const accountItemsForMunicipalUsers: NavigationItem[] = [
  { label: "Your profile", icon: User, href: "/profile" },
  { label: "Settings", icon: Settings, href: "/settings" },
  { label: "Administration", icon: ShieldAlert, href: "/admin" },
];

function NavLink({ item, mobile = false, onNavigate }: { item: NavigationItem; mobile?: boolean; onNavigate?: () => void }) {
  const [location] = useLocation();
  const isActive = location === item.href;

  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      className={cn(
        "flex items-center gap-3 rounded-lg text-sm font-medium transition-colors",
        mobile ? "flex-col justify-center gap-1 px-1 py-2 text-[10px]" : "justify-between px-3 py-2.5",
        isActive ? "bg-primary/12 text-primary" : "text-muted-foreground hover:bg-white/5 hover:text-foreground",
      )}
      aria-current={isActive ? "page" : undefined}
    >
      <span className="flex min-w-0 items-center gap-3">
        <item.icon className={cn("h-4 w-4 shrink-0", isActive && "text-primary")} />
        <span className={cn("truncate", mobile && "max-w-full")}>{item.label}</span>
      </span>
      {!mobile && item.badge && (
        <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold text-primary-foreground">
          {item.badge}
        </span>
      )}
    </Link>
  );
}

function ExpandableSection({ label, children, defaultOpen = false }: { label: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <section>
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className="flex w-full items-center justify-between rounded-md px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground"
        aria-expanded={isOpen}
      >
        {label}
        <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", !isOpen && "-rotate-90")} />
      </button>
      {isOpen && <div className="mt-1 space-y-1">{children}</div>}
    </section>
  );
}

export function Sidebar() {
  const [location] = useLocation();
  const { theme, setTheme } = useTheme();
  const { data: profile } = useGetProfile();
  const session = getSession();
  const isCitizen = session?.role === "citizen";
  const primaryItems = isCitizen ? citizenItems : municipalPrimaryItems;
  const workspaceItems = isCitizen ? [] : municipalWorkspaceItems;
  const accountItems = isCitizen ? [] : accountItemsForMunicipalUsers;
  const mobileMoreItems = [primaryItems[4], ...workspaceItems, ...accountItems].filter(
    (item): item is NavigationItem => Boolean(item),
  );
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => setMounted(true), []);

  const profileName = session?.name || profile?.name || "Sarah Jenkins";
  const profileRole = session ? ROLE_LABELS[session.role] : profile?.role || "City Manager";
  const profileInitials = profileName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const signOut = () => {
    clearSession();
    window.location.assign("/login");
  };

  return (
    <>
      <aside className="hidden h-screen w-60 shrink-0 flex-col border-r border-white/5 bg-sidebar/70 backdrop-blur-xl md:flex">
        <div className="p-5">
          <Link href="/" title="CleanCity AI" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent shadow-[0_0_20px_rgba(6,182,212,0.18)]">
              <Leaf className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-base font-bold tracking-tight text-foreground">CleanCity AI</h1>
            <p className="mt-0.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">{isCitizen ? "Citizen services" : "City operations"}</p>
            </div>
          </Link>
        </div>

        <nav aria-label="Main navigation" className="flex-1 space-y-5 overflow-y-auto px-3 pb-4">
          <section>
            <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{isCitizen ? "Citizen tools" : "Everyday work"}</p>
            <div className="space-y-1">{primaryItems.map((item) => <NavLink key={item.href} item={item} />)}</div>
          </section>
          {!isCitizen && <ExpandableSection label="More tools" defaultOpen={workspaceItems.some((item) => item.href === location)}>
            {workspaceItems.map((item) => <NavLink key={item.href} item={item} />)}
          </ExpandableSection>}
          {!isCitizen && <ExpandableSection label="Account & system" defaultOpen={accountItems.some((item) => item.href === location)}>
            {accountItems.map((item) => <NavLink key={item.href} item={item} />)}
          </ExpandableSection>}
        </nav>

        <div className="border-t border-white/5 p-3">
          {!isCitizen && <>
            <div className="mb-2 flex items-center justify-between px-2">
              <span className="text-xs font-medium text-muted-foreground">Appearance</span>
              {mounted && (
                <button
                  type="button"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
                  aria-label="Change colour theme"
                >
                  {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </button>
              )}
            </div>
            <Link href="/profile" className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-white/5">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-tr from-accent to-primary text-xs font-bold text-white">{profileInitials}</div>
              <div className="min-w-0"><p className="truncate text-sm font-medium text-foreground">{profileName}</p><p className="truncate text-xs text-muted-foreground">{profileRole}</p></div>
            </Link>
          </>}
          {isCitizen && <div className="mb-2 rounded-lg bg-primary/10 px-3 py-2"><p className="text-xs font-semibold text-primary">{ROLE_LABELS.citizen} portal</p><p className="mt-0.5 truncate text-[11px] text-muted-foreground">{profileName}</p></div>}
          <button type="button" onClick={signOut} className="mt-2 flex w-full items-center gap-2 rounded-lg px-2 py-2 text-xs text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"><LogOut className="h-3.5 w-3.5" /> Sign out</button>
        </div>
      </aside>

      <nav aria-label="Mobile navigation" className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[#0c1322]/95 px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-1.5 backdrop-blur-xl md:hidden">
        <div className={cn("mx-auto grid max-w-lg", primaryItems.length > 4 ? "grid-cols-5" : primaryItems.length === 4 ? "grid-cols-4" : "grid-cols-3")}>
          {primaryItems.slice(0, 4).map((item) => <NavLink key={item.href} item={item} mobile onNavigate={() => setMobileMenuOpen(false)} />)}
          {!isCitizen && <button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="flex flex-col items-center justify-center gap-1 rounded-lg px-1 py-2 text-[10px] font-medium text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
            aria-label="Open more pages"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            <span>More</span>
          </button>}
        </div>
        {mobileMenuOpen && !isCitizen && (
          <div className="absolute bottom-[calc(100%+0.5rem)] left-3 right-3 rounded-2xl border border-white/10 bg-[#111a2b] p-3 shadow-2xl">
            <p className="px-2 pb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">All pages</p>
            <div className="grid grid-cols-2 gap-1">
              {mobileMoreItems.map((item) => (
                <NavLink key={item.href} item={item} onNavigate={() => setMobileMenuOpen(false)} />
              ))}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
