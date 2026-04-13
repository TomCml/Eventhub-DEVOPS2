import { Router } from 'express';
import { AuthMiddleware } from '../middlewares';
import { recordView, getAnalytics } from '../controllers/AnalyticsControllers';

const router = Router();

router.post('/view', AuthMiddleware, recordView);
router.get('/', AuthMiddleware, getAnalytics);

export default router;
