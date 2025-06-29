import { Request, Response } from 'express';
import { ratings } from '../db/schema';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from '../db/schema';
import * as dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { eq } from 'drizzle-orm';

dotenv.config();

const queryClient = postgres(process.env.DATABASE_URL!);
export const db = drizzle(queryClient, { schema });

export const rateBatch = async (req: Request, res: Response): Promise<void> => {
  const { batchId, score } = req.body;
  const authHeader = req.headers.authorization;
  if (!authHeader)  res.status(401).json({ error: 'No token' });
  else if (authHeader) {
    const token = authHeader.split(' ')[1];
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    const userId = decoded.userId;

    if (!score || score < 1 || score > 5)
        res.status(400).json({ error: 'Score must be 1-5' });

    await db.insert(ratings).values({ batchId, userId, score });
    res.status(201).json({ message: 'Rating submitted' });
    }
};

export const getAverageRating = async (req: Request, res: Response): Promise<void> => {
  const { batchId } = req.params;

  const scores = await db.select().from(ratings).where(eq(ratings.batchId, Number(batchId)));

  if (scores.length === 0)
     res.json({ average: null });

  const total = scores.reduce((acc, r) => acc + r.score, 0);
  const avg = total / scores.length;

  res.json({ average: avg.toFixed(1), count: scores.length });
};


 export const submitRating = async (req: Request, res: Response) => {
  const { batchId } = req.params;
  const { score } = req.body;

  // Optional: Validate JWT if you're protecting this
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({ error: 'No token provided.' });
    return;
  }

  const token = authHeader.split(' ')[1];
  const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
  const userId = decoded.userId;

  if (!score || score < 1 || score > 5) {
    res.status(400).json({ error: 'Score must be between 1 and 5.' });
    return;
  }

  try {
    await db.insert(ratings).values({
      batchId: Number(batchId),
      userId,
      score,
    });

    res.status(201).json({ message: 'Rating submitted.' });
  } catch (err) {
    console.error('Submit rating error:', err);
    res.status(500).json({ error: 'Failed to submit rating.' });
  }
};
