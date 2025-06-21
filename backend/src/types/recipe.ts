export interface Ingredient {
  quantity: number;
  unit: string;
  name: string;
}

export interface Recipe {
  title: string;
  ingredients: Ingredient[];
  steps: string[];
}

export interface Batch {
  batchName: string;
  recipes: Recipe[];
}