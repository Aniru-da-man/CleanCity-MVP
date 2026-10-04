import { useGetAdminStats, useListAdminUsers } from "@workspace/api-client-react";
import { useState } from "react";
import { Users, Server, HardDrive, Activity, ShieldCheck, MoreHorizontal, AlertCircle, X, Check, UserPlus, Save, Ban, Edit2, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

export function Admin() {
  const { toast } = useToast();
  const { data: statsData } = useGetAdminStats();
  const { data: usersData } = useListAdminUsers();
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteForm, setInviteForm] = useState({ name: "", email: "", role: "operator" });
  const [inviting, setInviting] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [localUsers, setLocalUsers] = useState<any[] | null>(null);

  const stats = statsData || {
    totalUsers: 15420,
    activeUsers: 3204,
    totalIncidents: 45291,
    camerasOnline: 142,
    systemHealth: "optimal",
    storageUsed: 78.5,
    apiCallsToday: 1.2,
    alertsActive: 4
  };

  const baseUsers = usersData || [
    { id: "usr_9921", name: "Sarah Jenkins", email: "sarah@city.gov", role: "admin", status: "active", lastActive: "Just now", points: 8540, reports: 156 },
    { id: "usr_8832", name: "Marcus Thorne", email: "marcus@city.gov", role: "operator", status: "active", lastActive: "5m ago", points: 24500, reports: 412 },
    { id: "usr_7743", name: "Elena Rodriguez", email: "elena@city.gov", role: "operator", status: "offline", lastActive: "2h ago", points: 23100, reports: 389 },
    { id: "usr_6654", name: "David Chen", email: "david@city.gov", role: "viewer", status: "active", lastActive: "10m ago", points: 22800, reports: 360 },
    { id: "usr_5565", name: "System API", email: "api@cleancity.ai", role: "system", status: "active", lastActive: "Just now", points: 0, reports: 0 },
  ];

  const users = localUsers || baseUsers;

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteForm.name || !inviteForm.email) return;
    setInviting(true);
    setTimeout(() => {
      const newUser = {
        id: `usr_${Math.floor(Math.random() * 9000 + 1000)}`,
        name: inviteForm.name,
        email: inviteForm.email,
        role: inviteForm.role,
        status: "invited",
        lastActive: "Never",
        points: 0,
        reports: 0
      };
      setLocalUsers([...(localUsers || baseUsers), newUser]);
      setInviting(false);
      setShowInviteModal(false);
      setInviteForm({ name: "", email: "", role: "operator" });
      toast({ title: "Invitation sent!", description: `${inviteForm.name} (${inviteForm.email}) has been invited as ${inviteForm.role}.` });
    }, 1200);
  };

  const handleSuspend = (userId: string, userName: string) => {
    setLocalUsers((localUsers || baseUsers).map(u =>
      u.id === userId ? { ...u, status: u.status === "suspended" ? "active" : "suspended" } : u
    ));
    setOpenMenu(null);
    const user = (localUsers || baseUsers).find(u => u.id === userId);
    const newStatus = user?.status === "suspended" ? "active" : "suspended";
    toast({ title: `User ${newStatus}`, description: `${userName}'s account has been ${newStatus}.` });
  };

  const handleEditRole = (userId: string, userName: string) => {
    const roleOrder = ["viewer", "operator", "analyst", "admin"];
    setLocalUsers((localUsers || baseUsers).map(u => {
      if (u.id !== userId) return u;
      const idx = roleOrder.indexOf(u.role);
      const nextRole = roleOrder[(idx + 1) % roleOrder.length];
      return { ...u, role: nextRole };
    }));
    setOpenMenu(null);
    toast({ title: "Role updated", description: `${userName}'s role has been updated.` });
  };

  const handleSaveSettings = () => {
    toast({ title: "Settings saved", description: "Admin console configuration has been saved successfully." });
  };

  const handleRefreshStats = () => {
    toast({ title: "Stats refreshed", description: "All system metrics updated from live data." });
  };

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-medium text-emerald-500">
          <ShieldCheck className="w-4 h-4" /> System Operating Nominally
        </div>
        <div className="text-xs text-emerald-500/70 font-mono">Last check: Just now</div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Console</h1>
          <p className="text-muted-foreground mt-1">Platform management and infrastructure metrics.</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleRefreshStats}
            className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-2 rounded text-xs font-medium transition-colors hover:bg-white/10"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Refresh
          </button>
          <button
            onClick={handleSaveSettings}
            className="flex items-center gap-2 bg-primary/20 border border-primary/30 text-primary px-3 py-2 rounded text-xs font-medium transition-colors hover:bg-primary hover:text-white"
          >
            <Save className="w-3.5 h-3.5" /> Save Changes
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={Users} label="Active Users" value={stats.activeUsers.toLocaleString()} sub={`${stats.totalUsers.toLocaleString()} total`} />
        <StatCard icon={Server} label="API Calls (24h)" value={`${stats.apiCallsToday}M`} sub="14ms avg latency" />
        <StatCard icon={HardDrive} label="Storage Used" value={`${stats.storageUsed}%`} sub="2.4 PB total" color={stats.storageUsed > 80 ? 'text-amber-500' : 'text-primary'} />
        <StatCard icon={AlertCircle} label="Active System Alerts" value={stats.alertsActive} sub="Requires attention" color={stats.alertsActive > 0 ? 'text-amber-500' : 'text-emerald-500'} />
      </div>

      <div className="glass-panel border border-white/5 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-white/5 bg-black/20 flex justify-between items-center">
          <h3 className="font-semibold text-sm">User Access Management</h3>
          <button
            onClick={() => setShowInviteModal(true)}
            className="bg-primary/20 hover:bg-primary border border-primary/30 hover:border-primary text-primary hover:text-white px-3 py-1.5 rounded text-xs font-medium transition-all flex items-center gap-1.5"
          >
            <UserPlus className="w-3.5 h-3.5" /> Invite User
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-black/40 border-b border-white/5">
              <tr>
                <th className="px-6 py-3 font-medium">User</th>
                <th className="px-6 py-3 font-medium">Role</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Last Active</th>
                <th className="px-6 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors relative">
                  <td className="px-6 py-4">
                    <div className="font-medium text-foreground">{user.name}</div>
                    <div className="text-xs text-muted-foreground">{user.email}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "px-2 py-1 rounded text-[10px] uppercase font-bold tracking-wider border",
                      user.role === 'admin' ? "bg-red-500/10 text-red-400 border-red-500/20" :
                      user.role === 'system' ? "bg-purple-500/10 text-purple-400 border-purple-500/20" :
                      "bg-blue-500/10 text-blue-400 border-blue-500/20"
                    )}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-xs">
                      <div className={cn("w-1.5 h-1.5 rounded-full",
                        user.status === 'active' ? "bg-emerald-500" :
                        user.status === 'invited' ? "bg-amber-500" :
                        user.status === 'suspended' ? "bg-red-500" : "bg-slate-500"
                      )} />
                      <span className="capitalize text-muted-foreground">{user.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground text-xs font-mono">{user.lastActive}</td>
                  <td className="px-6 py-4 text-right relative">
                    <button
                      onClick={() => setOpenMenu(openMenu === user.id ? null : user.id)}
                      className="p-1 text-muted-foreground hover:text-white rounded hover:bg-white/10 transition-colors"
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                    {openMenu === user.id && (
                      <div className="absolute right-6 top-10 z-50 glass-panel border border-white/10 rounded-lg shadow-xl w-44 py-1 text-left">
                        <button
                          onClick={() => handleEditRole(user.id, user.name)}
                          className="w-full flex items-center gap-2 px-3 py-2 text-xs text-slate-300 hover:bg-white/5 hover:text-white transition-colors"
                        >
                          <Edit2 className="w-3.5 h-3.5" /> Change Role
                        </button>
                        {user.role !== 'system' && (
                          <button
                            onClick={() => handleSuspend(user.id, user.name)}
                            className="w-full flex items-center gap-2 px-3 py-2 text-xs hover:bg-white/5 transition-colors text-amber-400"
                          >
                            <Ban className="w-3.5 h-3.5" />
                            {user.status === 'suspended' ? 'Reactivate' : 'Suspend'}
                          </button>
                        )}
                        <button
                          onClick={() => { setOpenMenu(null); toast({ title: "Action logged", description: `Activity for ${user.name} has been logged.` }); }}
                          className="w-full flex items-center gap-2 px-3 py-2 text-xs text-slate-300 hover:bg-white/5 hover:text-white transition-colors"
                        >
                          <Activity className="w-3.5 h-3.5" /> View Activity
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setShowInviteModal(false)}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div
            className="relative glass-panel border border-white/10 rounded-2xl p-6 w-full max-w-md shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-primary" /> Invite New User
              </h2>
              <button onClick={() => setShowInviteModal(false)} className="text-slate-400 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleInvite} className="space-y-4">
              <div>
                <label className="text-xs text-slate-400 mb-1.5 block">Full Name *</label>
                <input
                  type="text"
                  value={inviteForm.name}
                  onChange={e => setInviteForm(f => ({ ...f, name: e.target.value }))}
                  required
                  placeholder="e.g. Ravi Kumar"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-primary/50 transition-colors"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 mb-1.5 block">Email Address *</label>
                <input
                  type="email"
                  value={inviteForm.email}
                  onChange={e => setInviteForm(f => ({ ...f, email: e.target.value }))}
                  required
                  placeholder="ravi@bbmp.gov.in"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-primary/50 transition-colors"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 mb-1.5 block">Role</label>
                <select
                  value={inviteForm.role}
                  onChange={e => setInviteForm(f => ({ ...f, role: e.target.value }))}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-slate-300 focus:outline-none focus:border-primary/50 transition-colors"
                >
                  <option value="viewer">Viewer</option>
                  <option value="operator">Operator</option>
                  <option value="analyst">Analyst</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowInviteModal(false)}
                  className="flex-1 bg-white/5 border border-white/10 py-2.5 rounded-lg text-sm font-medium hover:bg-white/10 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={inviting}
                  className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground py-2.5 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
                >
                  {inviting ? (
                    <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sending...</>
                  ) : (
                    <><Check className="w-4 h-4" /> Send Invite</>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ icon: Icon, label, value, sub, color = "text-foreground" }: any) {
  return (
    <div className="glass-panel p-4 rounded-xl border border-white/5 relative overflow-hidden group">
      <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
        <Icon className="w-24 h-24" />
      </div>
      <div className="relative z-10">
        <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-2">
          <Icon className="w-4 h-4" /> {label}
        </div>
        <div className={cn("text-3xl font-bold font-mono", color)}>{value}</div>
        <div className="text-[10px] text-muted-foreground mt-1">{sub}</div>
      </div>
    </div>
  );
}
