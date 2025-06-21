import { Router } from 'express';
import { createBatch, getBatches, getBatchByName, deleteBatch } from '../controllers/batchController';

const router = Router();

router.post('/batches', createBatch);
router.get('/batches', getBatches);
router.get('/batches/:batchName', getBatchByName);
router.delete('/batches/:batchName', deleteBatch);

export default router;
