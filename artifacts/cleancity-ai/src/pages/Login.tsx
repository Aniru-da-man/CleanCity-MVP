import { FormEvent, useState } from "react";
import { ArrowLeft, ArrowRight, Building2, Check, Leaf, UserRound } from "lucide-react";
import { useLocation, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { getPortalHome, ROLE_LABELS, saveSession, type UserRole } from "@/lib/auth";

const roleOptions: Array<{
  role: UserRole;
  title: string;
  description: string;
  icon: typeof UserRound;
}> = [
  {
    role: "citizen",
    title: "Citizen",
    description: "Report waste, use the city map, and get help using CleanCity AI.",
    icon: UserRound,
  },
  {
    role: "operator",
    title: "City operations",
    description: "One shared workspace for municipal dispatch, incidents, intelligence, and administration.",
    icon: Building2,
  },
];

export function Login() {
  const [, navigate] = useLocation();
  const [step, setStep] = useState<"credentials" | "role">("credentials");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submitCredentials = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError("Enter your email and password to continue.");
      return;
    }
    setError("");
    setStep("role");
  };

  const selectRole = (role: UserRole) => {
    const firstName = email.split("@")[0]?.split(/[._-]/)[0] || "CleanCity user";
    const name = firstName.charAt(0).toUpperCase() + firstName.slice(1);
    saveSession({ email: email.trim(), name, role });
    navigate(getPortalHome(role));
  };

  return (
    <main className="min-h-screen bg-[#050814] text-slate-50 px-4 py-8 sm:px-6">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl items-center justify-center">
        <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-[#0b1222]/90 shadow-2xl shadow-cyan-950/20 lg:grid-cols-[0.9fr_1.1fr]">
          <section className="hidden border-r border-white/10 bg-gradient-to-br from-cyan-500/10 via-transparent to-emerald-500/10 p-10 lg:flex lg:flex-col lg:justify-between">
            <div>
              <Link href="/" className="inline-flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent">
                  <Leaf className="h-5 w-5 text-white" />
                </span>
                <span className="text-lg font-bold tracking-tight">CleanCity AI</span>
              </Link>
              <div className="mt-20 max-w-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">Secure access</p>
                <h1 className="mt-4 text-4xl font-bold leading-tight">Choose the portal built for your work.</h1>
                <p className="mt-5 text-sm leading-7 text-slate-400">One sign-in keeps the citizen experience focused while giving municipal teams the operational intelligence they need.</p>
              </div>
            </div>
            <p className="text-xs text-slate-500">Bengaluru civic operations platform</p>
          </section>

          <section className="p-6 sm:p-10">
            <div className="mb-8 flex items-center justify-between">
              <div className="lg:hidden">
                <Link href="/" className="flex items-center gap-2 text-sm font-bold"><Leaf className="h-5 w-5 text-primary" /> CleanCity AI</Link>
              </div>
              <div className="ml-auto flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest text-slate-500">
                <span className={cn("h-1.5 w-8 rounded-full", step === "credentials" ? "bg-primary" : "bg-primary/30")} />
                <span className={cn("h-1.5 w-8 rounded-full", step === "role" ? "bg-primary" : "bg-white/10")} />
              </div>
            </div>

            {step === "credentials" ? (
              <form onSubmit={submitCredentials} className="mx-auto max-w-md">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Step 1 of 2</p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight">Sign in to continue</h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">Use your CleanCity account before choosing a portal.</p>

                <div className="mt-8 space-y-5">
                  <label className="block space-y-2 text-sm font-medium">
                    Email address
                    <Input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" autoComplete="email" className="h-11 bg-white/5 border-white/10" />
                  </label>
                  <label className="block space-y-2 text-sm font-medium">
                    Password
                    <Input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter your password" autoComplete="current-password" className="h-11 bg-white/5 border-white/10" />
                  </label>
                  {error && <p className="text-sm text-red-400" role="alert">{error}</p>}
                  <Button type="submit" className="h-11 w-full bg-primary text-primary-foreground hover:bg-primary/90">Continue <ArrowRight className="h-4 w-4" /></Button>
                </div>
                <p className="mt-6 text-center text-xs text-slate-500">Demo access accepts any non-empty email and password.</p>
              </form>
            ) : (
              <div className="mx-auto max-w-lg">
                <button type="button" onClick={() => setStep("credentials")} className="mb-6 inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground"><ArrowLeft className="h-3.5 w-3.5" /> Back to sign in</button>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Step 2 of 2</p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight">How are you signing in?</h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">Choose the experience that matches how you use CleanCity AI.</p>

                <div className="mt-8 space-y-3">
                  {roleOptions.map(({ role, title, description, icon: Icon }) => (
                    <button key={role} type="button" onClick={() => selectRole(role)} className="group flex w-full items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-left transition-all hover:border-primary/50 hover:bg-primary/10">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary"><Icon className="h-5 w-5" /></span>
                      <span className="min-w-0 flex-1"><span className="block font-semibold">{title}</span><span className="mt-1 block text-xs leading-5 text-muted-foreground">{description}</span></span>
                      <Check className="h-4 w-4 text-primary opacity-0 transition-opacity group-hover:opacity-100" />
                    </button>
                  ))}
                </div>
                <p className="mt-6 text-xs text-slate-500">City operations combines the former operator and manager workspaces into one shared console.</p>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
