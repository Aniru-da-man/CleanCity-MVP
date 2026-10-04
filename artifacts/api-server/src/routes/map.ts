import { Router, type IRouter } from "express";
import { mockIncidents, mockCameras, mockAqiData, mockHotspots } from "./mock-data";

const router: IRouter = Router();

router.get("/map/markers", (_req, res): void => {
  const markers = [
    ...mockIncidents.map((inc) => ({
      id: inc.id,
      type: "incident",
      title: inc.title,
      lat: inc.lat,
      lng: inc.lng,
      severity: inc.severity,
      status: inc.status,
    })),
    ...mockCameras.map((cam, idx) => ({
      id: 1000 + idx,
      type: "camera",
      title: cam.name,
      lat: cam.lat,
      lng: cam.lng,
      severity: null,
      status: cam.status,
    })),
    ...mockAqiData.stations.map((st, idx) => ({
      id: 2000 + idx,
      type: "aqi_station",
      title: st.name,
      lat: st.lat,
      lng: st.lng,
      severity: st.aqi > 100 ? "high" : st.aqi > 50 ? "medium" : "low",
      status: "active",
    })),
    ...mockHotspots.map((hs) => ({
      id: 3000 + hs.id,
      type: "hotspot",
      title: hs.location,
      lat: hs.lat,
      lng: hs.lng,
      severity: hs.riskScore > 8 ? "critical" : hs.riskScore > 6 ? "high" : "medium",
      status: "active",
    })),
  ];
  res.json(markers);
});

export default router;
