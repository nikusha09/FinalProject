import express from 'express';
import parsingRoutes from './routes/parsingRoutes';
import batchRoutes from './routes/batchRoutes';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', parsingRoutes);
app.use('/api', batchRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});