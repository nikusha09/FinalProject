import express from 'express';
import parsingRoutes from './routes/parsingRoutes';
import batchRoutes from './routes/batchRoutes';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import { registerUser, loginUser } from './controllers/authController';
import ratingRoutes from './routes/ratingRoutes';

const app = express();
const router = express.Router();
app.use(cors());
app.use(express.json());

app.use('/api', parsingRoutes);
app.use('/api', batchRoutes);
app.use('/api', authRoutes);
app.use('/api', ratingRoutes);
router.post('/register', registerUser);
router.post('/login', loginUser);

app.use('/api/auth', router);
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});