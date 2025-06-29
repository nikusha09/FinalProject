import { Request, Response } from 'express';
import { batches, recipes, ratings } from '../db/schema';
import { eq } from 'drizzle-orm';
import * as dotenv from 'dotenv';
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import * as schema from '../db/schema';
import jwt from 'jsonwebtoken';

dotenv.config();

const queryClient = postgres(process.env.DATABASE_URL!);
export const db = drizzle(queryClient, { schema });

interface JwtPayload {
  userId: number;
}

// ✅ Create a new batch (Auth protected)
export const createBatch = async (req: Request, res: Response): Promise<void> => {
  const { batchName, recipes: recipeList } = req.body;

  if (!batchName || !recipeList || recipeList.length === 0) {
    res.status(400).json({ error: 'Batch name and recipes are required.' });
    return;
  }

  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      res.status(401).json({ error: 'No token provided.' });
      return;
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    // Insert batch for authenticated user
    const [batch] = await db.insert(batches).values({
      batchName,
      userId: decoded.userId,
    }).returning();

    // Insert associated recipes
    await db.insert(recipes).values(
      recipeList.map((r: any) => ({
        title: r.title,
        ingredients: r.ingredients,
        steps: r.steps,
        batchId: batch.id,
      }))
    );

    res.status(201).json({ message: 'Batch and recipes saved.', batchId: batch.id });
  } catch (err) {
    console.error('Create batch error:', err);
    res.status(500).json({ error: 'Failed to create batch.' });
  }
};

export const getBatches = async (_: Request, res: Response) => {
  try {
    const allBatches = await db.select().from(batches);
    const batchList = await Promise.all(
      allBatches.map(async (batch) => {
        const recipesList = await db.select().from(recipes).where(eq(recipes.batchId, batch.id));
        const batchRatings = await db.select().from(ratings).where(eq(ratings.batchId, batch.id));

        const averageRating = batchRatings.length
          ? batchRatings.reduce((sum, r) => sum + r.score, 0) / batchRatings.length
          : null;

        return {
          id: batch.id,
          batchName: batch.batchName,
          userId: batch.userId,
          recipes: recipesList,
          rating: averageRating,
        };
      })
    );

    res.json(batchList);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch batches.' });
  }
};


// ✅ Fetch a batch by name (public)
export const getBatchByName = async (req: Request, res: Response): Promise<void> => {
  const { batchName } = req.params;

  try {
    const [batch] = await db.select().from(batches).where(eq(batches.batchName, batchName));

    if (!batch) {
      res.status(404).json({ error: 'Batch not found.' });
      return;
    }

    const batchRecipes = await db.select().from(recipes).where(eq(recipes.batchId, batch.id));

    res.json({ batch, recipes: batchRecipes });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch batch.' });
  }
};

// ✅ Delete batch by name (Auth protected)
export const deleteBatch = async (req: Request, res: Response): Promise<void> => {
  const { batchName } = req.params;

  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      res.status(401).json({ error: 'No token provided.' });
      return;
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    // Find batch belonging to this user
    const [batch] = await db
      .select()
      .from(batches)
      .where(eq(batches.batchName, batchName));

    if (!batch) {
      res.status(404).json({ error: 'Batch not found.' });
      return;
    }

    if (batch.userId !== decoded.userId) {
      res.status(403).json({ error: 'You do not have permission to delete this batch.' });
      return;
    }

    // Delete recipes first
    await db.delete(recipes).where(eq(recipes.batchId, batch.id));

    // Then delete batch
    await db.delete(batches).where(eq(batches.id, batch.id));

    res.json({ message: 'Batch and associated recipes deleted.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete batch.' });
  }
};
