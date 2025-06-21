import { splitAndGroupRecipes } from '../utils/parserUtils';
import { validateAndParseRecipes } from '../utils/parserValidation';
import { Recipe } from '../types/recipe';
import { ParsingError } from '../types/parsingError';

export function parseRecipeText(inputText: string): {
  recipes: Recipe[];
  errors: ParsingError[];
} {
  const { recipes: rawBlocks, errors: groupingErrors } = splitAndGroupRecipes(inputText);
  const { recipes, errors: validationErrors } = validateAndParseRecipes(rawBlocks);

  return {
    recipes,
    errors: [...groupingErrors, ...validationErrors],
  };
}