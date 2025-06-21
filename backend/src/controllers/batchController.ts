import { Request, Response } from 'express';
import { batchStore } from '../models/batchStore';
import { Batch } from '../types/recipe';

export const createBatch = (req: Request, res: Response): void => {
  const batch: Batch = req.body;
  if (!batch.batchName || !batch.recipes) {
    res.status(400).json({ error: 'Batch name and recipes are required.' });
  }
  batchStore.push(batch);
  res.status(201).json({ message: 'Batch saved.', batch });
};

export const getBatches = (_: Request, res: Response) => {
  res.json(batchStore);
};

export const getBatchByName = (req: Request, res: Response): void => {
  const { batchName } = req.params;
  const found = batchStore.find(b => b.batchName === batchName);
  if (!found) { res.status(404).json({ error: 'Batch not found.' }); }
  res.json(found);
};

export const deleteBatch = (req: Request, res: Response): void => {
  const { batchName } = req.params;
  const index = batchStore.findIndex(b => b.batchName === batchName);
  if (index === -1) { res.status(404).json({ error: 'Batch not found.' }); }
  batchStore.splice(index, 1);
  res.json({ message: 'Batch deleted.' });
};
