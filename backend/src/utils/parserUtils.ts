export interface RawRecipeBlock {
  titleLine: string;
  lines: string[];
}

export function splitAndGroupRecipes(input: string): RawRecipeBlock[] {
  const lines = input.split('\n').map(line => line.trim()).filter(line => line !== '');

  const recipes: RawRecipeBlock[] = [];
  let currentRecipe: RawRecipeBlock | null = null;

  lines.forEach(line => {
    if (line.startsWith('TITLE:')) {
      if (currentRecipe) {
        recipes.push(currentRecipe);
      }
      currentRecipe = { titleLine: line, lines: [] };
    } else {
      if (!currentRecipe) {
        // Line without a TITLE yet — skip
        return;
      }
      currentRecipe.lines.push(line);
    }
  });

  if (currentRecipe) {
    recipes.push(currentRecipe);
  }

  return recipes;
}
