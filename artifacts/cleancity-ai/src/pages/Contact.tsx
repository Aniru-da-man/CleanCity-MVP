import { useState } from "react";
import { Link } from "wouter";
import {
  Leaf, ArrowLeft, Mail, Send, CheckCircle, MessageSquare,
  Headphones, Zap, Users, ArrowRight, X, Building2, MapPin, Briefcase
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CITY_SIZES = ["< 500K population", "500K – 2M", "2M – 5M", "5M+"];
const ROLES = ["Municipal Commissioner", "Smart City Mission Officer", "Urban Planner", "Technology / IT Head", "Researcher / Academic", "Investor", "Other"];
const USE_CASES = ["Waste & Sanitation", "Air Quality Monitoring", "Public Safety & CCTV", "Infrastructure Maintenance", "Civic Engagement", "Multiple / Full Platform"];

export function Contact() {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", organization: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Early-access modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [pilot, setPilot] = useState({ name: "", email: "", city: "", citySize: "", role: "", useCase: "", details: "" });
  const [pilotSubmitting, setPilotSubmitting] = useState(false);
  const [pilotDone, setPilotDone] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      toast({ title: "Message sent!", description: "Our team will respond within 1 business day." });
    }, 1200);
  };

  const handlePilotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pilot.name || !pilot.email || !pilot.city) return;
    setPilotSubmitting(true);
    setTimeout(() => {
      setPilotSubmitting(false);
      setPilotDone(true);
      toast({ title: "Application received!", description: "We'll reach out to you within 2 business days." });
    }, 1400);
  };

  const contacts = [
    {
      icon: Mail,
      label: "General Enquiries",
      value: "hello@cleancity.ai",
      sub: "Sales, partnerships, press",
      color: "text-cyan-400",
      bg: "bg-cyan-500/10 border-cyan-500/20",
    },
    {
      icon: Headphones,
      label: "Platform Support",
      value: "support@cleancity.ai",
      sub: "Mon – Sat · 9 am – 7 pm IST",
      color: "text-violet-400",
      bg: "bg-violet-500/10 border-violet-500/20",
    },
  ];

  const timeline = [
    { step: "01", title: "We read every message", body: "Your enquiry lands directly in our founding team's inbox — no ticketing queues." },
    { step: "02", title: "Response within 24 h", body: "We aim to reply within one business day with something genuinely useful." },
    { step: "03", title: "Live demo if it fits", body: "If CleanCity AI is a good match for your city or use-case, we'll set up a personalised walkthrough." },
  ];

  return (
    <div className="min-h-screen bg-[#050814] text-slate-50 font-sans">
      {/* Background glows */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[20%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[150px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] rounded-full bg-violet-500/10 blur-[120px]" />
      </div>

      {/* Nav */}
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

      <main className="relative z-10 max-w-6xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
            <MessageSquare className="w-4 h-4" /> Get in Touch
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-5 bg-gradient-to-br from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            Let's Build Smarter<br />Cities Together
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto text-lg leading-relaxed">
            We're in active development and talking to municipalities, urban planners, and smart-city leaders across India. Reach out — we respond personally.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* ── LEFT: Contact Form (unchanged) ── */}
          <div className="glass-panel rounded-2xl border border-white/8 p-8">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Send className="w-5 h-5 text-primary" /> Send a Message
            </h2>

            {submitted ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8 text-emerald-500" />
                </div>
                <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
                <p className="text-slate-400 text-sm">
                  Thank you, {form.name}. Our team will respond to{" "}
                  <span className="text-primary">{form.email}</span> within 1 business day.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: "", email: "", organization: "", subject: "", message: "" }); }}
                  className="mt-6 text-sm text-primary hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-slate-400 mb-1.5 block">Full Name *</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      required
                      placeholder="Ravi Kumar"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-primary/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 mb-1.5 block">Email Address *</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      required
                      placeholder="ravi@bbmp.gov.in"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-primary/50 transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-slate-400 mb-1.5 block">Organization</label>
                  <input
                    type="text"
                    value={form.organization}
                    onChange={e => setForm(f => ({ ...f, organization: e.target.value }))}
                    placeholder="Municipality / Smart City Mission / Research Institute"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-primary/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 mb-1.5 block">Subject</label>
                  <select
                    value={form.subject}
                    onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                    className="w-full bg-[#0e1525] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-slate-300 focus:outline-none focus:border-primary/50 transition-colors"
                  >
                    <option value="">Select a subject</option>
                    <option value="demo">Request a Demo</option>
                    <option value="pilot">Pilot Programme Enquiry</option>
                    <option value="investor">Investor Relations</option>
                    <option value="press">Press & Media</option>
                    <option value="general">General Enquiry</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-slate-400 mb-1.5 block">Message *</label>
                  <textarea
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    required
                    rows={5}
                    placeholder="Tell us about your city's challenges, what you're exploring, or how CleanCity AI might help..."
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-primary/50 transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sending...</>
                  ) : (
                    <><Send className="w-4 h-4" /> Send Message</>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* ── RIGHT: Info panels ── */}
          <div className="flex flex-col gap-6">

            {/* Contact cards */}
            <div className="grid grid-cols-2 gap-4">
              {contacts.map(({ icon: Icon, label, value, sub, color, bg }) => (
                <div key={label} className="glass-panel rounded-xl border border-white/8 p-5 hover:bg-white/[0.03] transition-colors">
                  <div className={`w-9 h-9 rounded-lg border flex items-center justify-center mb-3 ${bg}`}>
                    <Icon className={`w-4.5 h-4.5 ${color}`} style={{ width: 18, height: 18 }} />
                  </div>
                  <div className="text-[11px] text-slate-500 uppercase tracking-wider mb-1">{label}</div>
                  <div className="text-sm font-semibold text-white break-all leading-snug">{value}</div>
                  <div className="text-[11px] text-slate-500 mt-1">{sub}</div>
                </div>
              ))}
            </div>

            {/* What happens next */}
            <div className="glass-panel rounded-xl border border-white/8 p-6">
              <div className="flex items-center gap-2 mb-5">
                <Zap className="w-4 h-4 text-amber-400" />
                <h3 className="font-semibold text-white text-sm">What happens next</h3>
              </div>
              <div className="space-y-5">
                {timeline.map(({ step, title, body }) => (
                  <div key={step} className="flex gap-4">
                    <div className="shrink-0 w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[11px] font-bold text-slate-400 font-mono">
                      {step}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-100 mb-0.5">{title}</div>
                      <div className="text-xs text-slate-500 leading-relaxed">{body}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Early-access banner */}
            <div className="rounded-xl border border-primary/25 bg-gradient-to-br from-primary/10 via-transparent to-violet-500/10 p-6">
              <div className="flex items-center gap-2 mb-3">
                <Users className="w-4 h-4 text-primary" />
                <span className="text-xs font-semibold text-primary uppercase tracking-widest">Early Access Programme</span>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                We're onboarding our first cohort of pilot cities and research partners. If you're exploring smart-city infrastructure, AI-powered civic tools, or urban data platforms — we'd love to collaborate.
              </p>
              <button
                onClick={() => setModalOpen(true)}
                className="flex items-center gap-2 text-sm font-medium text-primary hover:text-cyan-300 transition-colors group"
              >
                <span>Apply via the form</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

          </div>
        </div>
      </main>

      <footer className="relative z-10 border-t border-white/10 py-8 text-center text-slate-600 text-sm">
        <p>© 2025 Urbanova Technologies Pvt. Ltd. · Building in public · Bengaluru, India</p>
      </footer>

      {/* ── Early Access Modal ── */}
      {modalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => { if (!pilotSubmitting) setModalOpen(false); }}
          />

          {/* Panel */}
          <div className="relative w-full max-w-lg bg-[#0b1120] border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/8">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-primary/15 border border-primary/25 flex items-center justify-center">
                  <Users className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <div className="font-bold text-white text-base">Early Access Application</div>
                  <div className="text-xs text-slate-400">Pilot Programme · Cohort 1</div>
                </div>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="px-6 py-6 max-h-[70vh] overflow-y-auto">
              {pilotDone ? (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-4">
                    <CheckCircle className="w-8 h-8 text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Application Submitted!</h3>
                  <p className="text-slate-400 text-sm max-w-xs">
                    Thank you, <span className="text-white font-medium">{pilot.name}</span>. We'll review your application and reach out to <span className="text-primary">{pilot.email}</span> within 2 business days.
                  </p>
                  <button
                    onClick={() => { setModalOpen(false); setPilotDone(false); setPilot({ name: "", email: "", city: "", citySize: "", role: "", useCase: "", details: "" }); }}
                    className="mt-6 px-5 py-2 rounded-lg bg-primary/15 border border-primary/25 text-primary text-sm font-medium hover:bg-primary/25 transition-colors"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={handlePilotSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-slate-400 mb-1.5 block">Full Name *</label>
                      <input
                        type="text"
                        value={pilot.name}
                        onChange={e => setPilot(p => ({ ...p, name: e.target.value }))}
                        required
                        placeholder="Ravi Kumar"
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-primary/50 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-400 mb-1.5 block">Work Email *</label>
                      <input
                        type="email"
                        value={pilot.email}
                        onChange={e => setPilot(p => ({ ...p, email: e.target.value }))}
                        required
                        placeholder="ravi@bbmp.gov.in"
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-primary/50 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-slate-400 mb-1.5 flex items-center gap-1.5 block">
                      <MapPin className="w-3 h-3" /> City / Region *
                    </label>
                    <input
                      type="text"
                      value={pilot.city}
                      onChange={e => setPilot(p => ({ ...p, city: e.target.value }))}
                      required
                      placeholder="e.g. Bengaluru, Mysuru, Pune…"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-primary/50 transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-slate-400 mb-1.5 flex items-center gap-1.5 block">
                        <Building2 className="w-3 h-3" /> City Size
                      </label>
                      <select
                        value={pilot.citySize}
                        onChange={e => setPilot(p => ({ ...p, citySize: e.target.value }))}
                        className="w-full bg-[#0e1525] border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-slate-300 focus:outline-none focus:border-primary/50 transition-colors"
                      >
                        <option value="">Select…</option>
                        {CITY_SIZES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs text-slate-400 mb-1.5 flex items-center gap-1.5 block">
                        <Briefcase className="w-3 h-3" /> Your Role
                      </label>
                      <select
                        value={pilot.role}
                        onChange={e => setPilot(p => ({ ...p, role: e.target.value }))}
                        className="w-full bg-[#0e1525] border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-slate-300 focus:outline-none focus:border-primary/50 transition-colors"
                      >
                        <option value="">Select…</option>
                        {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-slate-400 mb-1.5 block">Primary Use Case</label>
                    <div className="grid grid-cols-2 gap-2">
                      {USE_CASES.map(uc => (
                        <button
                          key={uc}
                          type="button"
                          onClick={() => setPilot(p => ({ ...p, useCase: uc }))}
                          className={`text-left px-3 py-2 rounded-lg border text-xs transition-colors ${
                            pilot.useCase === uc
                              ? "bg-primary/15 border-primary/40 text-primary font-medium"
                              : "bg-white/3 border-white/8 text-slate-400 hover:bg-white/8 hover:text-slate-200"
                          }`}
                        >
                          {uc}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-slate-400 mb-1.5 block">Anything you'd like us to know?</label>
                    <textarea
                      value={pilot.details}
                      onChange={e => setPilot(p => ({ ...p, details: e.target.value }))}
                      rows={3}
                      placeholder="Current challenges, existing infrastructure, timeline, or questions…"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-primary/50 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={pilotSubmitting}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                  >
                    {pilotSubmitting ? (
                      <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Submitting…</>
                    ) : (
                      <><Send className="w-4 h-4" /> Submit Application</>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
