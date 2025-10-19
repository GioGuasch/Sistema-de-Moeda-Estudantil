import { Router } from 'express';
import vantagemRoutes from './vantagemRoutes.js';
const router = Router();
router.use('/vantagens', vantagemRoutes);
export default router;
