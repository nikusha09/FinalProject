import { Router } from 'express';
import { rateBatch, getAverageRating, submitRating } from '../controllers/ratingController';

const router = Router();

router.post('/ratings', rateBatch);
router.get('/ratings/:batchId', getAverageRating);
router.post('/batches/:batchId/rate', submitRating);

export default router;
