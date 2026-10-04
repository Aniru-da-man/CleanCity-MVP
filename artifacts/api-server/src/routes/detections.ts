import { Router, type IRouter } from "express";
import { mockDetections, mockCameras } from "./mock-data";

const router: IRouter = Router();

router.get("/detections", (req, res): void => {
  let result = [...mockDetections];
  if (req.query["cameraId"]) {
    result = result.filter((d) => d.cameraId === req.query["cameraId"]);
  }
  if (req.query["limit"]) {
    result = result.slice(0, parseInt(req.query["limit"] as string));
  }
  res.json(result);
});

router.get("/detections/cameras", (_req, res): void => {
  res.json(mockCameras);
});

export default router;
