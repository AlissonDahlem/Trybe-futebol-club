import { Router } from 'express';
import LoginController from '../controllers/loginController';

const loginController = new LoginController();

const router = Router();

router.post('/', (req, res, next) => loginController.login(req, res, next));

export default router;
