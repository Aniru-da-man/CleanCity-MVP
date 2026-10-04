import { Router, type IRouter } from "express";
import {
  mockIncidents,
  mockAqiData,
  mockCameras,
  mockProfile,
} from "./mock-data";

const router: IRouter = Router();

router.get("/dashboard/summary", (_req, res): void => {
  const openIncidents = mockIncidents.filter((i) => i.status === "open").length;
  const inProgress = mockIncidents.filter((i) => i.status === "in_progress").length;
  const resolvedToday = mockIncidents.filter(
    (i) =>
      i.status === "resolved" &&
      i.resolvedAt &&
      new Date(i.resolvedAt) > new Date(Date.now() - 24 * 3600000),
  ).length;

  const incidentsByType = Object.entries(
    mockIncidents.reduce(
      (acc, inc) => {
        acc[inc.type] = (acc[inc.type] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    ),
  ).map(([type, count]) => ({ type, count }));

  const weeklyTrend = [
    { label: "Mon", value: 12 },
    { label: "Tue", value: 18 },
    { label: "Wed", value: 14 },
    { label: "Thu", value: 21 },
    { label: "Fri", value: 28 },
    { label: "Sat", value: 16 },
    { label: "Sun", value: 9 },
  ];

  res.json({
    totalIncidents: mockIncidents.length,
    resolvedToday,
    activeAlerts: openIncidents + inProgress,
    avgAqi: mockAqiData.aqi,
    civicPoints: 2840,
    camerasOnline: mockCameras.filter((c) => c.status === "online").length,
    incidentsByType,
    weeklyTrend,
  });
});

router.get("/profile", (_req, res): void => {
  res.json(mockProfile);
});

router.patch("/profile", (req, res): void => {
  const updated = { ...mockProfile, ...req.body };
  res.json(updated);
});

export default router;
