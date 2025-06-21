import { ParsingError } from '../types/parsingError';

export interface RawRecipeBlock {
  titleLine: string;
  lines: string[];
}

export function splitAndGroupRecipes(
  input: string
): { recipes: RawRecipeBlock[]; errors: ParsingError[] } {
  const lines = input.split('\n').map(line => line.trim()).filter(line => line !== '');

  const recipes: RawRecipeBlock[] = [];
  const errors: ParsingError[] = [];
  let currentRecipe: RawRecipeBlock | null = null;

  lines.forEach((line, index) => {
    if (line.startsWith('TITLE:')) {
      if (currentRecipe) {
        recipes.push(currentRecipe);
      }
      currentRecipe = { titleLine: line, lines: [] };
    } else {
      if (!currentRecipe) {
        // Line without a TITLE — record an error
        errors.push({
          lineNumber: index + 1,
          message: 'Line found before any TITLE line',
          type: 'MissingTitle'
        });
        return;
      }
      currentRecipe.lines.push(line);
    }
  });

  if (currentRecipe) {
    recipes.push(currentRecipe);
  }

  return { recipes, errors };
}
