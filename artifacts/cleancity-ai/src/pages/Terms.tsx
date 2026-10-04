import { Link } from "wouter";
import { Leaf, FileText, ArrowLeft, AlertTriangle, CheckCircle, Scale, Building } from "lucide-react";

export function Terms() {
  return (
    <div className="min-h-screen bg-[#050814] text-slate-50 font-sans">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-accent/10 blur-[150px]" />
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

      <main className="relative z-10 max-w-4xl mx-auto px-6 py-16">
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-6">
            <FileText className="w-4 h-4" /> Terms & Conditions
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Terms of Service</h1>
          <p className="text-slate-400 text-lg">Last updated: January 15, 2025 · Effective: January 15, 2025</p>
        </div>

        <div className="glass-panel rounded-2xl border border-white/5 p-8 mb-6">
          <p className="text-slate-300 leading-relaxed">
            These Terms and Conditions ("Terms") govern your access to and use of the CleanCity AI platform, APIs, mobile applications, and related services ("Services") operated by Urbanova Technologies Pvt. Ltd. ("Urbanova", "we", "us"). By accessing our Services, whether as a municipality partner, operator, field agent, or citizen reporter, you agree to be bound by these Terms. If you do not agree, do not use the Services.
          </p>
        </div>

        <div className="space-y-6">
          {[
            {
              icon: Building,
              title: "1. Eligibility & Account Registration",
              content: `**Municipality Partners**: Access is granted via a signed Master Service Agreement (MSA) with Urbanova Technologies. The contracting municipality is responsible for all users created under its tenant.

**Operators & Analysts**: Must be employed by or contracted to a municipality partner. Account credentials are issued by the municipality administrator and are non-transferable.

**Citizen Reporters**: Any resident of a CleanCity AI-enabled ward (18 years of age or older, or 13+ with parental consent) may register for the Civic Points community program.

You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.`
            },
            {
              icon: CheckCircle,
              title: "2. Permitted Use",
              content: `The CleanCity AI platform is licensed — not sold — to you for the following permitted uses only:

• Managing and resolving urban cleanliness and infrastructure incidents within contracted municipality boundaries
• Monitoring environmental data (AQI, weather, drainage) for public health and policy purposes
• Training and dispatching field response teams using AI-generated alerts
• Generating municipal reports and analytics for governance and funding purposes
• Participating in the Civic Points community program (citizen reporters only)
• Accessing AI predictions and hotspot data for preventive urban planning

You may NOT use the Services to: (a) compete with Urbanova Technologies; (b) reverse engineer, decompile, or extract source code; (c) scrape data using automated tools without written authorization; (d) use the platform for any illegal purpose under Indian law.`
            },
            {
              icon: AlertTriangle,
              title: "3. AI Detections — Important Disclaimers",
              content: `CleanCity AI uses machine learning models for automated detection and prediction. You acknowledge and agree that:

• AI detection outputs (incident type, confidence scores, severity) are **recommendations**, not definitive findings. Human review is required before legal or enforcement action.
• Predictive models are probabilistic. A 87% waste surge probability means 13% chance it does NOT occur. Predictions should inform — not replace — human judgment.
• Camera feeds and AI outputs may contain errors due to lighting, occlusion, model drift, or adversarial conditions.
• Urbanova Technologies is not liable for decisions made by municipalities or field teams based on AI outputs.

Field supervisors and administrators are responsible for verifying AI-flagged incidents before escalating to enforcement or emergency response.`
            },
            {
              icon: Scale,
              title: "4. Civic Points Program Rules",
              content: `Citizens participating in the Civic Points program agree to:

• Submit only genuine incident reports from locations within covered wards
• Not submit duplicate, false, or fabricated reports (doing so results in permanent account ban)
• Not attempt to manipulate the points system through automation, scripts, or coordinated fraud
• Accept that Urbanova reserves the right to verify reports and adjust points if reports are found to be invalid

**Points & Rewards**: Civic Points have no monetary value and cannot be exchanged for cash. Reward redemptions (BMTC passes, Yulu subscriptions, vouchers) are subject to partner availability and may be withdrawn without notice. Points expire after 18 months of inactivity.`
            },
            {
              icon: FileText,
              title: "5. Intellectual Property",
              content: `**Urbanova Property**: All platform software, AI models, detection algorithms, the ARIA copilot engine, user interfaces, and documentation are owned by Urbanova Technologies Pvt. Ltd. and protected by Indian copyright law and international IP treaties. No license is granted beyond what is explicitly stated in these Terms or your MSA.

**Municipality Data**: Operational data generated by municipality partners (incident logs, camera placements, ward boundaries) remains owned by the respective municipality. Urbanova is granted a limited license to process this data to deliver the Services.

**Citizen Reports**: Citizens grant Urbanova a non-exclusive, royalty-free license to use submitted incident reports (including photographs) to operate and improve the CleanCity AI platform. Citizens retain ownership of their original content.`
            },
            {
              icon: Scale,
              title: "6. Limitation of Liability & Governing Law",
              content: `To the maximum extent permitted under applicable law:

• Urbanova Technologies shall not be liable for indirect, incidental, consequential, or punitive damages arising from use of the platform, including but not limited to: emergency response delays, environmental harm, or property damage resulting from AI misclassification.
• Our total cumulative liability to any party shall not exceed the fees paid to Urbanova in the 3 months preceding the claim.
• These Terms are governed by the laws of Karnataka, India. Any disputes shall be subject to the exclusive jurisdiction of courts in Bengaluru, Karnataka.

**For Municipality MSA Partners**: Liability terms, SLA guarantees, and uptime commitments are governed by your separately executed Master Service Agreement, which takes precedence over these general Terms.

For questions about these Terms, contact legal@cleancity.ai or write to Urbanova Technologies, 4th Floor, Salarpuria Towers, MG Road, Bengaluru — 560001.`
            }
          ].map(({ icon: Icon, title, content }, i) => (
            <div key={i} className="glass-panel rounded-2xl border border-white/5 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-accent" />
                </div>
                <h2 className="text-xl font-bold">{title}</h2>
              </div>
              <div className="text-slate-300 leading-relaxed text-sm whitespace-pre-line space-y-3">
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
