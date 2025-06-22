# 📦 Data Structures & Backend Implementation Logic

This document describes the core data structures and the backend implementation logic for the **Recipe Parsing Application**.

---

## 📌 Data Structures

The backend uses TypeScript interfaces to represent recipes, ingredients, batches, and structured parsing errors.

---

### 📄 Ingredient
```ts
export interface Ingredient {
  quantity: number;
  unit: string;
  name: string;
}
```


### Purpose: Represents a single ingredient in a recipe.

- quantity: number (supports decimals and fractions)

- unit: string (e.g. "cup", "gram")

- name: string (e.g. "Sugar")

### 📄 Recipe
```ts
export interface Recipe {
  title: string;
  ingredients: Ingredient[];
  steps: string[];
}
```

### Purpose: Represents a complete recipe.

- title: string

- ingredients: array of Ingredient

- steps: array of strings (instructions)

### 📄 Batch
```ts
export interface Batch {
  batchName: string;
  recipes: Recipe[];
}
```
### Purpose: Represents a named collection of recipes.

- batchName: string (unique name)

- recipes: array of Recipe

### 📄 ParsingError
```ts
export interface ParsingError {
  lineNumber: number;
  message: string;
  type: 'MissingTitle' | 'MissingIngredient' | 'MissingStep' | 'InvalidLineFormat' | 'InvalidQuantity';
}
```

### Purpose: Represents an error encountered during parsing.

- lineNumber: number (where the error occurred)

- message: string (descriptive error)

- type: specific error type from the defined options

---

### 📌 Backend Implementation Logic
The backend is built with Node.js, Express, and TypeScript. It includes modular controllers, routes, utilities, and in-memory storage.

### 📌 Parsing Logic
1) Parsing occurs in three main phases:
splitAndGroupRecipes

- Splits input text into individual lines.

- Groups lines under corresponding TITLE: headings.

- Returns an array of grouped recipe blocks and an array of initial parsing errors for misplaced or missing titles.

2) validateAndParseRecipes

- Validates recipe blocks:

    - Checks if a title exists.

    - Ensures at least one ingredient and one step exist.

    - Validates ingredient quantity and formatting.

    - Identifies unknown line prefixes.

- Collects validation errors.

- Returns valid Recipe objects and accumulated errors.

3) parseRecipeText
- Combines the previous two functions into a single parsing operation.

- Returns final valid recipes and a consolidated list of errors.

### 📌 Batch Storage Logic
- Implemented via a temporary in-memory array inside batchStore.ts.

- Supports:

    - Saving batches

    - Fetching batches by name

    - Listing all batches

    - Deleting batches

- Suitable for development/testing purposes.