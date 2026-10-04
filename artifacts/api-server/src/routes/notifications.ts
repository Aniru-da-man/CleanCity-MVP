import { Router, type IRouter } from "express";
import { mockNotifications } from "./mock-data";

const router: IRouter = Router();

let notifications = [...mockNotifications];

router.get("/notifications", (req, res): void => {
  let result = [...notifications];
  if (req.query["unreadOnly"] === "true") {
    result = result.filter((n) => !n.isRead);
  }
  res.json(result);
});

router.patch("/notifications/:id/read", (req, res): void => {
  const idx = notifications.findIndex((n) => n.id === parseInt(req.params["id"]!));
  if (idx === -1) {
    res.status(404).json({ error: "Notification not found" });
    return;
  }
  notifications[idx] = { ...notifications[idx]!, isRead: true };
  res.json(notifications[idx]);
});

router.patch("/notifications/read-all", (_req, res): void => {
  notifications = notifications.map((n) => ({ ...n, isRead: true }));
  res.json({ success: true, message: "All notifications marked as read" });
});

export default router;
