import express from 'express';
import parsingRoutes from './routes/parsingRoutes';

const app = express();
app.use(express.json());

app.use('/api', parsingRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});