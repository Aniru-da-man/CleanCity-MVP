export type CitizenReport = {
  id: string;
  type: string;
  location: string;
  details: string;
  photoName?: string;
  createdAt: string;
  status: "Submitted" | "Under review" | "Resolved";
  aiAnalysis?: AiReportAnalysis;
  pointsAwarded?: number;
  photoDataUrl?: string;
};

export type DetectedBox = {
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  severity: AiReportAnalysis["severity"];
  isPrimary?: boolean;
};

export type AiReportAnalysis = {
  wasteType: string;
  severity: "Low" | "Medium" | "High" | "Critical";
  confidence: number;
  deploymentTime: string;
  team: string;
  summary: string;
  points: number;
  scannedAt: string;
  boundingBoxes: DetectedBox[];
  binDetected: boolean;
  model?: string;
  scanMode?: "live" | "simulation";
  imageQuality?: "good" | "fair" | "poor";
  needsReview?: boolean;
  reviewReason?: string;
};

const REPORTS_KEY = "cleancity.citizen.reports";
const POINTS_KEY = "cleancity.citizen.points";
const STARTING_POINTS = 450;

export function getCitizenReports(): CitizenReport[] {
  if (typeof window === "undefined") return [];

  try {
    const value = window.localStorage.getItem(REPORTS_KEY);
    if (!value) return [];
    const reports = JSON.parse(value) as CitizenReport[];
    return Array.isArray(reports) ? reports : [];
  } catch {
    return [];
  }
}

export function getCitizenPoints(): number {
  if (typeof window === "undefined") return STARTING_POINTS;
  try {
    const raw = window.localStorage.getItem(POINTS_KEY);
    if (raw === null) return STARTING_POINTS;
    const value = Number(raw);
    return Number.isFinite(value) ? value : STARTING_POINTS;
  } catch {
    return STARTING_POINTS;
  }
}

export function awardCitizenPoints(points: number): number {
  const total = getCitizenPoints() + points;
  try {
    window.localStorage.setItem(POINTS_KEY, String(total));
  } catch {
    // Keep the completed report flow working when browser storage is full or disabled.
  }
  window.dispatchEvent(new Event("cleancity:points-updated"));
  return total;
}

export function saveCitizenReport(report: Omit<CitizenReport, "id" | "createdAt" | "status">): CitizenReport {
  const savedReport: CitizenReport = {
    ...report,
    id: `CC-${Date.now().toString(36).toUpperCase()}`,
    createdAt: new Date().toISOString(),
    status: "Submitted",
    pointsAwarded: report.aiAnalysis?.points,
  };

  const reports = [savedReport, ...getCitizenReports()];
  try {
    window.localStorage.setItem(REPORTS_KEY, JSON.stringify(reports));
  } catch {
    // Photos are kept in the current report view, but are too large to retain in localStorage.
    const compactReports = reports.slice(0, 12).map(({ photoDataUrl: _photoDataUrl, ...reportWithoutPhoto }) => reportWithoutPhoto);
    try {
      window.localStorage.setItem(REPORTS_KEY, JSON.stringify(compactReports));
    } catch {
      // Return the in-memory report so a storage limit never turns a successful scan into an error.
    }
  }
  window.dispatchEvent(new Event("cleancity:reports-updated"));
  return savedReport;
}
