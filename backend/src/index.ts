import express from 'express';
import parsingRoutes from './routes/parsingRoutes';
import batchRoutes from './routes/batchRoutes';

const app = express();
app.use(express.json());

app.use('/api', parsingRoutes);
app.use('/api', batchRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});