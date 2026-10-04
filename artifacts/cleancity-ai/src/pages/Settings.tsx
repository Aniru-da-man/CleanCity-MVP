import { Moon, Sun, Monitor, Bell, Shield, Key, LayoutGrid, Save, Check } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

export function Settings() {
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("appearance");
  const [density, setDensity] = useState("standard");
  const [saving, setSaving] = useState(false);

  const [notifications, setNotifications] = useState({
    criticalAlerts: true,
    aiPredictions: true,
    dailyDigest: false,
    systemMaintenance: true,
    communityBadges: true,
    reportReady: true,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast({ title: "Settings saved", description: "Your preferences have been saved successfully." });
    }, 800);
  };

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    toast({ title: "Theme updated", description: `Switched to ${newTheme} mode.` });
  };

  const handleToggle = (key: keyof typeof notifications) => {
    const newVal = !notifications[key];
    setNotifications(prev => ({ ...prev, [key]: newVal }));
    const labels: Record<string, string> = {
      criticalAlerts: "Critical Incident Alerts",
      aiPredictions: "AI Prediction Warnings",
      dailyDigest: "Daily Digest Email",
      systemMaintenance: "System Maintenance",
      communityBadges: "Community Badge Notifications",
      reportReady: "Report Ready Notifications",
    };
    toast({ title: newVal ? "Notification enabled" : "Notification disabled", description: `${labels[key]} has been ${newVal ? "enabled" : "disabled"}.` });
  };

  const tabs = [
    { id: "appearance", label: "Appearance", icon: LayoutGrid },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Shield },
    { id: "api", label: "API Keys", icon: Key },
  ];

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">System Settings</h1>
          <p className="text-muted-foreground mt-1">Configure your workspace and system preferences.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 bg-primary/20 border border-primary/30 text-primary hover:bg-primary hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition-all disabled:opacity-50"
        >
          {saving ? (
            <><div className="w-4 h-4 border-2 border-current/30 border-t-current rounded-full animate-spin" /> Saving...</>
          ) : (
            <><Save className="w-4 h-4" /> Save Changes</>
          )}
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Settings Navigation */}
        <div className="w-full md:w-56 shrink-0 flex flex-row md:flex-col gap-1 overflow-x-auto no-scrollbar">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap",
                activeTab === tab.id
                  ? "bg-primary/10 text-primary border border-primary/20"
                  : "text-muted-foreground hover:bg-white/5 hover:text-white"
              )}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Settings Content */}
        <div className="flex-1 glass-panel rounded-xl border border-white/5 min-h-[500px]">
          {activeTab === "appearance" && (
            <div className="p-6 space-y-8">
              <div>
                <h3 className="text-lg font-semibold mb-1">Theme Preferences</h3>
                <p className="text-sm text-muted-foreground mb-6">Select how CleanCity AI looks on your device.</p>
                {mounted && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <ThemeCard icon={Sun} title="Light Mode" active={theme === 'light'} onClick={() => handleThemeChange('light')} />
                    <ThemeCard icon={Moon} title="Dark Mode" active={theme === 'dark'} onClick={() => handleThemeChange('dark')} />
                    <ThemeCard icon={Monitor} title="System Sync" active={theme === 'system'} onClick={() => handleThemeChange('system')} />
                  </div>
                )}
              </div>

              <div className="pt-6 border-t border-white/5">
                <h3 className="text-lg font-semibold mb-4">Interface Density</h3>
                <div className="flex gap-4">
                  <label
                    className={cn("flex items-center gap-3 px-4 py-3 rounded border cursor-pointer transition-all", density === "standard" ? "bg-primary/10 border-primary/30" : "bg-white/5 border-white/10")}
                    onClick={() => { setDensity("standard"); toast({ title: "Density updated", description: "Switched to Standard layout." }); }}
                  >
                    <input type="radio" name="density" checked={density === "standard"} onChange={() => {}} className="accent-primary" />
                    <span className="text-sm">Standard</span>
                  </label>
                  <label
                    className={cn("flex items-center gap-3 px-4 py-3 rounded border cursor-pointer transition-all", density === "compact" ? "bg-primary/10 border-primary/30" : "bg-white/5 border-white/10")}
                    onClick={() => { setDensity("compact"); toast({ title: "Density updated", description: "Switched to Compact layout for data-heavy use." }); }}
                  >
                    <input type="radio" name="density" checked={density === "compact"} onChange={() => {}} className="accent-primary" />
                    <span className="text-sm">Compact (Data Heavy)</span>
                  </label>
                </div>
              </div>

              <div className="pt-6 border-t border-white/5">
                <h3 className="text-lg font-semibold mb-4">Language & Region</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-slate-400 mb-1.5 block">Language</label>
                    <select
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-slate-300 focus:outline-none focus:border-primary/50"
                      defaultValue="en"
                      onChange={() => toast({ title: "Language updated", description: "UI language preference saved." })}
                    >
                      <option value="en">English</option>
                      <option value="kn">Kannada</option>
                      <option value="hi">Hindi</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 mb-1.5 block">Timezone</label>
                    <select
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-slate-300 focus:outline-none focus:border-primary/50"
                      defaultValue="ist"
                      onChange={() => toast({ title: "Timezone updated", description: "Timezone preference saved." })}
                    >
                      <option value="ist">IST (UTC+5:30)</option>
                      <option value="utc">UTC</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="p-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-1">Alert Preferences</h3>
                <p className="text-sm text-muted-foreground mb-6">Control which notifications you receive from CleanCity AI.</p>
              </div>

              <div className="space-y-3">
                <ToggleRow
                  title="Critical Incident Alerts"
                  description="Immediate push notifications for high-severity events (chemical spills, flooding, etc.)."
                  checked={notifications.criticalAlerts}
                  onChange={() => handleToggle("criticalAlerts")}
                />
                <ToggleRow
                  title="AI Prediction Warnings"
                  description="Get notified when ARIA predicts a potential infrastructure failure or waste surge."
                  checked={notifications.aiPredictions}
                  onChange={() => handleToggle("aiPredictions")}
                />
                <ToggleRow
                  title="Daily Digest Email"
                  description="Receive a daily summary of resolved tickets, AQI levels, and points earned."
                  checked={notifications.dailyDigest}
                  onChange={() => handleToggle("dailyDigest")}
                />
                <ToggleRow
                  title="System Maintenance"
                  description="Notifications regarding platform downtime, camera outages, or scheduled updates."
                  checked={notifications.systemMaintenance}
                  onChange={() => handleToggle("systemMaintenance")}
                />
                <ToggleRow
                  title="Community Badge Notifications"
                  description="Get notified when you unlock a new achievement badge or reach a leaderboard milestone."
                  checked={notifications.communityBadges}
                  onChange={() => handleToggle("communityBadges")}
                />
                <ToggleRow
                  title="Report Ready Notifications"
                  description="Get notified when a generated report is ready for download."
                  checked={notifications.reportReady}
                  onChange={() => handleToggle("reportReady")}
                />
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 bg-primary/20 border border-primary/30 text-primary hover:bg-primary hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition-all"
                >
                  <Check className="w-4 h-4" /> Save Preferences
                </button>
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div className="p-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-1">Security Settings</h3>
                <p className="text-sm text-muted-foreground mb-6">Manage your account security and authentication settings.</p>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-white/5 rounded-lg border border-white/5">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-sm">Two-Factor Authentication</div>
                      <div className="text-xs text-muted-foreground mt-0.5">Add an extra layer of security to your account.</div>
                    </div>
                    <button
                      onClick={() => toast({ title: "2FA enabled", description: "Two-factor authentication has been activated for your account." })}
                      className="px-3 py-1.5 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 rounded text-xs font-medium hover:bg-emerald-500/30 transition-colors"
                    >
                      Enable 2FA
                    </button>
                  </div>
                </div>
                <div className="p-4 bg-white/5 rounded-lg border border-white/5">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-sm">Change Password</div>
                      <div className="text-xs text-muted-foreground mt-0.5">Last changed: 45 days ago. Recommended every 90 days.</div>
                    </div>
                    <button
                      onClick={() => toast({ title: "Password reset email sent", description: "Check your inbox for the reset link." })}
                      className="px-3 py-1.5 bg-white/5 border border-white/10 text-slate-300 rounded text-xs font-medium hover:bg-white/10 transition-colors"
                    >
                      Reset Password
                    </button>
                  </div>
                </div>
                <div className="p-4 bg-white/5 rounded-lg border border-white/5">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-sm">Active Sessions</div>
                      <div className="text-xs text-muted-foreground mt-0.5">2 active sessions: Chrome/Windows (current), Safari/iOS</div>
                    </div>
                    <button
                      onClick={() => toast({ title: "Sessions terminated", description: "All other sessions have been logged out." })}
                      className="px-3 py-1.5 bg-red-500/10 border border-red-500/20 text-red-400 rounded text-xs font-medium hover:bg-red-500/20 transition-colors"
                    >
                      Revoke Others
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "api" && (
            <div className="p-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-1">API Keys</h3>
                <p className="text-sm text-muted-foreground mb-6">Manage API keys for integrating CleanCity AI with external systems.</p>
              </div>

              <div className="space-y-4">
                {[
                  { name: "Production API Key", key: "cc_live_••••••••••••••••KG91", created: "Jan 1, 2025", lastUsed: "2h ago" },
                  { name: "Webhook Secret", key: "whsec_••••••••••••••••T7mK", created: "Jan 1, 2025", lastUsed: "5m ago" },
                ].map((apiKey, i) => (
                  <div key={i} className="p-4 bg-white/5 rounded-lg border border-white/5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="font-medium text-sm">{apiKey.name}</div>
                        <div className="text-xs font-mono text-slate-400 mt-1">{apiKey.key}</div>
                        <div className="text-xs text-slate-500 mt-1">Created: {apiKey.created} · Last used: {apiKey.lastUsed}</div>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <button
                          onClick={() => { navigator.clipboard?.writeText("demo_key_placeholder"); toast({ title: "Copied!", description: "API key copied to clipboard." }); }}
                          className="px-2 py-1 bg-white/5 border border-white/10 text-slate-300 rounded text-xs hover:bg-white/10 transition-colors"
                        >
                          Copy
                        </button>
                        <button
                          onClick={() => toast({ title: "Key rotated", description: `${apiKey.name} has been rotated. Update your integrations.`, variant: "destructive" })}
                          className="px-2 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded text-xs hover:bg-amber-500/20 transition-colors"
                        >
                          Rotate
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                <button
                  onClick={() => toast({ title: "New API key created", description: "Your new key has been generated. It will appear above after refresh." })}
                  className="w-full py-2.5 border border-dashed border-white/10 rounded-lg text-xs text-slate-400 hover:bg-white/5 hover:text-white transition-colors"
                >
                  + Create New API Key
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ThemeCard({ icon: Icon, title, active, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "p-4 rounded-xl border flex flex-col items-center gap-3 transition-all",
        active
          ? "bg-primary/10 border-primary shadow-[0_0_15px_rgba(6,182,212,0.15)] text-primary"
          : "bg-black/20 border-white/10 hover:border-white/20 text-slate-300"
      )}
    >
      <Icon className="w-6 h-6" />
      <span className="text-sm font-medium">{title}</span>
    </button>
  );
}

function ToggleRow({ title, description, checked, onChange }: { title: string; description: string; checked: boolean; onChange: () => void }) {
  return (
    <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/5">
      <div>
        <div className="font-medium text-sm text-foreground">{title}</div>
        <div className="text-xs text-muted-foreground mt-0.5">{description}</div>
      </div>
      <button
        onClick={onChange}
        className={cn(
          "relative w-11 h-6 rounded-full transition-colors shrink-0",
          checked ? "bg-primary" : "bg-slate-700"
        )}
      >
        <span className={cn(
          "absolute top-[2px] w-5 h-5 rounded-full bg-white transition-transform shadow-sm",
          checked ? "translate-x-5" : "translate-x-0.5"
        )} />
      </button>
    </div>
  );
}
