import { Router, type IRouter } from "express";
import {
  mockLeaderboard,
  mockBadges,
  mockMarketplace,
  mockCommunityProfile,
} from "./mock-data";

const router: IRouter = Router();

router.get("/community/leaderboard", (_req, res): void => {
  res.json(mockLeaderboard);
});

router.get("/community/badges", (_req, res): void => {
  res.json(mockBadges);
});

router.get("/community/marketplace", (_req, res): void => {
  res.json(mockMarketplace);
});

router.get("/community/profile", (_req, res): void => {
  res.json(mockCommunityProfile);
});

export default router;
