import { Ingredient } from './Ingredient';

export interface Recipe {
  title: string;
  ingredients: Ingredient[];
  steps: string[];
}