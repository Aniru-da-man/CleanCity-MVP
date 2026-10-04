import { Link } from "wouter";
import { Leaf, ShieldCheck, Lock, Eye, Database, Globe, Mail, ArrowLeft } from "lucide-react";

export function Privacy() {
  return (
    <div className="min-h-screen bg-[#050814] text-slate-50 font-sans">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[150px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] rounded-full bg-accent/10 blur-[120px]" />
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

      <main className="relative z-10 max-w-4xl mx-auto px-6 py-16">
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
            <ShieldCheck className="w-4 h-4" /> Privacy Policy
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Your Privacy Matters</h1>
          <p className="text-slate-400 text-lg">Last updated: January 15, 2025 · Effective: January 15, 2025</p>
        </div>

        <div className="glass-panel rounded-2xl border border-white/5 p-8 mb-6">
          <p className="text-slate-300 leading-relaxed">
            Urbanova Technologies Pvt. Ltd. ("Urbanova," "we," "our," or "us") operates the CleanCity AI platform — a smart city management system deployed across Karnataka municipalities. This Privacy Policy explains how we collect, use, disclose, and protect information in connection with our platform, services, mobile applications, and APIs ("Services"). By accessing or using our Services, you agree to this policy.
          </p>
        </div>

        <div className="space-y-6">
          {[
            {
              icon: Database,
              title: "1. Information We Collect",
              content: `We collect information in three ways:

**Platform Data (Municipality-provided)**
City authorities provide operational data to power the CleanCity AI platform, including: CCTV camera feeds (processed on-device; raw video is not stored beyond 72 hours), incident reports and location data, sensor readings (AQI, temperature, drainage flow), and geospatial data for 198 BBMP wards.

**Citizen Data (Community Program)**
Citizens who participate in the Civic Points program voluntarily provide: name and email address for account creation, incident reports with photos and GPS coordinates, and engagement data (reports submitted, badges earned, points history).

**Technical Data (Automatic)**
When you use our web or mobile platform: IP address and device identifiers, browser type and operating system, usage logs and session data, and performance metrics.`
            },
            {
              icon: Eye,
              title: "2. How We Use Your Information",
              content: `We use collected information exclusively for:

• **Platform Operation**: Processing AI detections, routing incident reports to field teams, generating environmental alerts, and managing municipal workflows across BBMP departments.
• **Predictive Analytics**: Training and improving machine learning models for waste surge prediction, flood risk assessment, and pollution forecasting using anonymized, aggregated city data.
• **Civic Rewards**: Managing Civic Points balances, badge allocations, leaderboard rankings, and reward redemptions for registered citizens.
• **Communications**: Sending platform alerts, incident notifications, weekly city health summaries, and system maintenance notices.
• **Legal & Safety**: Complying with Karnataka government regulations, court orders, and emergency public safety obligations.

We do NOT use your data for advertising, sell it to third parties, or use it for purposes beyond operating the CleanCity AI platform.`
            },
            {
              icon: Lock,
              title: "3. Data Security",
              content: `We employ enterprise-grade security measures aligned with India's Information Technology Act, 2000 and the Digital Personal Data Protection Act, 2023 (DPDPA):

• **Encryption**: All data in transit is encrypted using TLS 1.3. Data at rest is encrypted using AES-256.
• **Access Control**: Role-based access control (RBAC) limits data access to authorized municipality personnel only. All access is logged and audited.
• **CCTV Data**: Camera feeds are processed by on-device AI inference engines. Raw video is auto-deleted after 72 hours. Detection metadata (type, confidence, timestamp, location) is retained for 12 months.
• **Penetration Testing**: Our systems undergo quarterly security audits by CERT-In empanelled auditors.
• **Data Centers**: Hosted on AWS India (Mumbai region) with SOC 2 Type II certification.`
            },
            {
              icon: Globe,
              title: "4. Data Sharing",
              content: `We share data only in the following limited circumstances:

• **Municipal Authorities**: Incident reports, detection logs, and environmental data are shared with authorized BBMP/BWSSB/BESCOM officials as part of the contracted service.
• **Service Providers**: We use sub-processors for cloud hosting (AWS), analytics (anonymized only), and email delivery. All sub-processors are GDPR/DPDPA compliant.
• **Legal Requirements**: We may disclose data to Karnataka law enforcement or courts when legally required.
• **Emergency Response**: In life-threatening situations, relevant data may be shared with emergency services without prior notice.

We do not sell, trade, or transfer your personal data to commercial third parties.`
            },
            {
              icon: ShieldCheck,
              title: "5. Your Rights (DPDPA 2023)",
              content: `Under India's Digital Personal Data Protection Act, 2023, you have the following rights:

• **Right to Access**: Request a copy of personal data we hold about you.
• **Right to Correction**: Request correction of inaccurate personal data.
• **Right to Erasure**: Request deletion of your personal data, subject to legal retention requirements.
• **Right to Grievance Redressal**: Lodge a complaint with our Data Protection Officer (DPO) within 30 days of any data concern.
• **Right to Nominate**: Designate a nominee to exercise your rights in case of incapacity.

To exercise any right, contact our DPO at privacy@cleancity.ai. We will respond within 30 business days.`
            },
            {
              icon: Mail,
              title: "6. Contact & DPO",
              content: `**Data Protection Officer**
Urbanova Technologies Pvt. Ltd.
4th Floor, Salarpuria Towers, MG Road
Bengaluru — 560001, Karnataka, India

Email: privacy@cleancity.ai
Phone: +91 80 4567 8901
DPO Direct: dpo@cleancity.ai

For complaints unresolved by our DPO, you may approach the Data Protection Board of India at dpbi.gov.in.

This policy may be updated periodically. Material changes will be communicated via email or in-platform notification at least 14 days in advance.`
            }
          ].map(({ icon: Icon, title, content }, i) => (
            <div key={i} className="glass-panel rounded-2xl border border-white/5 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-xl font-bold">{title}</h2>
              </div>
              <div className="text-slate-300 leading-relaxed space-y-4 text-sm whitespace-pre-line">
                {content}
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="relative z-10 border-t border-white/10 py-8 text-center text-slate-600 text-sm">
        <p>© 2025 Urbanova Technologies Pvt. Ltd. · CIN: U72900KA2023PTC185421</p>
      </footer>
    </div>
  );
}
