import { Router } from 'express';
import TeamController from '../controllers/teamsControllers';

const teamController = new TeamController();

const router = Router();

router.get('/', (req, res, next) => teamController.listAll(req, res, next));
router.get('/:id', (req, res, next) => teamController.listOne(req, res, next));

export default router;
