import { FormEvent, useEffect, useState } from "react";
import { Bot, CheckCircle2, Clock3, ImagePlus, MapPin, Megaphone, ScanLine, Send, Sparkles, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { awardCitizenPoints, getCitizenReports, saveCitizenReport, type AiReportAnalysis, type CitizenReport as CitizenReportRecord, type DetectedBox } from "@/lib/citizen-reports";

type ScanState = "idle" | "scanning" | "complete";

type VisionDetection = {
  label: string;
  severity: AiReportAnalysis["severity"];
  confidence: number;
  x: number;
  y: number;
  width: number;
  height: number;
  issueClass: string;
};

type VisionApiPayload = {
  analysis?: {
    primaryIssue: string;
    overallSeverity: AiReportAnalysis["severity"];
    confidence: number;
    summary: string;
    imageQuality: "good" | "fair" | "poor";
    needsReview: boolean;
    reviewReason: string;
    detections: VisionDetection[];
  };
  model?: string;
  mode?: "live" | "simulation";
  fallback?: boolean;
  error?: string;
};

async function analyzeReportImage(imageDataUrl: string, details: string, selectedType: string): Promise<AiReportAnalysis> {
  try {
    const response = await fetch("/api/vision/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ imageDataUrl, details, issueType: selectedType }),
      signal: AbortSignal.timeout(105_000),
    });

    const responseText = await response.text();
    const payload = responseText ? JSON.parse(responseText) as VisionApiPayload : {};
    if (!response.ok || !payload.analysis) return createSimulatedAnalysis(imageDataUrl, details, selectedType);
    if (payload.mode === "simulation" || payload.fallback) return createSimulatedAnalysis(imageDataUrl, details, selectedType);

    const raw = payload.analysis;
  const deploymentTime = raw.overallSeverity === "Critical" ? "2–4 hours (priority response)" : raw.overallSeverity === "High" ? "6–12 hours" : raw.overallSeverity === "Medium" ? "24–48 hours" : "48–72 hours";
  const points = raw.overallSeverity === "Critical" ? 25 : raw.overallSeverity === "High" ? 20 : raw.overallSeverity === "Medium" ? 15 : 10;
  const team = raw.detections.some((detection) => ["pothole", "road_damage"].includes(detection.issueClass))
    ? "Roads and pothole response crew"
    : raw.detections.some((detection) => ["sewage_contamination", "drainage_issue", "flooding", "standing_water"].includes(detection.issueClass))
      ? "Drainage and wastewater response crew"
      : raw.overallSeverity === "Critical" ? "Hazard response crew" : "Nearest sanitation cleanup crew";

  const boundingBoxes: DetectedBox[] = raw.detections.map((detection, index) => ({
    x: detection.x,
    y: detection.y,
    width: detection.width,
    height: detection.height,
    label: `${detection.label} · ${detection.confidence}%`,
    severity: detection.severity,
    isPrimary: index === 0,
  }));

    return {
    wasteType: raw.primaryIssue,
    severity: raw.overallSeverity,
    confidence: Math.round(raw.confidence),
    deploymentTime,
    team,
    summary: raw.summary,
    points,
    scannedAt: new Date().toISOString(),
    boundingBoxes,
    binDetected: raw.detections.some((detection) => detection.issueClass === "overflowing_bin"),
    model: payload.model,
    scanMode: payload.mode || (payload.fallback ? "simulation" : "live"),
    imageQuality: raw.imageQuality,
    needsReview: raw.needsReview,
    reviewReason: raw.reviewReason,
    };
  } catch {
    return createSimulatedAnalysis(imageDataUrl, details, selectedType);
  }
}

type CandidateRegion = { left: number; top: number; right: number; bottom: number; area: number };

async function findVisualCandidateBoxes(imageDataUrl: string): Promise<DetectedBox[]> {
  const response = await fetch(imageDataUrl);
  const bitmap = await createImageBitmap(await response.blob());
  const width = 128;
  const height = Math.max(1, Math.round(width * bitmap.height / bitmap.width));
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d", { willReadFrequently: true });
  if (!context) {
    bitmap.close();
    return [];
  }
  context.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();

  const pixels = context.getImageData(0, 0, width, height).data;
  const scores = new Float32Array(width * height);
  const sortedScores: number[] = [];
  for (let y = 2; y < height - 2; y += 1) {
    for (let x = 2; x < width - 2; x += 1) {
      let red = 0;
      let green = 0;
      let blue = 0;
      for (let dy = -2; dy <= 2; dy += 1) {
        for (let dx = -2; dx <= 2; dx += 1) {
          const offset = ((y + dy) * width + x + dx) * 4;
          red += pixels[offset];
          green += pixels[offset + 1];
          blue += pixels[offset + 2];
        }
      }
      const pixelOffset = (y * width + x) * 4;
      const score = Math.hypot(
        pixels[pixelOffset] - red / 25,
        pixels[pixelOffset + 1] - green / 25,
        pixels[pixelOffset + 2] - blue / 25,
      );
      scores[y * width + x] = score;
      sortedScores.push(score);
    }
  }

  sortedScores.sort((a, b) => a - b);
  const threshold = Math.max(22, sortedScores[Math.floor(sortedScores.length * 0.82)] || 22);
  const active = new Uint8Array(width * height);
  for (let index = 0; index < scores.length; index += 1) {
    if (scores[index] >= threshold) active[index] = 1;
  }

  const visited = new Uint8Array(width * height);
  const queue = new Int32Array(width * height);
  const regions: CandidateRegion[] = [];
  for (let index = 0; index < active.length; index += 1) {
    if (!active[index] || visited[index]) continue;
    let read = 0;
    let write = 0;
    queue[write++] = index;
    visited[index] = 1;
    let left = width;
    let top = height;
    let right = 0;
    let bottom = 0;
    while (read < write) {
      const current = queue[read++];
      const x = current % width;
      const y = Math.floor(current / width);
      left = Math.min(left, x);
      top = Math.min(top, y);
      right = Math.max(right, x);
      bottom = Math.max(bottom, y);
      for (let dy = -1; dy <= 1; dy += 1) {
        for (let dx = -1; dx <= 1; dx += 1) {
          if (dx === 0 && dy === 0) continue;
          const nx = x + dx;
          const ny = y + dy;
          if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
          const next = ny * width + nx;
          if (!active[next] || visited[next]) continue;
          visited[next] = 1;
          queue[write++] = next;
        }
      }
    }
    if (write >= 5 && write <= width * height * 0.35) {
      regions.push({ left, top, right, bottom, area: write });
    }
  }

  // Merge nearby visual fragments so one pile receives one box while distant piles stay separate.
  for (let index = 0; index < regions.length; index += 1) {
    let merged = true;
    while (merged) {
      merged = false;
      for (let other = index + 1; other < regions.length; other += 1) {
        const a = regions[index];
        const b = regions[other];
        const gapX = Math.max(0, a.left - b.right - 1, b.left - a.right - 1);
        const gapY = Math.max(0, a.top - b.bottom - 1, b.top - a.bottom - 1);
        if (Math.hypot(gapX, gapY) > 4) continue;
        a.left = Math.min(a.left, b.left);
        a.top = Math.min(a.top, b.top);
        a.right = Math.max(a.right, b.right);
        a.bottom = Math.max(a.bottom, b.bottom);
        a.area += b.area;
        regions.splice(other, 1);
        merged = true;
        break;
      }
    }
  }

  return regions
    .sort((a, b) => b.area - a.area)
    .slice(0, 12)
    .map((region, index) => ({
      x: Math.max(0, (region.left - 1) / width * 100),
      y: Math.max(0, (region.top - 1) / height * 100),
      width: Math.min(100, (region.right - region.left + 3) / width * 100),
      height: Math.min(100, (region.bottom - region.top + 3) / height * 100),
      label: `Visual candidate cluster ${index + 1} · simulated`,
      severity: "Medium",
      isPrimary: index === 0,
    }));
}

async function createSimulatedAnalysis(imageDataUrl: string, details: string, selectedType: string): Promise<AiReportAnalysis> {
  const context = `${selectedType} ${details}`.toLowerCase();
  const issue = context.includes("pothole") || context.includes("road damage")
    ? "Pothole / road damage"
    : context.includes("bin") || context.includes("overflow")
      ? "Overflowing bin"
      : context.includes("drain") || context.includes("sewage") || context.includes("flood")
        ? "Drainage or water issue"
        : context.includes("dump")
          ? "Illegal dumping"
          : "Waste accumulation";
  let boundingBoxes: DetectedBox[] = [];
  try {
    boundingBoxes = await findVisualCandidateBoxes(imageDataUrl);
  } catch {
    // Image decoding may fail in an unsupported browser; keep a visible full-frame review box.
  }
  if (boundingBoxes.length === 0) {
    boundingBoxes = [{ x: 0, y: 0, width: 100, height: 100, label: "Full-frame review · simulated", severity: "Low", isPrimary: true }];
  }

  return {
    wasteType: issue,
    severity: "Medium",
    confidence: 40,
    deploymentTime: "24–48 hours",
    team: "Nearest sanitation cleanup crew",
    summary: `Fast visual simulation found ${boundingBoxes.length} candidate region${boundingBoxes.length === 1 ? "" : "s"} for ${issue.toLowerCase()}. Nearby visual regions are grouped. This is an image heuristic, so check the boxes before dispatch.`,
    points: 15,
    scannedAt: new Date().toISOString(),
    boundingBoxes,
    binDetected: issue === "Overflowing bin",
    model: "simulation-v1",
    scanMode: "simulation",
    imageQuality: "fair",
    needsReview: true,
    reviewReason: "Simulation groups image texture and contrast regions; confirm every box against the photo before dispatch.",
  };
}

function readAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

async function prepareScanImage(file: File): Promise<string> {
  const bitmap = await createImageBitmap(file);
  const maxDimension = 1600;
  const scale = Math.min(1, maxDimension / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(bitmap.width * scale));
  canvas.height = Math.max(1, Math.round(bitmap.height * scale));
  const context = canvas.getContext("2d");
  if (!context) {
    bitmap.close();
    throw new Error("This browser could not prepare the image for scanning.");
  }
  context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();
  return canvas.toDataURL("image/jpeg", 0.82);
}

const severityStyles: Record<AiReportAnalysis["severity"], string> = {
  Low: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
  Medium: "border-amber-400/30 bg-amber-400/10 text-amber-200",
  High: "border-rose-400/30 bg-rose-400/10 text-rose-200",
  Critical: "border-red-400/40 bg-red-500/15 text-red-200",
};

function boxColor(severity: AiReportAnalysis["severity"]): string {
  if (severity === "Critical" || severity === "High") return "border-red-500 bg-red-500/10 text-red-100";
  if (severity === "Medium") return "border-yellow-400 bg-yellow-400/10 text-yellow-100";
  return "border-emerald-400 bg-emerald-400/10 text-emerald-100";
}

function AnnotatedImage({ src, boxes }: { src: string; boxes: DetectedBox[] }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/30">
      <img src={src} alt="Submitted evidence with AI detections" className="block max-h-[440px] w-full object-contain" />
      <div className="pointer-events-none absolute inset-0">
        {boxes.map((box, index) => (
          <div key={`${box.label}-${index}`} className={`absolute border-[3px] ${boxColor(box.severity)} ${box.isPrimary ? "z-10" : "z-0"}`} style={{ left: `${box.x}%`, top: `${box.y}%`, width: `${box.width}%`, height: `${box.height}%` }}>
            <span className="absolute left-[-3px] top-[-24px] whitespace-nowrap rounded-md border border-current bg-[#080d19]/95 px-2 py-1 text-[10px] font-bold shadow-lg">{box.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function CitizenReport() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [savedReport, setSavedReport] = useState<CitizenReportRecord | null>(null);
  const [reports, setReports] = useState<CitizenReportRecord[]>([]);
  const [photo, setPhoto] = useState<{ file: File; preview: string } | null>(null);
  const [scanState, setScanState] = useState<ScanState>("idle");
  const [analysis, setAnalysis] = useState<AiReportAnalysis | null>(null);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ type: "Waste accumulation", location: "", details: "" });

  useEffect(() => {
    const refreshReports = () => setReports(getCitizenReports());
    refreshReports();
    window.addEventListener("cleancity:reports-updated", refreshReports);
    return () => window.removeEventListener("cleancity:reports-updated", refreshReports);
  }, []);

  useEffect(() => () => { if (photo) URL.revokeObjectURL(photo.preview); }, [photo]);

  const choosePhoto = (file: File | undefined) => {
    if (!file) return;
    if (file.size > 8 * 1024 * 1024) { setError("Please choose an image smaller than 8 MB."); return; }
    if (photo) URL.revokeObjectURL(photo.preview);
    setPhoto({ file, preview: URL.createObjectURL(file) });
    setAnalysis(null);
    setScanState("idle");
    setError("");
  };

  const submitReport = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.location.trim() || !form.details.trim()) return;
    if (!photo) { setError("Add a photo so CleanCity Vision AI can scan the issue before submission."); return; }
    setError("");
    setScanState("scanning");
    try {
      const [photoDataUrl, scanImageDataUrl] = await Promise.all([
        readAsDataUrl(photo.file),
        prepareScanImage(photo.file),
      ]);
      const scan = await analyzeReportImage(scanImageDataUrl, form.details, form.type);
      setAnalysis(scan);
      setScanState("complete");
      const report = saveCitizenReport({ ...form, photoName: photo.file.name, photoDataUrl, aiAnalysis: scan });
      awardCitizenPoints(scan.points);
      setSavedReport(report);
      setSubmitted(true);
      toast({ title: `+${scan.points} civic points earned`, description: "The full-frame vision analysis is attached and the cleanup crew has been queued for review." });
    } catch (scanError) {
      setScanState("idle");
      setError(scanError instanceof Error ? scanError.message : "Vision AI could not complete the scan.");
    }
  };

  const resetForm = () => {
    setSubmitted(false);
    setSavedReport(null);
    setAnalysis(null);
    setScanState("idle");
    setForm({ type: "Waste accumulation", location: "", details: "" });
    if (photo) URL.revokeObjectURL(photo.preview);
    setPhoto(null);
  };

  if (submitted && savedReport?.aiAnalysis) {
    const result = savedReport.aiAnalysis;
    return (
      <div className="mx-auto max-w-5xl space-y-6 p-6 md:p-10">
        <div className="rounded-3xl border border-emerald-400/20 bg-emerald-400/10 p-7 sm:p-10">
          <div className="flex items-center gap-3"><CheckCircle2 className="h-10 w-10 text-emerald-300" /><div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">Report submitted</p><h1 className="mt-1 text-2xl font-bold">The cleanup request is ready for dispatch.</h1></div></div>
          <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary"><ScanLine className="h-4 w-4" /> Annotated evidence</p>
              <AnnotatedImage src={savedReport.photoDataUrl || photo?.preview || ""} boxes={result.boundingBoxes || []} />
              <div className="mt-3 flex flex-wrap gap-2 text-[11px] text-muted-foreground"><span className="rounded-full border border-red-400/30 px-2 py-1 text-red-200">Red · critical/high</span><span className="rounded-full border border-yellow-400/30 px-2 py-1 text-yellow-200">Yellow · medium</span><span className="rounded-full border border-emerald-400/30 px-2 py-1 text-emerald-200">Green · manageable</span></div>
            </div>
            <div className="space-y-3">
              <ResultStat label="Primary issue" value={result.wasteType} />
              <ResultStat label="Deployment estimate" value={result.deploymentTime} />
              <ResultStat label="Points earned" value={`+${result.points} points`} accent />
              <div className="rounded-lg border border-white/10 bg-black/10 p-3"><p className="text-[10px] uppercase tracking-wider text-muted-foreground">Detection details</p><p className="mt-1 text-sm font-semibold">{result.boundingBoxes?.length || 0} enclosing box{result.boundingBoxes?.length === 1 ? "" : "es"} · {result.binDetected ? "bin included" : "no bin visible"}</p></div>
            </div>
          </div>
          <div className="mt-6 rounded-xl border border-white/10 bg-black/10 p-4 text-sm leading-6 text-slate-300"><span className="font-semibold text-foreground">AI summary:</span> {result.summary}</div>
          {result.scanMode === "simulation" && <div className="mt-4 rounded-xl border border-amber-400/30 bg-amber-400/10 p-3 text-sm text-amber-100"><span className="font-semibold">Simulation fallback used:</span> connect a live vision API key and confirm this result before dispatch.</div>}
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-xs"><span className="font-mono text-primary">Reference {savedReport.id}</span><span className={`rounded-full border px-2.5 py-1 ${severityStyles[result.severity]}`}>{result.severity} priority · {result.confidence}% confidence</span></div>
          {result.needsReview && <div className="mt-4 rounded-xl border border-amber-400/30 bg-amber-400/10 p-3 text-sm text-amber-100"><span className="font-semibold">Manual review recommended:</span> {result.reviewReason || "Some detections are uncertain or the image quality is limited."}</div>}
          <button type="button" onClick={resetForm} className="mt-7 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90">Submit another report</button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-7 p-6 md:p-10">
      <div><div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary"><Megaphone className="h-4 w-4" /> Citizen reporting</div><h1 className="mt-3 text-3xl font-bold tracking-tight">Report an issue. Help the right crew arrive faster.</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">Add a photo and location. CleanCity Vision AI scans the entire frame at high detail, identifies every visible civic issue, draws a separate box around each one, creates a dispatch summary, and awards civic points.</p></div>
      <form onSubmit={submitReport} className="grid gap-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-7">
        <label className="space-y-2 text-sm font-medium">Issue type<select value={form.type} onChange={(event) => setForm({ ...form, type: event.target.value })} className="flex h-10 w-full rounded-md border border-white/10 bg-[#111a2b] px-3 text-sm text-foreground"><option>Waste accumulation</option><option>Overflowing bin</option><option>Illegal dumping</option><option>Other waste issue</option></select></label>
        <label className="space-y-2 text-sm font-medium">Where is it?<div className="relative"><MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" /><Input required value={form.location} onChange={(event) => setForm({ ...form, location: event.target.value })} placeholder="Street, landmark, or neighbourhood" className="h-10 border-white/10 bg-white/5 pl-9" /></div></label>
        <label className="space-y-2 text-sm font-medium">What did you see?<Textarea required value={form.details} onChange={(event) => setForm({ ...form, details: event.target.value })} placeholder="Describe the issue in a few words" className="min-h-28 border-white/10 bg-white/5" /></label>
        <div className="rounded-xl border border-dashed border-primary/30 bg-primary/[0.04] p-4"><div className="flex items-start gap-3"><ImagePlus className="mt-0.5 h-5 w-5 shrink-0 text-primary" /><div className="min-w-0 flex-1"><p className="text-sm font-medium">Photo evidence <span className="font-normal text-rose-300">(required for AI scan)</span></p><p className="mt-1 text-xs text-muted-foreground">Upload a clear image of the issue. The high-detail vision engine checks the entire image, including corners and edges, before your report is submitted.</p><label className="mt-3 inline-flex cursor-pointer items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-slate-200 transition-colors hover:bg-white/10"><input type="file" required={!photo} accept="image/*" className="sr-only" onChange={(event) => choosePhoto(event.target.files?.[0])} /><ImagePlus className="h-3.5 w-3.5" /> {photo ? "Replace image" : "Choose image"}</label>{photo && <div className="mt-3 flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.03] p-2"><img src={photo.preview} alt="Selected evidence" className="h-14 w-14 rounded-md object-cover" /><div className="min-w-0 flex-1"><p className="truncate text-xs font-medium">{photo.file.name}</p><p className="text-[11px] text-muted-foreground">{Math.ceil(photo.file.size / 1024)} KB · ready for full-frame Vision AI</p></div><button type="button" onClick={() => { URL.revokeObjectURL(photo.preview); setPhoto(null); setAnalysis(null); }} className="rounded-md p-1.5 text-muted-foreground hover:bg-white/10 hover:text-foreground" aria-label="Remove selected image"><Trash2 className="h-4 w-4" /></button></div>}</div></div></div>
        {scanState === "scanning" && <div className="flex items-center gap-3 rounded-xl border border-primary/20 bg-primary/10 p-4 text-sm text-primary"><ScanLine className="h-5 w-5 animate-pulse" /><div><p className="font-semibold">CleanCity Vision AI is scanning the full frame…</p><p className="mt-1 text-xs text-primary/70">Inspecting all regions, separating distinct issues, tightening boxes, and checking confidence.</p></div></div>}
        {scanState === "complete" && analysis && <div className="rounded-xl border border-emerald-400/20 bg-emerald-400/10 p-4"><div className="flex items-center gap-2 text-sm font-semibold text-emerald-200"><Bot className="h-4 w-4" /> {analysis.scanMode === "simulation" ? "Simulation fallback scan complete" : "Full-frame AI scan complete"} <span className="ml-auto text-xs font-normal">{analysis.confidence}% confidence</span></div><div className="mt-3 grid gap-3 sm:grid-cols-3"><ResultStat label="Primary issue" value={analysis.wasteType} /><ResultStat label="Response" value={analysis.deploymentTime} /><ResultStat label="Engine" value={analysis.model || "Vision AI"} /></div>{analysis.needsReview && <p className="mt-3 text-xs text-amber-200">Manual review recommended: {analysis.reviewReason || "the image contains uncertain evidence"}.</p>}</div>}
        {error && <p className="text-sm text-rose-300" role="alert">{error}</p>}
        <button type="submit" disabled={scanState === "scanning"} className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-wait disabled:opacity-70"><Send className="h-4 w-4" /> {scanState === "scanning" ? "Scanning image…" : "Scan & submit report"}</button>
      </form>
      <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-7"><div className="flex items-end justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Your activity</p><h2 className="mt-2 text-xl font-bold">Recent reports</h2></div><span className="text-xs text-muted-foreground">{reports.length} submitted</span></div>{reports.length === 0 ? <p className="mt-5 text-sm leading-6 text-muted-foreground">Your submitted reports will appear here with an AI summary, response time, annotated image, and points earned.</p> : <div className="mt-5 space-y-3">{reports.slice(0, 4).map((report) => <div key={report.id} className="rounded-xl border border-white/10 bg-black/10 p-4"><div className="flex flex-wrap items-center justify-between gap-2"><p className="text-sm font-semibold">{report.aiAnalysis?.wasteType || report.type}</p><span className="rounded-full bg-amber-400/10 px-2.5 py-1 text-[11px] font-medium text-amber-200">{report.status}</span></div><p className="mt-1 text-xs text-muted-foreground">{report.location} · {new Date(report.createdAt).toLocaleDateString()}</p>{report.aiAnalysis && <div className="mt-3 flex flex-wrap gap-2 text-[11px]"><span className="inline-flex items-center gap-1 rounded-full border border-white/10 px-2 py-1 text-slate-300"><Clock3 className="h-3 w-3 text-primary" /> {report.aiAnalysis.deploymentTime}</span><span className="inline-flex items-center gap-1 rounded-full border border-white/10 px-2 py-1 text-emerald-300"><Sparkles className="h-3 w-3" /> +{report.aiAnalysis.points} points</span></div>}<p className="mt-3 font-mono text-[11px] text-primary">{report.id}{report.photoName ? " · photo annotated" : ""}</p></div>)}</div>}</section>
    </div>
  );
}

function ResultStat({ label, value, accent = false }: { label: string; value: string; accent?: boolean }) {
  return <div className="rounded-lg border border-white/10 bg-black/10 p-3"><p className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</p><p className={`mt-1 text-sm font-semibold ${accent ? "text-emerald-300" : "text-foreground"}`}>{value}</p></div>;
}
