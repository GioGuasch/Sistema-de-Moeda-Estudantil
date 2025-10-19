import { Router } from 'express';
import vantagemController from '../controllers/vantagemController.js';
const router = Router();
router.get('/', vantagemController.getAllVantagens);
router.get('/:id', vantagemController.getVantagemById);
export default router;
