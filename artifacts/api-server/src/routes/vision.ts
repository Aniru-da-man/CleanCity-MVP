import { Router, type IRouter, type Response } from "express";

const router: IRouter = Router();

const LOCAL_VISION_URL = (process.env["LOCAL_VISION_URL"] || "http://127.0.0.1:11434").replace(/\/$/, "");
const LOCAL_VISION_MODEL = process.env["LOCAL_VISION_MODEL"] || "qwen3-vl:4b";
const MAX_IMAGE_DATA_URL_LENGTH = 12 * 1024 * 1024;
const FALLBACK_MODE = (process.env["VISION_FALLBACK_MODE"] || "simulation").toLowerCase();

const issueClasses = [
  "waste_accumulation",
  "overflowing_bin",
  "illegal_dumping",
  "pothole",
  "sewage_contamination",
  "drainage_issue",
  "flooding",
  "standing_water",
  "road_damage",
  "construction_debris",
  "plastic_waste",
  "organic_waste",
  "hazardous_spill",
  "graffiti",
  "other_environmental_issue",
] as const;

const localDetectionSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    detections: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        properties: {
          issueClass: { type: "string", enum: issueClasses },
          label: { type: "string" },
          confidence: { type: "number", minimum: 0, maximum: 100 },
          x: { type: "number", minimum: 0, maximum: 100 },
          y: { type: "number", minimum: 0, maximum: 100 },
          width: { type: "number", minimum: 0, maximum: 100 },
          height: { type: "number", minimum: 0, maximum: 100 },
        },
        required: ["issueClass", "label", "confidence", "x", "y", "width", "height"],
      },
    },
  },
  required: ["detections"],
} as const;

type VisionRequest = {
  imageDataUrl?: string;
  issueType?: string;
  details?: string;
};

type OllamaResponsePayload = {
  message?: { content?: string };
  error?: string;
};

type FallbackReason = "local_unavailable";

type SimulationAnalysis = {
  status: "uncertain";
  primaryIssue: string;
  overallSeverity: "Low" | "Medium" | "High" | "Critical";
  confidence: number;
  summary: string;
  imageQuality: "fair";
  needsReview: true;
  reviewReason: string;
  detections: Array<{
    issueClass: (typeof issueClasses)[number];
    label: string;
    severity: "Low" | "Medium" | "High" | "Critical";
    confidence: number;
    x: number;
    y: number;
    width: number;
    height: number;
    visibleEvidence: string;
    isPrimary: true;
  }>;
};

function badRequest(res: Response, message: string): void {
  res.status(400).json({ error: message });
}

function parseJsonObject(text: string): unknown {
  try {
    return JSON.parse(text);
  } catch {
    return undefined;
  }
}

async function tryLocalVision(
  issueType: string,
  details: string,
  imageDataUrl: string,
  log: { warn: (message: string, ...args: unknown[]) => void },
): Promise<{ model: string; analysis: unknown } | undefined> {
  const imageData = imageDataUrl.split(",", 2)[1];
  if (!imageData) return undefined;

  try {
    const response = await fetch(`${LOCAL_VISION_URL}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: AbortSignal.timeout(50_000),
      body: JSON.stringify({
        model: LOCAL_VISION_MODEL,
        stream: false,
        format: localDetectionSchema,
        messages: [{
          role: "user",
          content: `Inspect the whole image for visible civic waste or road hazards. Return at most 6 non-overlapping boxes around distinct piles or issues, grouping adjacent litter into a single pile. Ignore vehicles, people, and clean road. Give each box as percentages from 0 to 100 of the full image: x and y are the top-left; width and height are its size. Use issueClass from the allowed list and describe only visible evidence. Reporter type: ${issueType}. Reporter note: ${details || "none"}.`,
          images: [imageData],
        }],
        options: { temperature: 0, num_predict: 180 },
      }),
    });

    const payload = (parseJsonObject(await response.text()) ?? {}) as OllamaResponsePayload;
    if (!response.ok) {
      log.warn(`Local vision model rejected scan: ${payload.error || response.status}`);
      return undefined;
    }
    if (!payload.message?.content) return undefined;
    const localResult = parseJsonObject(payload.message.content) as { detections?: Array<Record<string, unknown>> } | undefined;
    if (!Array.isArray(localResult?.detections)) return undefined;

    const inferred = inferSimulationIssue(issueType, details);
    const detections = localResult.detections
      .filter((detection) => [detection.x, detection.y, detection.width, detection.height].every((value) => typeof value === "number" && Number.isFinite(value)))
      .map((detection, index) => {
        const rawCoordinates = [Number(detection.x), Number(detection.y), Number(detection.width), Number(detection.height)];
        const coordinateScale = Math.max(...rawCoordinates) <= 1 ? 100 : 1;
        const x = Math.max(0, Math.min(100, Number(detection.x) * coordinateScale));
        const y = Math.max(0, Math.min(100, Number(detection.y) * coordinateScale));
        const width = Math.max(0, Math.min(100 - x, Number(detection.width) * coordinateScale));
        const height = Math.max(0, Math.min(100 - y, Number(detection.height) * coordinateScale));
        const issueClass = issueClasses.includes(detection.issueClass as (typeof issueClasses)[number])
          ? detection.issueClass as (typeof issueClasses)[number]
          : inferred.issueClass;
        return {
          issueClass,
          label: typeof detection.label === "string" && detection.label.trim() ? detection.label.trim() : inferred.label,
          severity: "Medium" as const,
          confidence: typeof detection.confidence === "number"
            ? Math.max(0, Math.min(100, detection.confidence <= 1 ? detection.confidence * 100 : detection.confidence))
            : 45,
          x,
          y,
          width,
          height,
          visibleEvidence: "Candidate region proposed by the local vision model.",
          isPrimary: index === 0,
        };
      })
      .filter((detection) => detection.width > 0 && detection.height > 0);
    const confidence = detections.length
      ? Math.round(detections.reduce((total, detection) => total + detection.confidence, 0) / detections.length)
      : 50;
    const analysis = {
      status: detections.length ? "uncertain" : "no_issue",
      primaryIssue: detections[0]?.label || "No visible waste detected",
      overallSeverity: detections.length > 3 ? "High" : detections.length ? "Medium" : "Low",
      confidence,
      summary: `Local ${LOCAL_VISION_MODEL} scan proposed ${detections.length} waste or hazard region${detections.length === 1 ? "" : "s"}. Review the boxes before dispatch.`,
      imageQuality: "fair",
      needsReview: true,
      reviewReason: "Local model detections are approximate and need human confirmation.",
      detections,
    };
    return { model: LOCAL_VISION_MODEL, analysis };
  } catch (error) {
    log.warn(`Local vision model is unavailable: ${error instanceof Error ? error.message : "unknown error"}`);
    return undefined;
  }
}

function hashText(value: string): number {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function inferSimulationIssue(issueType: string, details: string): {
  issueClass: (typeof issueClasses)[number];
  label: string;
} {
  const text = `${issueType} ${details}`.toLowerCase();
  const candidates: Array<{ terms: string[]; issueClass: (typeof issueClasses)[number]; label: string }> = [
    { terms: ["pothole", "road damage", "road crack"], issueClass: "pothole", label: "Pothole / road damage" },
    { terms: ["overflow", "bin", "dumpster"], issueClass: "overflowing_bin", label: "Overflowing bin" },
    { terms: ["illegal dumping", "dumped", "dumping"], issueClass: "illegal_dumping", label: "Illegal dumping" },
    { terms: ["sewage", "wastewater", "contamination"], issueClass: "sewage_contamination", label: "Sewage contamination" },
    { terms: ["drain", "drainage", "gutter"], issueClass: "drainage_issue", label: "Drainage issue" },
    { terms: ["flood", "flooding", "waterlogging"], issueClass: "flooding", label: "Flooding" },
    { terms: ["standing water", "stagnant water", "puddle"], issueClass: "standing_water", label: "Standing water" },
    { terms: ["construction", "rubble", "debris"], issueClass: "construction_debris", label: "Construction debris" },
    { terms: ["plastic", "bottle", "polythene"], issueClass: "plastic_waste", label: "Plastic waste" },
    { terms: ["organic", "food waste", "vegetable"], issueClass: "organic_waste", label: "Organic waste" },
    { terms: ["hazard", "chemical", "oil spill"], issueClass: "hazardous_spill", label: "Hazardous spill" },
    { terms: ["graffiti", "vandalism"], issueClass: "graffiti", label: "Graffiti" },
  ];

  const match = candidates.find((candidate) => candidate.terms.some((term) => text.includes(term)));
  return match || { issueClass: "waste_accumulation", label: "Waste accumulation" };
}

function createSimulationAnalysis(issueType: string, details: string, imageDataUrl: string, reason: FallbackReason): SimulationAnalysis {
  const seed = hashText(`${imageDataUrl.length}:${issueType}:${details}`);
  const issue = inferSimulationIssue(issueType, details);
  const severity: SimulationAnalysis["overallSeverity"] = issue.issueClass === "hazardous_spill" || issue.issueClass === "flooding"
    ? "High"
    : seed % 4 === 0 ? "Low" : seed % 3 === 0 ? "High" : "Medium";
  const confidence = 54 + (seed % 17);
  const x = 10 + (seed % 42);
  const y = 12 + ((seed >>> 7) % 42);
  const width = 28 + ((seed >>> 13) % 24);
  const height = 22 + ((seed >>> 19) % 24);
  const reasonText = "The local vision model was unavailable.";

  return {
    status: "uncertain",
    primaryIssue: issue.label,
    overallSeverity: severity,
    confidence,
    summary: `Simulation scan: a likely ${issue.label.toLowerCase()} area was identified from the submitted report context. ${reasonText}`,
    imageQuality: "fair",
    needsReview: true,
    reviewReason: "Simulation mode is active; confirm the issue and bounding area before dispatch.",
    detections: [{
      issueClass: issue.issueClass,
      label: issue.label,
      severity,
      confidence,
      x,
      y,
      width,
      height,
      visibleEvidence: "Simulated candidate area based on the selected issue type and report description.",
      isPrimary: true,
    }],
  };
}

function sendSimulationFallback(res: Response, issueType: string, details: string, imageDataUrl: string, reason: FallbackReason): void {
  res.json({
    model: "simulation-v1",
    mode: "simulation",
    fallback: true,
    analysis: createSimulationAnalysis(issueType, details, imageDataUrl, reason),
  });
}

router.post("/vision/analyze", async (req, res): Promise<void> => {
  const { imageDataUrl, issueType = "Other waste issue", details = "" } = req.body as VisionRequest;

  if (typeof imageDataUrl !== "string" || !imageDataUrl.startsWith("data:image/") || imageDataUrl.length > MAX_IMAGE_DATA_URL_LENGTH) {
    badRequest(res, "Please upload a supported image smaller than 8 MB.");
    return;
  }

  const local = await tryLocalVision(issueType, details, imageDataUrl, {
    warn: (message) => req.log?.warn(message),
  });
  if (local) {
    res.json({ model: local.model, mode: "live", provider: "ollama-local", analysis: local.analysis });
    return;
  }

  if (FALLBACK_MODE === "off") {
    res.status(503).json({ error: "Local vision is unavailable and simulation fallback is disabled." });
    return;
  }

  req.log?.warn("Local vision model unavailable; using simulation fallback");
  sendSimulationFallback(res, issueType, details, imageDataUrl, "local_unavailable");
});
export default router;
