import { Recipe } from './Recipe';

export interface Batch {
  batchName: string;
  recipes: Recipe[];
}