import { Request, Response } from 'express';
import { parseRecipeText } from '../utils/parser';

export const parseRecipe = (req: Request, res: Response): void => {
  const { text } = req.body;
  if (!text) {
    res.status(400).json({ error: 'Missing text in request body.' });
  }

  const { recipes, errors } = parseRecipeText(text);
  res.json({ recipes, errors });
};