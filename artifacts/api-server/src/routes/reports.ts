import { Router, type IRouter } from "express";
import { mockReports } from "./mock-data";

const router: IRouter = Router();

let reports = [...mockReports];
let nextId = reports.length + 1;

router.get("/reports", (_req, res): void => {
  res.json(reports);
});

router.post("/reports", (req, res): void => {
  const newReport = {
    id: nextId++,
    title: req.body.title,
    type: req.body.type,
    status: "generating",
    period: req.body.period,
    generatedAt: null,
    createdAt: new Date().toISOString(),
    downloadUrl: null,
    size: null,
  };
  reports.unshift(newReport);

  // Simulate generation completing after 5 seconds
  setTimeout(() => {
    const idx = reports.findIndex((r) => r.id === newReport.id);
    if (idx !== -1) {
      reports[idx] = {
        ...reports[idx]!,
        status: "ready",
        generatedAt: new Date().toISOString(),
        downloadUrl: "#",
        size: `${(Math.random() * 3 + 0.5).toFixed(1)} MB`,
      };
    }
  }, 5000);

  res.status(201).json(newReport);
});

router.get("/reports/:id", (req, res): void => {
  const report = reports.find((r) => r.id === parseInt(req.params["id"]!));
  if (!report) {
    res.status(404).json({ error: "Report not found" });
    return;
  }
  res.json(report);
});

export default router;
