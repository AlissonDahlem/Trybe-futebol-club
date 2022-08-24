import { Router } from 'express';
import MatchesController from '../controllers/matchesControllers';

const router = Router();
const matchesController = new MatchesController();

router.get('/', (req, res, next) => matchesController.matchesInProgress(req, res, next));
router.get('/', (req, res, next) => matchesController.listAll(req, res, next));
router.post('/', (req, res, next) => matchesController.createMatchInProgress(req, res, next));
router.patch('/:id/finish', (req, res, next) => matchesController.finishMatch(req, res, next));

export default router;
