import { Router } from 'express';
import { parseRecipe } from '../controllers/parsingController';

const router = Router();
router.post('/parse', parseRecipe);

export default router;
