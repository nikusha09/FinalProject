import { Recipe } from './Recipe';

export interface Batch {
  id: number;
  batchName: string;
  userId: number;
  recipes: Recipe[];
  rating: number | null;
}
