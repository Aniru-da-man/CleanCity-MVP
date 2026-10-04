import { Router, type IRouter } from "express";
import { mockIncidents } from "./mock-data";

const router: IRouter = Router();

let incidents = [...mockIncidents];
let nextId = incidents.length + 1;

router.get("/incidents", (req, res): void => {
  let result = [...incidents];
  if (req.query["status"]) {
    result = result.filter((i) => i.status === req.query["status"]);
  }
  if (req.query["severity"]) {
    result = result.filter((i) => i.severity === req.query["severity"]);
  }
  if (req.query["limit"]) {
    result = result.slice(0, parseInt(req.query["limit"] as string));
  }
  res.json(result);
});

router.get("/incidents/stats", (_req, res): void => {
  const byType = Object.entries(
    incidents.reduce(
      (acc, inc) => {
        acc[inc.type] = (acc[inc.type] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    ),
  ).map(([type, count]) => ({ type, count }));

  const byDay = [
    { label: "Mon", value: 8 },
    { label: "Tue", value: 12 },
    { label: "Wed", value: 9 },
    { label: "Thu", value: 15 },
    { label: "Fri", value: 18 },
    { label: "Sat", value: 11 },
    { label: "Sun", value: 6 },
  ];

  res.json({
    total: incidents.length,
    open: incidents.filter((i) => i.status === "open").length,
    inProgress: incidents.filter((i) => i.status === "in_progress").length,
    resolved: incidents.filter((i) => i.status === "resolved").length,
    critical: incidents.filter((i) => i.severity === "critical").length,
    high: incidents.filter((i) => i.severity === "high").length,
    medium: incidents.filter((i) => i.severity === "medium").length,
    low: incidents.filter((i) => i.severity === "low").length,
    byType,
    byDay,
  });
});

router.post("/incidents", (req, res): void => {
  const newIncident = {
    id: nextId++,
    ...req.body,
    status: "open",
    reportedBy: "User",
    assignedTo: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    resolvedAt: null,
    imageUrl: null,
    cameraId: null,
  };
  incidents.unshift(newIncident);
  res.status(201).json(newIncident);
});

router.get("/incidents/:id", (req, res): void => {
  const incident = incidents.find((i) => i.id === parseInt(req.params["id"]!));
  if (!incident) {
    res.status(404).json({ error: "Incident not found" });
    return;
  }
  res.json(incident);
});

router.patch("/incidents/:id", (req, res): void => {
  const idx = incidents.findIndex((i) => i.id === parseInt(req.params["id"]!));
  if (idx === -1) {
    res.status(404).json({ error: "Incident not found" });
    return;
  }
  const updated = {
    ...incidents[idx],
    ...req.body,
    updatedAt: new Date().toISOString(),
    ...(req.body.status === "resolved" ? { resolvedAt: new Date().toISOString() } : {}),
  };
  incidents[idx] = updated;
  res.json(updated);
});

router.delete("/incidents/:id", (req, res): void => {
  const idx = incidents.findIndex((i) => i.id === parseInt(req.params["id"]!));
  if (idx === -1) {
    res.status(404).json({ error: "Incident not found" });
    return;
  }
  incidents.splice(idx, 1);
  res.status(204).send();
});

export default router;
