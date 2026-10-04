import { Router, type IRouter } from "express";
import healthRouter from "./health";
import dashboardRouter from "./dashboard";
import incidentsRouter from "./incidents";
import detectionsRouter from "./detections";
import environmentalRouter from "./environmental";
import predictionsRouter from "./predictions";
import mapRouter from "./map";
import communityRouter from "./community";
import notificationsRouter from "./notifications";
import reportsRouter from "./reports";
import adminRouter from "./admin";
import copilotRouter from "./copilot";
import visionRouter from "./vision";

const router: IRouter = Router();

router.use(healthRouter);
router.use(dashboardRouter);
router.use(incidentsRouter);
router.use(detectionsRouter);
router.use(environmentalRouter);
router.use(predictionsRouter);
router.use(mapRouter);
router.use(communityRouter);
router.use(notificationsRouter);
router.use(reportsRouter);
router.use(adminRouter);
router.use(copilotRouter);
router.use(visionRouter);

export default router;
