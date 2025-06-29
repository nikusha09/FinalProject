import { Request, Response } from 'express';
import { batches, recipes, users } from '../db/schema';
import { eq } from 'drizzle-orm';
import * as dotenv from 'dotenv';
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import * as schema from '../db/schema';

dotenv.config();

const queryClient = postgres(process.env.DATABASE_URL!);
export const db = drizzle(queryClient, { schema });

// Create a new batch with its recipes
export const createBatch = async (req: Request, res: Response): Promise<void> => {
  const { batchName, recipes: recipeList } = req.body;

  if (!batchName || !recipeList || recipeList.length === 0) {
    res.status(400).json({ error: 'Batch name and recipes are required.' });
    return;
  }

  try {
    // Create a random user
    const randomUserEmail = `${Math.random().toString(36).substring(2, 8)}@example.com`;
    const randomPasswordHash = Math.random().toString(36).substring(2, 10);
    const [newUser] = await db.insert(users).values({
      email: randomUserEmail,
      passwordHash: randomPasswordHash,
    }).returning();

    // Insert batch for that user
    const [batch] = await db.insert(batches).values({
      batchName,
      userId: newUser.id,
    }).returning();

    // Insert recipes linked to the new batch
    await db.insert(recipes).values(
      recipeList.map((r: any) => ({
        title: r.title,
        ingredients: r.ingredients,
        steps: r.steps,
        batchId: batch.id,
      }))
    );

    res.status(201).json({ message: 'Batch, user, and recipes saved.', batchId: batch.id, userId: newUser.id });
  } catch (err) {
    console.error('Create batch error:', err);
    res.status(500).json({ error: 'Failed to create batch.' });
  }
};

 
// Fetch all batches with their recipes
export const getBatches = async (_: Request, res: Response) => {
  try {
    const allBatches = await db.select().from(batches);
    const batchList = await Promise.all(allBatches.map(async (batch) => {
      const recipesList = await db.select().from(recipes).where(eq(recipes.batchId, batch.id));
      return {
        ...batch,
        recipes: recipesList,
      };
    }));

    res.json(batchList);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch batches.' });
  }
};
 
// Fetch recipes by batchName
export const getBatchByName = async (req: Request, res: Response): Promise<void> => {
  const { batchName } = req.params;
 
  try {
    const batch = await db.query.batches.findFirst({
      where: (b) => eq(b.batchName, batchName),
    });
 
    if (!batch) {
      res.status(404).json({ error: 'Batch not found.' });
    }
    else if (batch){
      const batchRecipes = await db.select().from(recipes).where(eq(recipes.batchId, batch.id));
      res.json({ batch, recipes: batchRecipes });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch batch.' });
  }
};
 
// Delete batch by batchName
export const deleteBatch = async (req: Request, res: Response): Promise<void> => {
  const { batchName } = req.params;
 
  try {
    const batch = await db.query.batches.findFirst({
      where: (b) => eq(b.batchName, batchName),
    });
 
    if (!batch) {
      res.status(404).json({ error: 'Batch not found.' });
    }
    else if (batch) {
      await db.delete(recipes).where(eq(recipes.batchId, batch.id));
      await db.delete(batches).where(eq(batches.id, batch.id));
    }
    res.json({ message: 'Batch and associated recipes deleted.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete batch.' });
  }
};