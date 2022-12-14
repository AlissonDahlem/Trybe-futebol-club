import { Router } from 'express';
import LeaderboardController from '../controllers/leaderboardController';

const router = Router();
const leaderboardController = new LeaderboardController();

router.get('/', (req, res, next) => leaderboardController.homeLeaderboard(req, res, next));

export default router;
