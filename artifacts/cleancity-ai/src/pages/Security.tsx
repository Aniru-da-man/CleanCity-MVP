import { Link } from "wouter";
import { Leaf, ArrowLeft, Shield, Lock, Eye, Server, AlertTriangle, CheckCircle, Key, RefreshCw } from "lucide-react";

export function Security() {
  const certifications = [
    { name: "SOC 2 Type II", desc: "AWS India (Mumbai) hosting infrastructure", status: "Certified" },
    { name: "ISO 27001", desc: "Information security management system", status: "In Progress" },
    { name: "CERT-In Empanelled", desc: "Quarterly penetration testing by certified auditors", status: "Certified" },
    { name: "DPDPA 2023", desc: "India's Digital Personal Data Protection Act compliance", status: "Compliant" },
    { name: "IT Act 2000", desc: "Indian IT Act and IT Rules compliance", status: "Compliant" },
    { name: "NIC Standards", desc: "National Informatics Centre cloud guidelines", status: "Aligned" },
  ];

  const measures = [
    { icon: Lock, title: "End-to-End Encryption", desc: "All data in transit encrypted with TLS 1.3. Data at rest encrypted with AES-256. Database fields containing PII use column-level encryption with separate key management." },
    { icon: Eye, title: "Zero-Trust Architecture", desc: "Every API request is authenticated and authorized. Role-based access control (RBAC) with least-privilege principles. No implicit trust — even internal services authenticate via mutual TLS." },
    { icon: Server, title: "Secure Infrastructure", desc: "Hosted on AWS India (ap-south-1). VPC isolation with private subnets. Web Application Firewall (WAF) protecting all public endpoints. DDoS protection via AWS Shield." },
    { icon: Key, title: "Secrets Management", desc: "API keys, database credentials, and service tokens managed via AWS Secrets Manager. Automatic 90-day rotation. No secrets in source code or environment variables." },
    { icon: RefreshCw, title: "Incident Response", desc: "24/7 automated threat monitoring via AWS GuardDuty and CloudTrail. Security incidents escalated within 1 hour. CERT-In notified for data breaches within 6 hours per IT Rules 2022." },
    { icon: AlertTriangle, title: "CCTV Data Protection", desc: "Raw camera feeds processed on-device. Video not transmitted to cloud. Detection metadata (type, confidence, coordinates) encrypted in transit. Raw video auto-deleted after 72 hours per BBMP guidelines." },
  ];

  return (
    <div className="min-h-screen bg-[#050814] text-slate-50 font-sans">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[10%] w-[40%] h-[40%] rounded-full bg-emerald-500/10 blur-[150px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[30%] h-[30%] rounded-full bg-primary/10 blur-[120px]" />
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

      <main className="relative z-10 max-w-5xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-6">
            <Shield className="w-4 h-4" /> Security
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Enterprise-Grade Security</h1>
          <p className="text-slate-400 max-w-2xl mx-auto">CleanCity AI protects critical municipal infrastructure data with the same security standards used by India's top financial institutions and government systems.</p>
        </div>

        {/* Status banner */}
        <div className="glass-panel rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6 mb-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <div className="font-bold text-emerald-400">All Systems Operational</div>
              <div className="text-xs text-slate-400">Last security audit: January 10, 2025 · Next: April 10, 2025</div>
            </div>
          </div>
          <a href="mailto:security@cleancity.ai" className="text-sm text-emerald-400 hover:underline font-medium shrink-0">Report a vulnerability →</a>
        </div>

        {/* Security measures */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {measures.map(({ icon: Icon, title, desc }, i) => (
            <div key={i} className="glass-panel rounded-2xl border border-white/5 p-6 hover:bg-white/[0.02] transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-emerald-400" />
                </div>
                <h3 className="font-bold">{title}</h3>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div className="glass-panel rounded-2xl border border-white/5 p-8 mb-10">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" /> Compliance & Certifications
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {certifications.map((cert, i) => (
              <div key={i} className="flex items-start gap-4 p-4 bg-white/5 rounded-xl border border-white/5">
                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-sm">{cert.name}</div>
                  <div className="text-xs text-slate-500 mb-1">{cert.desc}</div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${cert.status === 'Certified' || cert.status === 'Compliant' ? 'bg-emerald-500/20 text-emerald-400' : cert.status === 'Aligned' ? 'bg-primary/20 text-primary' : 'bg-amber-500/20 text-amber-400'}`}>
                    {cert.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Responsible disclosure */}
        <div className="glass-panel rounded-2xl border border-amber-500/20 bg-amber-500/5 p-8">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-amber-400">
            <AlertTriangle className="w-5 h-5" /> Responsible Disclosure Policy
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed mb-4">We welcome security researchers to responsibly disclose vulnerabilities in CleanCity AI systems. We commit to:</p>
          <ul className="space-y-2 text-sm text-slate-400 mb-6">
            {[
              "Acknowledge your report within 24 hours",
              "Provide a resolution timeline within 5 business days",
              "Not pursue legal action for good-faith security research",
              "Credit researchers in our security hall of fame (with permission)",
              "Offer recognition rewards for critical vulnerability disclosures"
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" /> {item}
              </li>
            ))}
          </ul>
          <a href="mailto:security@cleancity.ai" className="inline-flex items-center gap-2 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/30 text-amber-400 font-semibold px-5 py-2.5 rounded-lg transition-colors text-sm">
            Report a Vulnerability · security@cleancity.ai
          </a>
        </div>
      </main>

      <footer className="relative z-10 border-t border-white/10 py-8 text-center text-slate-600 text-sm">
        <p>© 2025 Urbanova Technologies Pvt. Ltd. · CIN: U72900KA2023PTC185421</p>
      </footer>
    </div>
  );
}
