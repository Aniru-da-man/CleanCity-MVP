import { Router, type IRouter } from "express";
import {
  mockPredictions,
  mockHotspots,
  generateWasteForecast,
} from "./mock-data";

const router: IRouter = Router();

router.get("/predictions", (_req, res): void => {
  res.json(mockPredictions);
});

router.get("/predictions/hotspots", (_req, res): void => {
  res.json(mockHotspots);
});

router.get("/predictions/waste-forecast", (_req, res): void => {
  res.json(generateWasteForecast());
});

export default router;
