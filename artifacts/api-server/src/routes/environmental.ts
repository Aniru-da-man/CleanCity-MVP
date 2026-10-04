import { Router, type IRouter } from "express";
import {
  mockAqiData,
  mockWeatherData,
  generateEnvironmentalTrends,
} from "./mock-data";

const router: IRouter = Router();

router.get("/environmental/aqi", (_req, res): void => {
  res.json(mockAqiData);
});

router.get("/environmental/weather", (_req, res): void => {
  res.json(mockWeatherData);
});

router.get("/environmental/trends", (req, res): void => {
  const days = req.query["days"] ? parseInt(req.query["days"] as string) : 30;
  res.json(generateEnvironmentalTrends(days));
});

export default router;
