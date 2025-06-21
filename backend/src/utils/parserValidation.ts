import { Recipe, Ingredient } from '../types/recipe';
import { ParsingError } from '../types/parsingError';
import { RawRecipeBlock } from './parserUtils';

function parseQuantity(quantityStr: string): number | null {
  if (quantityStr.includes('/')) {
    const [numerator, denominator] = quantityStr.split('/').map(Number);
    if (!isNaN(numerator) && !isNaN(denominator) && denominator !== 0) {
      return numerator / denominator;
    }
    return null;
  }
  const parsed = parseFloat(quantityStr);
  return isNaN(parsed) ? null : parsed;
}

export function validateAndParseRecipes(blocks: RawRecipeBlock[]): {
  recipes: Recipe[];
  errors: ParsingError[];
} {
  const recipes: Recipe[] = [];
  const errors: ParsingError[] = [];

  blocks.forEach((block) => {
    const title = block.titleLine.replace('TITLE:', '').trim();
    const ingredients: Ingredient[] = [];
    const steps: string[] = [];

    block.lines.forEach((line, index) => {
      const lineNumber = index + 1;
      if (line.startsWith('ING:')) {
        const parts = line.replace('ING:', '').trim().split(' ');
        const [quantityStr, unit, ...nameParts] = parts;
        const quantity = parseQuantity(quantityStr);
        const name = nameParts.join(' ');

        if (quantity === null) {
          errors.push({
            lineNumber,
            message: `Invalid quantity '${quantityStr}'`,
            type: 'InvalidQuantity',
          });
          return;
        }

        if (!unit || !name) {
          errors.push({
            lineNumber,
            message: `Ingredient line missing unit or name`,
            type: 'MissingIngredient',
          });
          return;
        }

        ingredients.push({ quantity, unit, name });
      } else if (line.startsWith('STEP:')) {
        steps.push(line.replace('STEP:', '').trim());
      } else {
        errors.push({
          lineNumber,
          message: `Invalid line prefix`,
          type: 'InvalidLineFormat',
        });
      }
    });

    if (!title) {
      errors.push({
        lineNumber: 0,
        message: `Missing TITLE line`,
        type: 'MissingTitle',
      });
      return;
    }

    if (ingredients.length === 0) {
      errors.push({
        lineNumber: 0,
        message: `No ingredients found for recipe`,
        type: 'MissingIngredient',
      });
    }

    if (steps.length === 0) {
      errors.push({
        lineNumber: 0,
        message: `No steps found for recipe`,
        type: 'MissingStep',
      });
    }

    if (title && ingredients.length && steps.length) {
      recipes.push({ title, ingredients, steps });
    }
  });

  return { recipes, errors };
}
