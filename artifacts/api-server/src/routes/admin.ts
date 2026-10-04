import { Router, type IRouter } from "express";
import { mockAdminStats, mockAdminUsers } from "./mock-data";

const router: IRouter = Router();

router.get("/admin/stats", (_req, res): void => {
  res.json(mockAdminStats);
});

router.get("/admin/users", (_req, res): void => {
  res.json(mockAdminUsers);
});

export default router;
