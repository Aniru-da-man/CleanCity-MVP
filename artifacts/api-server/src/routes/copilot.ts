import { Router, type IRouter } from "express";
import { getCopilotResponse } from "./mock-data";

const router: IRouter = Router();

router.post("/copilot/chat", (req, res): void => {
  const { message } = req.body as { message: string };
  const response = getCopilotResponse(message);
  res.json(response);
});

export default router;
