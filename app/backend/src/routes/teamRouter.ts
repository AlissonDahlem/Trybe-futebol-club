import { Router } from 'express';
import TeamController from '../controllers/teamsControllers';

const teamController = new TeamController();

const router = Router();

router.get('/', (req, res, next) => teamController.listAll(req, res, next));

export default router;
